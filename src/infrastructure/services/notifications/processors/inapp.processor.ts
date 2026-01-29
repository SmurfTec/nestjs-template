import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { NotificationRepository } from '../../../repository/notification.repository';
import { NotificationChannelRepository } from '../../../repository/notification-channel.repository';
import {
  NotificationChannelStatus,
} from '../../../entities/notification-channel.entity';

@Processor('notifications-inapp')
export class InAppProcessor extends WorkerHost {
  private readonly logger = new Logger(InAppProcessor.name);

  constructor(
    private notificationRepository: NotificationRepository,
    private channelRepository: NotificationChannelRepository,
  ) {
    super();
  }

  async process(job: Job<{ notificationId: number; channelId: number }>): Promise<void> {
    const { notificationId, channelId } = job.data;

    try {
      // In-app notifications are already persisted, just mark channel as sent
      await this.channelRepository.updateStatus(
        channelId,
        NotificationChannelStatus.SENT,
      );

      this.logger.log(`In-app notification ${notificationId} processed successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to process in-app notification ${notificationId}: ${error.message}`,
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
    this.logger.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    this.logger.error(`Job ${job.id} failed: ${error.message}`);
  }
}

