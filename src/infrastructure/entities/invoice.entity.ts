import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum InvoiceStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity({ name: 'invoices' })
@Index(['stripe_invoice_id'], { unique: true })
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  invoice_number: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  stripe_invoice_id: string | null;

  @Column({ type: 'int4' })
  owner_id: number;

  @Column({ type: 'varchar' })
  status: InvoiceStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @Column({ type: 'timestamp' })
  issue_date: Date;

  @Column({ type: 'timestamp' })
  due_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  line_items: {
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
    period?: {
      start: string;
      end: string;
    };
  }[];

  @Column({ type: 'jsonb', nullable: true })
  billing_address: {
    name: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;

  @Column({ type: 'jsonb', nullable: true })
  shipping_address: {
    name: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;

  @Column({ type: 'varchar', nullable: true })
  pdf_path: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

