import { Injectable } from '@nestjs/common';
import { BillingIntervalEnum, SubscriptionTierEnum } from 'src/infrastructure/controllers/subscription/subscription.dto';

export type IndividualTier = 
    | SubscriptionTierEnum.FREE
    | SubscriptionTierEnum.STARTER
    | SubscriptionTierEnum.PRO
    | SubscriptionTierEnum.ELITE;

export type BillingInterval = 
    | BillingIntervalEnum.MONTHLY
    | BillingIntervalEnum.YEARLY;

export interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  features: string[];
}

@Injectable()
export class PricingConfigService {
  // Individual Tier Pricing (from document)
  private readonly individualTiers: Record<IndividualTier, PricingTier> = {
    free: {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        'Amazon SP-API connection',
        'Basic dashboards',
        'Core analytics',
      ],
    },
    starter: {
      name: 'Starter',
      monthlyPrice: 29,
      yearlyPrice: 290, // ~17% discount
      features: [
        'Everything in Free',
        'Core dashboards',
        'Basic insights',
        'Email support',
      ],
    },
    pro: {
      name: 'Pro',
      monthlyPrice: 79,
      yearlyPrice: 790, // ~17% discount
      features: [
        'Everything in Starter',
        'AI Assistant',
        'Advanced alerts',
        'COGS Upload',
        'Real-time insights',
        'Priority support',
      ],
    },
    elite: {
      name: 'Elite',
      monthlyPrice: 199,
      yearlyPrice: 1990, // ~17% discount
      features: [
        'Everything in Pro',
        'Capital Eligibility Engine',
        'API Access',
        'Premium alerts',
        'Funding previews',
        'Early access to new features',
        '1 free consultation with product expert (annual only)',
      ],
    },
  };

  getIndividualTier(tier: IndividualTier): PricingTier {
    return this.individualTiers[tier];
  }

  getAllIndividualTiers(): Record<IndividualTier, PricingTier> {
    return this.individualTiers;
  }

  getPrice(
    tier: IndividualTier,
    interval: BillingInterval,
  ): number {
    const individualTier = this.individualTiers[tier as IndividualTier];
    return interval === 'monthly'
      ? individualTier.monthlyPrice
      : individualTier.yearlyPrice;
  }

  calculateYearlyDiscount(monthlyPrice: number): number {
    return Math.round(monthlyPrice * 12 * Number(process.env.YEARLY_DISCOUNT || 0)); // 17% discount
  }

  // Map Stripe price IDs to tiers (these should be set from environment or Stripe dashboard)
  setStripePriceId(
    tier: IndividualTier,
    interval: BillingInterval,
    priceId: string,
  ): void {
    const individualTier = this.individualTiers[tier as IndividualTier];
    if (interval === 'monthly') {
      individualTier.stripePriceIdMonthly = priceId;
    } else {
      individualTier.stripePriceIdYearly = priceId;
    }
  }

  getStripePriceId(
    tier: IndividualTier,
    interval: BillingInterval,
  ): string | undefined {
    const individualTier = this.individualTiers[tier as IndividualTier];
    return interval == 'monthly'
      ? individualTier.stripePriceIdMonthly
      : individualTier.stripePriceIdYearly;
  }
}

