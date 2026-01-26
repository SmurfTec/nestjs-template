import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotificationChannel,
  NotificationChannelStatus,
  NotificationChannelType,
} from '../entities/notification-channel.entity';

@Injectable()
export class NotificationChannelRepository {
  constructor(
    @InjectRepository(NotificationChannel)
    private channelRepository: Repository<NotificationChannel>,
  ) {}

  async create(channel: Partial<NotificationChannel>): Promise<NotificationChannel> {
    return await this.channelRepository.save(channel);
  }

  async findByNotificationId(notificationId: number): Promise<NotificationChannel[]> {
    return await this.channelRepository.find({
      where: { notification_id: notificationId },
    });
  }

  async updateStatus(
    id: number,
    status: NotificationChannelStatus,
    error?: string,
  ): Promise<void> {
    const updateData: Partial<NotificationChannel> = {
      status,
      sent_at: status === NotificationChannelStatus.SENT ? new Date() : null,
      error: error || null,
    };

    if (status === NotificationChannelStatus.RETRYING) {
      const channel = await this.channelRepository.findOne({ where: { id } });
      if (channel) {
        updateData.retry_count = channel.retry_count + 1;
      }
    }

    await this.channelRepository.update(id, updateData);
  }

  async findPendingChannels(limit: number = 100): Promise<NotificationChannel[]> {
    return await this.channelRepository.find({
      where: { status: NotificationChannelStatus.PENDING },
      take: limit,
      order: { created_at: 'ASC' },
      relations: ['notification'],
    });
  }
}

