import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AppModules } from './app_module.entity';
import { AuthPermissions } from './auth-permissions.entity';

@Entity()
export class AppModulePermissions {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AppModules, (appModule) => appModule.appModulePermissions)
  @JoinColumn({ name: 'app_module' })
  app_module: number;

  @ManyToOne(
    () => AuthPermissions,
    (authPermissions) => authPermissions.appModulePermissions,
  )
  @JoinColumn({ name: 'permission' })
  permission: string;

  @CreateDateColumn({ type: 'date' })
  created_on: Date;

  @UpdateDateColumn({ type: 'date' })
  updated_on: Date;
}
