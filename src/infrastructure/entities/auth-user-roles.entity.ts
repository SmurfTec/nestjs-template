import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AuthRoles } from './auth-roles.entity';
import { Users } from './user.entity';

@Entity()
export class AuthUserRoles {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  @ManyToOne(() => AuthRoles, (authRole) => authRole.auth_user_roles)
  @JoinColumn({ name: 'role' })
  role: string;

  @PrimaryColumn({ type: 'int8' })
  @ManyToOne(() => Users, (user) => user.auth_user_roles)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'int8' })
  created_by: number;
}
