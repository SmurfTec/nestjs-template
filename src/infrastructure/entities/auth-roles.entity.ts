import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AuthRolePermissions } from './auth-role-permissions.entity';
import { AuthUserRoles } from './auth-user-roles.entity';

@Entity()
export class AuthRoles {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true, primary: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  parent_role: string;

  @Column({ type: 'int8' })
  created_by: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => AuthUserRoles, (authUserRole) => authUserRole.role)
  auth_user_roles: AuthUserRoles[];

  @OneToMany(
    () => AuthRolePermissions,
    (authRolePermissions) => authRolePermissions.role,
  )
  auth_role_permissions: AuthRolePermissions[];
}
