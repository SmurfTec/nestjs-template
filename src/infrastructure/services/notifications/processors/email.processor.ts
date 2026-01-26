import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationRepository } from '../../../repository/notification.repository';
import { NotificationChannelRepository } from '../../../repository/notification-channel.repository';
import { UserRepository } from '../../../repository/users.repository';
import { EmailProvider } from '../providers/email.provider';
import {
  NotificationChannelStatus,
} from '../../../entities/notification-channel.entity';

@Processor('notifications-email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private channelRepository: NotificationChannelRepository,
    private userRepository: UserRepository,
    private emailProvider: EmailProvider,
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

      await this.emailProvider.send(notification, user);

      await this.channelRepository.updateStatus(
        channelId,
        NotificationChannelStatus.SENT,
      );

      this.logger.log(`Email notification ${notificationId} sent successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to send email notification ${notificationId}: ${error.message}`,
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
    this.logger.log(`Email job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Email job ${job.id} failed: ${error.message}`);
  }
}

