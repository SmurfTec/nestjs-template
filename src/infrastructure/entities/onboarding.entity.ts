import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { OnboardingState } from 'src/domain/models/onboarding';

@Entity({ name: 'onboarding' })
export class Onboarding {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  user_id: number;

  @Column({ type: 'enum', enum: OnboardingState, default: OnboardingState.NOT_STARTED })
  state: OnboardingState;

  @Column({ type: 'jsonb', nullable: true })
  personal_details: Record<string, any>;

  @Column({ type: 'bool', default: true })
  is_active: boolean;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
