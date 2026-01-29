import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationRepository } from '../../repository/notification.repository';
import { NotificationChannelRepository } from '../../repository/notification-channel.repository';
import { UserNotificationSettingsRepository } from '../../repository/user-notification-settings.repository';
import { DeviceTokenRepository } from '../../repository/device-token.repository';
import { CacheService } from '../../common/caching/cache.service';
import { Notification, NotificationType } from '../../entities/notification.entity';
import {
  NotificationChannelType,
} from '../../entities/notification-channel.entity';
import { NotificationGateway } from './notification.gateway';
import { UserNotificationSettings } from '../../entities/user-notification-settings.entity';
import { DevicePlatform } from '../../entities/device-token.entity';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private channelRepository: NotificationChannelRepository,
    private settingsRepository: UserNotificationSettingsRepository,
    private deviceTokenRepository: DeviceTokenRepository,
    private cacheService: CacheService,
    private notificationGateway: NotificationGateway,
    @InjectQueue('notifications-inapp') private inAppQueue: Queue,
    @InjectQueue('notifications-email') private emailQueue: Queue,
    @InjectQueue('notifications-push') private pushQueue: Queue,
    @InjectQueue('notifications-sms') private smsQueue: Queue,
  ) {}

  async createNotification(input: {
    userId: number;
    title: string;
    body: string;
    type?: NotificationType;
    data?: Record<string, any>;
    sendEmail?: boolean;
    sendPush?: boolean;
    sendSms?: boolean;
  }): Promise<Notification> {
    // Create notification in database
    const notification = await this.notificationRepository.create({
      user_id: input.userId,
      title: input.title,
      body: input.body,
      type: input.type || NotificationType.SYSTEM,
      data: input.data || null,
      is_read: false,
    });

    // Get user settings (with caching)
    const settings = await this.getCachedSettings(input.userId) as UserNotificationSettings;

    // Determine which channels to use
    const channels: NotificationChannelType[] = [];

    // Always send in-app
    if (settings?.in_app_enabled !== false) {
      channels.push(NotificationChannelType.IN_APP);
    }

    // Email if enabled and requested
    if (
      (input.sendEmail !== false && settings?.email_enabled) ||
      input.sendEmail === true
    ) {
      channels.push(NotificationChannelType.EMAIL);
    }

    // Push if enabled and requested
    if (
      (input.sendPush !== false && settings?.push_enabled) ||
      input.sendPush === true
    ) {
      channels.push(NotificationChannelType.PUSH);
    }

    // SMS if enabled and requested
    if (
      (input.sendSms === true && settings?.sms_enabled) ||
      input.sendSms === true
    ) {
      channels.push(NotificationChannelType.SMS);
    }

    // Create channel records and enqueue jobs
    await this.enqueueChannels(notification, channels);

    // Emit real-time event for in-app notifications
    if (channels.includes(NotificationChannelType.IN_APP)) {
      this.notificationGateway.emitNotification(input.userId, notification);
    }

    // Invalidate unread count cache
    await this.cacheService.delete(`notif:unread_count:${input.userId}`);

    return notification;
  }

  private async enqueueChannels(
    notification: Notification,
    channels: NotificationChannelType[],
  ): Promise<void> {
    for (const channelType of channels) {
      // Create channel record
      const channel = await this.channelRepository.create({
        notification_id: notification.id,
        channel: channelType,
        status: 'PENDING' as any,
      });

      // Enqueue job based on channel type
      const jobData = {
        notificationId: notification.id,
        channelId: channel.id,
      };

      const jobOptions = {
        attempts: 5,
        backoff: {
          type: 'exponential' as const,
          delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      };

      switch (channelType) {
        case NotificationChannelType.IN_APP:
          await this.inAppQueue.add('send', jobData, jobOptions);
          break;
        case NotificationChannelType.EMAIL:
          await this.emailQueue.add('send', jobData, jobOptions);
          break;
        case NotificationChannelType.PUSH:
          await this.pushQueue.add('send', jobData, jobOptions);
          break;
        case NotificationChannelType.SMS:
          await this.smsQueue.add('send', jobData, jobOptions);
          break;
      }
    }
  }

  private async getCachedSettings(userId: number) {
    const cacheKey = `notif:settings:${userId}`;
    let settings = await this.cacheService.get(cacheKey);

    if (!settings) {
      settings = await this.settingsRepository.findByUserId(userId);
      if (settings) {
        // Cache for 5 minutes
        await this.cacheService.set(cacheKey, settings, 5 * 60 * 1000);
      }
    }

    return settings;
  }

  async getUnreadCount(userId: number): Promise<number> {
    const cacheKey = `notif:unread_count:${userId}`;
    let count = await this.cacheService.get(cacheKey);

    if (count === null || count === undefined) {
      count = await this.notificationRepository.getUnreadCount(userId);
      // Cache for 5 minutes
      await this.cacheService.set(cacheKey, count, 5 * 60 * 1000);
    }

    return typeof count === 'number' ? count : 0;
  }

  async getNotifications(
    userId: number,
    options?: {
      limit?: number;
      cursor?: number;
      isRead?: boolean;
      type?: NotificationType;
    },
  ) {
    console.log(userId, options);
    return await this.notificationRepository.findByUserId(userId, options);
  }

  async markAsRead(notificationId: number, userId: number): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new Error('Notification not found');
    }

    if (notification.user_id !== userId) {
      throw new Error('Access denied');
    }

    await this.notificationRepository.markAsRead(notificationId);
    await this.cacheService.delete(`notif:unread_count:${userId}`);
    this.notificationGateway.emitUnreadCount(userId, await this.getUnreadCount(userId));
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.markAllAsRead(userId);
    await this.cacheService.delete(`notif:unread_count:${userId}`);
    this.notificationGateway.emitUnreadCount(userId, 0);
  }

  async registerDeviceToken(
    userId: number,
    token: string,
    platform: DevicePlatform,
    deviceName?: string,
  ): Promise<void> {
    await this.deviceTokenRepository.upsertToken(userId, token, platform, deviceName);
    await this.cacheService.delete(`notif:tokens:${userId}`);
  }

  async removeDeviceToken(userId: number, token: string): Promise<void> {
    await this.deviceTokenRepository.deactivateToken(token);
    await this.cacheService.delete(`notif:tokens:${userId}`);
  }

  async getSettings(userId: number) {
    const settings = await this.settingsRepository.findByUserId(userId);
    return (
      settings || {
        user_id: userId,
        email_enabled: true,
        push_enabled: true,
        sms_enabled: false,
        in_app_enabled: true,
      }
    );
  }

  async updateSettings(
    userId: number,
    updates: Partial<UserNotificationSettings>,
  ) {
    const settings = await this.settingsRepository.createOrUpdate(userId, updates);
    await this.cacheService.delete(`notif:settings:${userId}`);
    return settings;
  }

}

