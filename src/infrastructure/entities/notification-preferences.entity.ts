import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'notification_preferences' })
@Index(['user_id'], { unique: true })
export class NotificationPreferences {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  user_id: number;

  @Column({ type: 'boolean', default: true })
  email_alerts: boolean;

  @Column({ type: 'boolean', default: true })
  push_notifications: boolean;

  @Column({ type: 'boolean', default: true })
  in_app_digest: boolean;

  @Column({ type: 'boolean', default: false })
  marketing_emails: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

