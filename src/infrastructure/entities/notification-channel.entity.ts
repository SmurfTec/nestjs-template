import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Notification } from './notification.entity';

export enum NotificationChannelType {
  IN_APP = 'IN_APP',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  SMS = 'SMS',
}

export enum NotificationChannelStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
}

@Entity({ name: 'notification_channels' })
@Index(['notification_id'])
@Index(['status', 'created_at'])
export class NotificationChannel {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  notification_id: number;

  @Column({
    type: 'varchar',
    length: 20,
    enum: NotificationChannelType,
  })
  channel: NotificationChannelType;

  @Column({
    type: 'varchar',
    length: 20,
    enum: NotificationChannelStatus,
    default: NotificationChannelStatus.PENDING,
  })
  status: NotificationChannelStatus;

  @Column({ type: 'text', nullable: true })
  error: string | null;

  @Column({ type: 'timestamp', nullable: true })
  sent_at: Date | null;

  @Column({ type: 'int', default: 0 })
  retry_count: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Notification, (notification) => notification.channels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;
}

