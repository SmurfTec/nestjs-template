import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'user_notification_settings' })
export class UserNotificationSettings {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4', unique: true })
  @Index()
  user_id: number;

  @Column({ type: 'bool', default: true })
  email_enabled: boolean;

  @Column({ type: 'bool', default: true })
  push_enabled: boolean;

  @Column({ type: 'bool', default: false })
  sms_enabled: boolean;

  @Column({ type: 'bool', default: true })
  in_app_enabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  quiet_hours: { start: string; end: string } | null; // e.g., { start: "22:00", end: "08:00" }

  @Column({ type: 'jsonb', nullable: true })
  preferences: Record<string, any> | null; // Channel-specific preferences

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}

