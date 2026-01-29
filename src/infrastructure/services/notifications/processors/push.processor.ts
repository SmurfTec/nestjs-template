import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationRepository } from '../../../repository/notification.repository';
import { NotificationChannelRepository } from '../../../repository/notification-channel.repository';
import { DeviceTokenRepository } from '../../../repository/device-token.repository';
import { PushProvider } from '../providers/push.provider';
import {
  NotificationChannelStatus,
} from '../../../entities/notification-channel.entity';

@Processor('notifications-push')
export class PushProcessor extends WorkerHost {
  private readonly logger = new Logger(PushProcessor.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private channelRepository: NotificationChannelRepository,
    private deviceTokenRepository: DeviceTokenRepository,
    private pushProvider: PushProvider,
  ) {
    super();
  }

  async process(job: Job<{ notificationId: number; channelId: number }>): Promise<void> {
    const { notificationId, channelId } = job.data;

    try {
      const notification = await this.notificationRepository.findById(notificationId);
      if (!notification) {
        throw new Error(`Notification ${notificationId} not found`);
      }

      // Get cached device tokens
      const tokens = await this.getCachedTokens(notification.user_id);
      
      if (tokens.length === 0) {
        this.logger.warn(`No device tokens found for user ${notification.user_id}`);
        await this.channelRepository.updateStatus(
          channelId,
          NotificationChannelStatus.SENT,
        );
        return;
      }

      const result = await this.pushProvider.send(notification, tokens);

      if (result.failed === 0 || result.success > 0) {
        await this.channelRepository.updateStatus(
          channelId,
          NotificationChannelStatus.SENT,
        );
        this.logger.log(
          `Push notification ${notificationId} sent: ${result.success} success, ${result.failed} failed`,
        );
      } else {
        throw new Error(`All push notifications failed for notification ${notificationId}`);
      }
    } catch (error) {
      this.logger.error(
        `Failed to send push notification ${notificationId}: ${error.message}`,
      );
      await this.channelRepository.updateStatus(
        channelId,
        NotificationChannelStatus.FAILED,
        error.message,
      );
      throw error;
    }
  }

  private async getCachedTokens(userId: number) {
    // In a real implementation, you'd cache this
    return await this.deviceTokenRepository.findByUserId(userId);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Push job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Push job ${job.id} failed: ${error.message}`);
  }
}

