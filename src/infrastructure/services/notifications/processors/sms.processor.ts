import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationRepository } from '../../../repository/notification.repository';
import { NotificationChannelRepository } from '../../../repository/notification-channel.repository';
import { UserRepository } from '../../../repository/users.repository';
import { SmsProvider } from '../providers/sms.provider';
import {
  NotificationChannelStatus,
} from '../../../entities/notification-channel.entity';

@Processor('notifications-sms')
export class SmsProcessor extends WorkerHost {
  private readonly logger = new Logger(SmsProcessor.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private channelRepository: NotificationChannelRepository,
    private userRepository: UserRepository,
    private smsProvider: SmsProvider,
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

      const user = await this.userRepository.getUser(notification.user_id);
      if (!user) {
        throw new Error(`User ${notification.user_id} not found`);
      }

      // TODO: Get phone number from user profile
      // For now, this is a placeholder
      const phoneNumber = null; // await this.getUserPhoneNumber(user.id);

      if (!phoneNumber) {
        throw new Error(`No phone number found for user ${user.id}`);
      }

      await this.smsProvider.send(notification, phoneNumber);

      await this.channelRepository.updateStatus(
        channelId,
        NotificationChannelStatus.SENT,
      );

      this.logger.log(`SMS notification ${notificationId} sent successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to send SMS notification ${notificationId}: ${error.message}`,
      );
      await this.channelRepository.updateStatus(
        channelId,
        NotificationChannelStatus.FAILED,
        error.message,
      );
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`SMS job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`SMS job ${job.id} failed: ${error.message}`);
  }
}

