import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import {
  notificationEnums,
  notificationEnumsArray,
} from '../common/enums/notifications.enums';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', default: null })
  message: string;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @Column({
    type: 'enum',
    enum: notificationEnums,
    default: notificationEnums.ALL,
  })
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;

  @Column({ type: 'varchar', default: null })
  resource_name: string;

  @Column({ type: 'int', default: null })
  resource_id: number;

  @Column({ type: 'int', default: null })
  from_user_id: number;

  @Column({ type: 'varchar', default: null })
  from_user_name: string;
}
