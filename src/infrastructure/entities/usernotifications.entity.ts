import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Notifications } from './notification.entity';
import { Users } from './user.entity';

@Entity()
export class UserNotifications {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'bool', default: false })
  seen: boolean;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @ManyToOne(() => Notifications, (notifications) => notifications)
  @JoinColumn({ name: 'notification' })
  notification: number;

  @ManyToOne(() => Users, (users) => users)
  @JoinColumn({ name: 'user' })
  user: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
