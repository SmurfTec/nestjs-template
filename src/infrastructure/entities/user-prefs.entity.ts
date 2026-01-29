import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'user_prefs' })
@Index('idx_user_prefs_user', ['user_id'], { unique: true })
export class UserPrefs {
  @PrimaryColumn({ type: 'int4' })
  user_id: number;

  @Column({ type: 'jsonb', default: {} })
  dynamic_prefs: Record<string, any>;

  @Column({ type: 'varchar', default: 'UTC' })
  timezone: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;
}

