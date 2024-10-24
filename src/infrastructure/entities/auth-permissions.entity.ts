import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AppModules } from './app_module.entity';
import { AppModulePermissions } from './app_module_permissions.entity';
import { AuthRolePermissions } from './auth-role-permissions.entity';
import { AuthUserPermissions } from './auth-user-permissions.entity';

@Entity()
export class AuthPermissions {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true, primary: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // @ManyToOne(() => AppModules, (appModules) => appModules.auth_permissions, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'app_module' })
  // app_module: number;

  @OneToMany(
    () => AuthUserPermissions,
    (authUserPermission) => authUserPermission.permissions,
  )
  @JoinColumn({ name: 'auth_user_permissions' })
  auth_user_permissions: AuthUserPermissions;

  @OneToMany(
    () => AuthRolePermissions,
    (authRolePermissions) => authRolePermissions.permissions,
  )
  @OneToMany(
    () => AppModulePermissions,
    (appModulePermissions) => appModulePermissions.permission,
  )
  appModulePermissions: AppModulePermissions[];

  @JoinColumn({ name: 'auth_role_permissions' })
  auth_role_permissions: string;
}
