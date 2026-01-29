// src/modules/billing/entities/subscription.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
import { IndividualTier } from '../services/pricing/pricing-config.service';
import { BillingIntervalEnum } from '../controllers/subscription/subscription.dto';
  
  export type SubscriptionStatus =
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';

  export type SubscriptionTier = 
    'free' | 
    'starter' | 
    'pro' | 
    'elite';
  
  @Entity('subscriptions')
  @Index(['owner_id'], { unique: true })
  export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    owner_id: number;
  
    @Index({ unique: true })
    @Column()
    stripe_customer_id: string;
  
    @Index({ unique: true })
    @Column({ nullable: true })
    stripe_subscription_id: string | null;
  
    @Column()
    tier: IndividualTier;
  
    @Column({ nullable: true })
    billing_interval: BillingIntervalEnum | null;
  
    @Column()
    status: SubscriptionStatus;
  
    @Column({ nullable: true })
    price_id: string | null;
  
    @Column({ nullable: true })
    pending_tier: IndividualTier | null;
  
    @Column({ type: 'timestamptz', nullable: true })
    pending_effective_at: Date | null;
  
    @Column({ type: 'timestamptz', nullable: true })
    trial_ends_at: Date | null;
  
    @Column({ type: 'timestamptz', nullable: true })
    current_period_end: Date | null;

    @Column({ type: 'timestamptz', nullable: true })
    past_due_since: Date | null;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  