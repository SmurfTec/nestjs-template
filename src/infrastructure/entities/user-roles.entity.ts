import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Roles } from './roles.entity';

@Entity()
export class UserRoles {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'bool', default: false })
  is_active: boolean;

  @Column({ type: 'int4', nullable: true })
  user_id: number;

  @ManyToOne(() => Users, (users) => users)
  @JoinColumn({ name: 'user_id' })
  userIdData: Users;

  @Column({ type: 'int4', nullable: true })
  role_id: number;

  @ManyToOne(() => Roles, (roles) => roles)
  @JoinColumn({ name: 'role_id' })
  roleIdData: Roles;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
