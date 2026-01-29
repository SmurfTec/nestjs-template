import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, LessThanOrEqual, IsNull, Repository, FindManyOptions } from 'typeorm';
import { Subscription, SubscriptionStatus, SubscriptionTier } from '../entities/subscription.entity';
import { Users } from '../entities/users.entity';
import Stripe from 'stripe';
import { IndividualTier } from '../services/pricing/pricing-config.service';
import { BillingIntervalEnum, SubscriptionTierEnum } from '../controllers/subscription/subscription.dto';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  /* ---------------------------------------------------
     FINDERS
  --------------------------------------------------- */

  findByOwner(ownerId: number) {
    return this.repo.findOne({
      where: { owner_id: ownerId },
    });
  }

  findByStripeSubscriptionId(stripeSubscriptionId: string) {
    return this.repo.findOne({
      where: { stripe_subscription_id: stripeSubscriptionId },
    });
  }

  findByStripeCustomerId(stripeCustomerId: string) {
    return this.repo.findOne({
      where: { stripe_customer_id: stripeCustomerId },
    });
  }

  /* ---------------------------------------------------
     CREATION
  --------------------------------------------------- */

  async createFreeSubscription(
    ownerId: number,
    stripeCustomerId: string,
  ) {
    const sub = this.repo.create({
      owner_id: ownerId,
      stripe_customer_id: stripeCustomerId,
      tier: SubscriptionTierEnum.FREE,
      status: 'active',
    });

    return this.repo.save(sub);
  }

  async createPaidSubscription(data: Partial<Subscription>) {
    const sub = this.repo.create(data);
    return this.repo.save(sub);
  }

  /* ---------------------------------------------------
     UPDATES (called by webhooks)
  --------------------------------------------------- */

  async activateSubscription(params: {
    stripeSubscriptionId: string;
    tier: IndividualTier;
    priceId: string;
    billingInterval: BillingIntervalEnum;
    status: SubscriptionStatus;
    currentPeriodEnd: Date;
    userId?: number;
    trialEndsAt?: Date;
  }) {
    const updateData: any = {
      tier: params.tier,
      price_id: params.priceId,
      billing_interval: params.billingInterval,
      status: params.status,
      current_period_end: params.currentPeriodEnd,
      pending_tier: null,
      pending_effective_at: null,
    };

    if (params.trialEndsAt) {
      updateData.trial_ends_at = params.trialEndsAt;
    }

    // Find existing subscription
    let sub: Subscription | null = await this.findByStripeSubscriptionId(params.stripeSubscriptionId);
    
    if (sub) {
      // Update existing subscription
      await this.repo.update(
        { stripe_subscription_id: params.stripeSubscriptionId },
        updateData,
      );
    } else {
      // Try to find by owner if userId provided
      if (params.userId) {
        sub = await this.findByOwner(params.userId);
        if (sub) {
          // Update existing subscription with new Stripe subscription ID
          await this.repo.update(
            { id: sub.id },
            {
              ...updateData,
              stripe_subscription_id: params.stripeSubscriptionId,
            },
          );
        } else {
          // Create new subscription if doesn't exist
          const user = await this.userRepo.findOne({ where: { id: params.userId } });
          if (user && user.stripe_customer_id) {
            const newSub = this.repo.create({
              owner_id: params.userId,
              stripe_customer_id: user.stripe_customer_id,
              stripe_subscription_id: params.stripeSubscriptionId,
              ...updateData,
            });
            const savedSub = await this.repo.save(newSub);
            sub = Array.isArray(savedSub) ? savedSub[0] : savedSub;
          }
        }
      }
    }

    return this.findByStripeSubscriptionId(params.stripeSubscriptionId);
  }

  async findPastDueBefore(date: Date) {
    return this.repo.find({
      where: {
        status: 'past_due',
        past_due_since: LessThanOrEqual(date),
        stripe_subscription_id: Not(IsNull()),
      },
      select: [
        'id',
        'owner_id',
        'tier',
        'past_due_since',
        'stripe_subscription_id',
      ],
      order: {
        past_due_since: 'ASC',
      },
    });
  }

  async findTrialsEndingBefore(date: Date) {
    return this.repo.find({
      where: {
        status: 'trialing',
        trial_ends_at: LessThanOrEqual(date),
        stripe_subscription_id: Not(IsNull()),
      },
      select: [
        'id',
        'owner_id',
        'tier',
        'trial_ends_at',
        'stripe_subscription_id',
      ],
      order: {
        trial_ends_at: 'ASC',
      },
    });
  }

  async markPastDue(stripeSubscriptionId: string) {
    return this.repo.update(
      { stripe_subscription_id: stripeSubscriptionId },
      { status: 'past_due' },
    );
  }

  /* ---------------------------------------------------
     DOWNGRADES
  --------------------------------------------------- */

  async scheduleDowngrade(
    stripeSubscriptionId: string,
    targetTier: Subscription['tier'],
    effectiveAt: Date,
  ) {
    return this.repo.update(
      { stripe_subscription_id: stripeSubscriptionId },
      {
        pending_tier: targetTier,
        pending_effective_at: effectiveAt,
      },
    );
  }

  async applyScheduledDowngrade(stripeSubscriptionId: string) {
    const sub = await this.findByStripeSubscriptionId(stripeSubscriptionId);
    if (!sub || !sub.pending_tier) return;

    return this.repo.update(
      { stripe_subscription_id: stripeSubscriptionId },
      {
        tier: sub.pending_tier as IndividualTier,
        pending_tier: null,
        pending_effective_at: null,
      },
    );
  }

  /* ---------------------------------------------------
     CANCELLATION
  --------------------------------------------------- */

  async markCanceling(stripeSubscriptionId: string) {
    return this.repo.update(
      { stripe_subscription_id: stripeSubscriptionId },
      { status: 'canceling' as SubscriptionStatus },
    );
  }

  async cancelSubscription(stripeSubscriptionId: string) {
    return this.repo.update(
      { stripe_subscription_id: stripeSubscriptionId },
      {
        status: 'canceled',
        tier: SubscriptionTierEnum.FREE,
        stripe_subscription_id: null,
        price_id: null,
        billing_interval: null,
        pending_tier: null,
        pending_effective_at: null,
        current_period_end: null,
      },
    );
  }

  async find(options?: FindManyOptions<Subscription>) {
    return this.repo.find(options);
  }

  async findActive() {
    return this.repo.find({
      where: {
        status: In(['active', 'trialing', 'past_due', 'canceling']),
        stripe_subscription_id: Not(IsNull()),
      },
      select: [
        'id',
        'owner_id',
        'tier',
        'status',
        'stripe_subscription_id',
        'current_period_end',
        'pending_tier',
        'pending_effective_at',
      ],
    });
  }

  async syncFromStripe(stripeSub: Stripe.Subscription) {
    const price = stripeSub.items.data[0]?.price;
    if (!price) return;
  
    const update: Record<string, any> = {
      status: stripeSub.status as SubscriptionStatus,
    };
  
    // Clear pending downgrade if Stripe is active again
    if (stripeSub.status === 'active') {
      update.pending_tier = null;
      update.pending_effective_at = null;
    }
  
    // Handle canceled state
    if (stripeSub.status === 'canceled') {
      update.tier = 'free';
      update.price_id = null;
      update.billing_interval = null;
      update.pending_tier = null;
      update.pending_effective_at = null;
      update.stripe_subscription_id = null;
      update.current_period_end = null;
    }
  
    await this.repo.update(
      { stripe_subscription_id: stripeSub.id },
      update,
    );
  }
}