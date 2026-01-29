import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { Notification, NotificationType } from '../entities/notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(notification: Partial<Notification>): Promise<Notification> {
    return await this.notificationRepository.save(notification);
  }

  async findById(id: number): Promise<Notification | null> {
    return await this.notificationRepository.findOne({
      where: { id },
      relations: ['channels'],
    });
  }

  async findByUserId(
    userId: number,
    options?: {
      limit?: number;
      offset?: number;
      cursor?: number;
      isRead?: boolean;
      type?: NotificationType;
    },
  ): Promise<Notification[]> {
    const where: FindOptionsWhere<Notification> = { user_id: userId };
    
    if (options?.isRead !== undefined) {
      where.is_read = options.isRead;
    }
    
    if (options?.type) {
      where.type = options.type;
    }

    const queryBuilder = this.notificationRepository
      .createQueryBuilder('notification')
      .where(where)
      .orderBy('notification.created_at', 'DESC');

    if (options?.cursor) {
      queryBuilder.andWhere('notification.id < :cursor', { cursor: options.cursor });
    }

    if (options?.limit) {
      queryBuilder.limit(options.limit);
    }

    if (options?.offset) {
      queryBuilder.offset(options.offset);
    }

    return await queryBuilder.getMany();
  }

  async markAsRead(id: number): Promise<void> {
    await this.notificationRepository.update(id, {
      is_read: true,
      read_at: new Date(),
    });
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update(
      { user_id: userId, is_read: false },
      {
        is_read: true,
        read_at: new Date(),
      },
    );
  }

  async getUnreadCount(userId: number): Promise<number> {
    return await this.notificationRepository.count({
      where: { user_id: userId, is_read: false },
    });
  }

  async deleteOldNotifications(daysOld: number = 90): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    await this.notificationRepository.delete({
      created_at: LessThan(cutoffDate),
    });
  }
}

