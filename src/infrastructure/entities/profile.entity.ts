import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './user.entity';

@Entity()
export class Profiles {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  phone_otp: number;

  @Column({ type: 'timestamp', nullable: true })
  phone_otp_expiry: Date;
  
  @Column({ type: 'varchar', nullable: true })
  upcoming_phone: string;

  @Column({ type: 'int', nullable: true })
  upcoming_phone_otp: number;

  @Column({ type: 'timestamp', nullable: true })
  upcoming_phone_otp_expiry: Date;

  @Column({ type: 'varchar', nullable: true })
  document_front: string;

  @Column({ type: 'varchar', nullable: true })
  document_back: string;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user' })
  user: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_on: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_on: Date;
}
