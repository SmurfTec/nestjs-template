import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'varchar', nullable: true })
  resource_name?: string;

  @Column({ type: 'int', nullable: true })
  resource_id?: number;

  @Column({ type: 'int', nullable: true })
  from_user_id?: number;

  @Column({ type: 'varchar', nullable: true })
  from_user_name?: string;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @ManyToMany(() => Users)
  @JoinColumn({ name: 'users' })
  users: Users[];

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
