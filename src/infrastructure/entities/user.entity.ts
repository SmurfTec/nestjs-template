import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { AuthUserRoles } from './auth-user-roles.entity';
import { AuthUserPermissions } from './auth-user-permissions.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', nullable: true })
  signup_otp: number;

  @Column({ type: 'int', nullable: true })
  forget_email_otp: number;

  @Column({ type: 'timestamp', nullable: true })
  signup_otp_expiry: Date;

  @Column({ type: 'timestamp', nullable: true })
  forget_email_otp_expiry: Date;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', nullable: true })
  agent_rera: string;

  @Column({ type: 'boolean', default: false })
  is_social_login: boolean;

  @Column({ type: 'boolean', default: false })
  is_email_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_phone_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_rere_verified: boolean;

  @Column({ type: 'boolean', default: false })
  is_face_verified: boolean;

  @Column({ type: 'varchar', nullable: true })
  upcoming_email: string;

  @Column({ type: 'int', nullable: true })
  upcoming_email_otp: number;

  @Column({ type: 'timestamp', nullable: true })
  upcoming_email_otp_expiry: Date;

  @Column({ type: 'boolean', default: true })
  allow_notifications: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'varchar', nullable: true })
  hashRefreshToken: string;

  @Column({ type: 'boolean', default: false })
  is_banned: boolean;

  @OneToMany(() => AuthUserRoles, (authUserRole) => authUserRole.user_id)
  auth_user_roles: AuthUserRoles[];

  @OneToMany(
    () => AuthUserPermissions,
    (authUserPermission) => authUserPermission.user_id,
  )
  auth_user_permissions: AuthUserPermissions[];

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
