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
import { AuthUserRoles } from './auth-user-roles.entity';

@Entity()
export class AuthRolePermissions {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  @ManyToOne(
    () => AuthPermissions,
    (authPermissions) => authPermissions.auth_role_permissions,
  )
  @JoinColumn({ name: 'permissions' })
  permissions: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  @ManyToOne(() => AuthRoles, (authRole) => authRole.auth_role_permissions)
  @JoinColumn({ name: 'role' })
  role: string;

  @Column({ type: 'int8' })
  created_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
