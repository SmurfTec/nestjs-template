import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { NotificationChannel } from './notification-channel.entity';

export enum NotificationType {
  ORDER = 'ORDER',
  PAYMENT = 'PAYMENT',
  SYSTEM = 'SYSTEM',
  SHIPMENT = 'SHIPMENT',
  RETURN = 'RETURN',
  REFUND = 'REFUND',
  SUBSCRIPTION = 'SUBSCRIPTION',
  MARKETING = 'MARKETING',
}

@Entity({ name: 'notifications' })
@Index(['user_id', 'created_at'])
@Index(['user_id', 'is_read'])
export class Notification {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  @Index()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({
    type: 'varchar',
    length: 50,
    enum: NotificationType,
    default: NotificationType.SYSTEM,
  })
  type: NotificationType;

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any> | null;

  @Column({ type: 'bool', default: false })
  is_read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  read_at: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => NotificationChannel, (channel) => channel.notification, {
    cascade: true,
  })
  channels: NotificationChannel[];
}

