import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Users } from './users.entity';

export enum DevicePlatform {
  IOS = 'IOS',
  ANDROID = 'ANDROID',
  WEB = 'WEB',
}

@Entity({ name: 'device_tokens' })
@Index(['token'], { unique: true })
export class DeviceToken {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  @Index()
  user_id: number;

  @Column({ type: 'text', unique: true })
  token: string;

  @Column({
    type: 'varchar',
    length: 20,
    enum: DevicePlatform,
  })
  platform: DevicePlatform;

  @Column({ type: 'varchar', length: 255, nullable: true })
  device_name: string | null;

  @Column({ type: 'timestamp', nullable: true })
  last_used_at: Date | null;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}

