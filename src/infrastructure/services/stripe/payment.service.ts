import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/infrastructure/entities/users.entity';
import Stripe from 'stripe';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { SubscriptionRepository } from 'src/infrastructure/repository/subscription.repository';
import { IndividualTier, PricingConfigService } from '../pricing/pricing-config.service';
import { SubscriptionStatus, SubscriptionTier } from 'src/infrastructure/entities/subscription.entity';
import { BillingIntervalEnum, SubscriptionTierEnum } from 'src/infrastructure/controllers/subscription/subscription.dto';
import { InvoiceService } from '../invoice/invoice.service';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject('STRIPE') private readonly stripe: Stripe,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly pricingConfig: PricingConfigService,
    private readonly invoiceService: InvoiceService,
  ) {}

  /* ---------------------------------------------------
     CUSTOMER
  --------------------------------------------------- */

  async createCustomer(user: Users) {
    const customer = await this.stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id.toString(),
      },
    });

    await this.userRepository.update(user.id, {
      stripe_customer_id: customer.id,
    });

    // create free subscription record immediately
    await this.subscriptionRepo.createFreeSubscription(
      user.id,
      customer.id,
    );

    return customer;
  }

  /* ---------------------------------------------------
     CHECKOUT
  --------------------------------------------------- */

  async createSubscriptionSession(user: Users, priceId: string) {
    if (!user.stripe_customer_id) {
      await this.createCustomer(user);
    }

    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: user.stripe_customer_id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.FRONT_END_BASE_URL || process.env.FRONTEND}/billing/success`,
      cancel_url: `${process.env.FRONT_END_BASE_URL || process.env.FRONTEND}/billing`,
      metadata: {
        userId: user.id.toString(),
      },
    });
  }

  /* ---------------------------------------------------
     WEBHOOK ENTRY
  --------------------------------------------------- */

  async handle(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      case 'invoice.payment_succeeded':
        await this.handleInvoicePaid(
          event.data.object as Stripe.Invoice,
        );
        break;

      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(
          event.data.object as Stripe.Invoice,
        );
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionCancelled(
          event.data.object as Stripe.Subscription,
        );
        break;
    }
  }

  /* ---------------------------------------------------
     WEBHOOK HANDLERS
  --------------------------------------------------- */

  async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    if (session.mode !== 'subscription') return;
    if (!session.subscription || !session.customer) return;

    const subscription = await this.stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!subscription.latest_invoice) {
      throw new Error('Subscription has no invoice yet');
    }

    const invoiceId =
      typeof subscription.latest_invoice === 'string'
        ? subscription.latest_invoice
        : subscription.latest_invoice.id;

    const invoice = await this.stripe.invoices.retrieve(invoiceId);

    const line = invoice.lines.data.find(
      (l) => l.subscription
    );

    if (!line?.period?.end) {
      throw new Error('No billing period found on invoice');
    }

    const currentPeriodEnd = new Date(line.period.end * 1000);

    const price = subscription.items.data[0].price;
    const tier = this.mapPriceToTier(price.id);

    const userId = Number(session.metadata?.userId);

    await this.subscriptionRepo.activateSubscription({
      stripeSubscriptionId: subscription.id,
      tier: tier as IndividualTier,
      priceId: price.id,
      billingInterval: price.recurring!.interval as BillingIntervalEnum,
      status: subscription.status,
      currentPeriodEnd: currentPeriodEnd,
      userId,
    });
  }

  async handleInvoicePaid(invoice: Stripe.Invoice) {
    if (!invoice.lines.data[0].subscription) return;

    const subscription = await this.stripe.subscriptions.retrieve(
      invoice.lines.data[0].subscription as string,
    );

    const price = subscription.items.data[0].price;
    const tier = this.mapPriceToTier(price.id);

    // Find existing subscription to determine owner type
    const existingSub = await this.subscriptionRepo.findByStripeSubscriptionId(
      subscription.id,
    );
    const line = invoice.lines.data.find(
      (l) => l.subscription
    );
    
    if (!line?.period?.end) return;
    
    const currentPeriodEnd = new Date(line.period.end * 1000);

    if (existingSub) {
      await this.subscriptionRepo.activateSubscription({
        stripeSubscriptionId: subscription.id,
        tier: tier as IndividualTier,
        priceId: price.id,
        billingInterval: price.recurring!.interval as BillingIntervalEnum,
        status: subscription.status,
        currentPeriodEnd: currentPeriodEnd,
      });

      // Create invoice record and generate PDF
      try {
        await this.invoiceService.createInvoiceFromStripe(
          invoice,
          existingSub.owner_id,
        );
      } catch (error) {
        // Log error but don't fail the webhook
        console.error('Error creating invoice:', error);
      }
    }
  }

  async handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    if (!invoice.lines.data[0].subscription) return;

    await this.subscriptionRepo.markPastDue(invoice.lines.data[0].subscription as string);
  }

  async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    await this.subscriptionRepo.syncFromStripe(subscription);
  }

  async handleSubscriptionCancelled(
    subscription: Stripe.Subscription,
  ) {
    await this.subscriptionRepo.cancelSubscription(subscription.id);
  }

  /* ---------------------------------------------------
     USER ACTIONS
  --------------------------------------------------- */

  async cancelSubscription(
    stripeSubscriptionId: string,
    immediately: boolean = false,
  ) {
    if (immediately) {
      await this.stripe.subscriptions.cancel(stripeSubscriptionId);
      await this.subscriptionRepo.cancelSubscription(stripeSubscriptionId);
    } else {
      await this.subscriptionRepo.markCanceling(stripeSubscriptionId);
      await this.stripe.subscriptions.update(stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }
  }

  async upgradeSubscription(
    stripeSubscriptionId: string,
    targetTier: SubscriptionTier,
    billingInterval?: BillingIntervalEnum,
  ) {
    const subscription = await this.stripe.subscriptions.retrieve(
      stripeSubscriptionId,
    );

    const newPriceId = this.pricingConfig.getStripePriceId(
      targetTier as IndividualTier,
      billingInterval || BillingIntervalEnum.MONTHLY,
    );

    if (!newPriceId) {
      throw new Error(`Price ID not found for tier ${targetTier}`);
    }

    // Update subscription with new price
    const updated = await this.stripe.subscriptions.update(
      stripeSubscriptionId,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: newPriceId,
          },
        ],
        proration_behavior: 'always_invoice',
      },
    );

    // Sync to database
    await this.subscriptionRepo.syncFromStripe(updated);

    return updated;
  }

  async startTrial(userId: number, tier: IndividualTier) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.stripe_customer_id) {
      throw new Error('User or Stripe customer not found');
    }

    const priceId = this.pricingConfig.getStripePriceId(tier, BillingIntervalEnum.MONTHLY);
    if (!priceId) {
      throw new Error(`Price ID not found for tier ${tier}`);
    }

    // Create subscription with 7-day trial
    const subscription = await this.stripe.subscriptions.create({
      customer: user.stripe_customer_id,
      items: [{ price: priceId }],
      trial_period_days: 7,
      metadata: {
        userId: userId.toString(),
        ownerType: 'user',
      },
    });

    const trialEndsAt = new Date(subscription.trial_end! * 1000);

    await this.subscriptionRepo.activateSubscription({
      stripeSubscriptionId: subscription.id,
      tier,
      priceId,
      billingInterval: BillingIntervalEnum.MONTHLY,
      status: 'trialing',
      currentPeriodEnd: trialEndsAt,
      userId,
      trialEndsAt,
    });

    return subscription;
  }

  async scheduleDowngrade(
    stripeSubscriptionId: string,
    targetTier: SubscriptionTierEnum.FREE | SubscriptionTierEnum.STARTER,
    effectiveAt: Date,
  ) {
    await this.subscriptionRepo.scheduleDowngrade(
      stripeSubscriptionId,
      targetTier,
      effectiveAt,
    );
  }

  /* ---------------------------------------------------
     HELPERS
  --------------------------------------------------- */

  private mapPriceToTier(priceId: string): SubscriptionTier {
    // Try to match from pricing config first
    const allTiers = this.pricingConfig.getAllIndividualTiers();
    for (const [tier, config] of Object.entries(allTiers)) {
      if (
        config.stripePriceIdMonthly === priceId ||
        config.stripePriceIdYearly === priceId
      ) {
        return tier as SubscriptionTier;
      }
    }

    // Fallback to direct mapping (for backward compatibility)
    const map: Record<string, SubscriptionTier> = {
      price_starter: 'starter',
      price_pro: 'pro',
      price_elite: 'elite',
    };

    return map[priceId] || 'free';
  }

  @Cron('0 */12 * * *')
  async reconcileStripeState() {
    const subs = await this.subscriptionRepo.findActive();

    for (const sub of subs) {
      const stripeSub = await this.stripe.subscriptions.retrieve(
        sub.stripe_subscription_id,
      );

      if (stripeSub.status !== sub.status) {
        await this.subscriptionRepo.syncFromStripe(stripeSub);
      }
    }
  }

  @Cron('0 */6 * * *')
  async handleTrialsEnding() {
    const soon = dayjs().add(2, 'day').toDate();

    const subs = await this.subscriptionRepo.findTrialsEndingBefore(soon);

    // send emails, warnings, UI banners
  }

  @Cron('0 3 * * *')
  async enforcePastDueRules() {
    const cutoff = dayjs().subtract(14, 'day').toDate();

    const subs = await this.subscriptionRepo.findPastDueBefore(cutoff);

    for (const sub of subs) {
      await this.subscriptionRepo.scheduleDowngrade(
        sub.stripe_subscription_id,
        SubscriptionTierEnum.FREE,
        new Date(),
      );
    }
  }

  @Cron('0 * * * *')
  async applyDowngrades() {
    const now = new Date();

    const subs = await this.subscriptionRepo.find({
      where: {
        pending_effective_at: LessThanOrEqual(now),
      },
    });

    for (const sub of subs) {
      await this.subscriptionRepo.applyScheduledDowngrade(
        sub.stripe_subscription_id,
      );
    }
  }
}
