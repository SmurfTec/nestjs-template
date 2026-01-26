import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Index,
} from 'typeorm';
import { AuditEventType } from 'src/domain/models/audit';

@Entity({ name: 'audit_events' })
@Index(['user_id', 'timestamp'])
@Index(['event_type', 'timestamp'])
export class AuditEvents {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'int4' })
  user_id: number;

  @Column({ type: 'enum', enum: AuditEventType })
  event_type: AuditEventType;

  @Column({ type: 'jsonb' })
  event_data: Record<string, any>;

  @Column({ type: 'varchar', nullable: true })
  ip_address: string;

  @Column({ type: 'varchar', nullable: true })
  user_agent: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
