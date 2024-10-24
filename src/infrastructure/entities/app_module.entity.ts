import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AppModulePermissions } from './app_module_permissions.entity';
import { AuthPermissions } from './auth-permissions.entity';

@Entity()
export class AppModules {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(
    () => AppModulePermissions,
    (appModulePermissions) => appModulePermissions.app_module,
  )
  appModulePermissions: AppModulePermissions[];

  // @OneToMany(
  //   () => AuthPermissions,
  //   (authPermissions) => authPermissions.app_module,
  // )
  // auth_permissions: AuthPermissions[];

  @CreateDateColumn({ type: 'date' })
  created_on: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_on: Date;
}
