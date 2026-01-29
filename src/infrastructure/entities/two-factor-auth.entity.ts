import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'two_factor_auth' })
@Index(['user_id'], { unique: true })
export class TwoFactorAuth {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  user_id: number;

  @Column({ type: 'varchar', nullable: true })
  secret: string; // Encrypted secret

  @Column({ type: 'bool', default: false })
  is_enabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  recovery_codes: string[]; // Array of hashed recovery codes

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

