import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';
import { Notifications } from './notification.entity';

@Entity()
export class UserNotifications {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @ManyToOne(() => Users, (users) => users)
  @JoinColumn({ name: 'user' })
  user: number;

  @ManyToOne(() => Notifications, (notifications) => notifications)
  @JoinColumn({ name: 'notification' })
  notification: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
