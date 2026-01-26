import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profiles } from './profiles.entity';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  last_login: Date;

  @Column({ type: 'varchar', default: null, nullable: true })
  hach_refresh_token: string;

  @Column({ type: 'bool', default: false })
  is_active: boolean;

  @Column({ type: 'int4', nullable: true })
  profile_id: number;

  @Column({ type: 'varchar', nullable: true })
  stripe_customer_id: string;

  @OneToOne(() => Profiles)
  @JoinColumn({ name: 'profile_id' })
  profile: Profiles;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}