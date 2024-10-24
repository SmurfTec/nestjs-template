import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { AuthPermissions } from './auth-permissions.entity';
import { AuthRoles } from './auth-roles.entity';
import { Users } from './user.entity';

@Entity()
export class AuthUserPermissions {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  @ManyToOne(
    () => AuthPermissions,
    (authPermission) => authPermission.auth_user_permissions,
  )
  @JoinColumn({ name: 'permissions' })
  permissions: string;

  @PrimaryColumn({ type: 'int8' })
  @ManyToOne(() => Users, (user) => user.auth_user_permissions)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'bool', default: true })
  is_allow: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'int8' })
  created_by: number;
}
