import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SubscriptionRepository } from 'src/infrastructure/repository/subscription.repository';
import { PaymentsService } from 'src/infrastructure/services/stripe/payment.service';
import { IndividualTier, PricingConfigService } from 'src/infrastructure/services/pricing/pricing-config.service';
import { UserRepository } from 'src/infrastructure/repository/users.repository';
import { Subscription, SubscriptionTier } from 'src/infrastructure/entities/subscription.entity';
import { BillingIntervalEnum, CreateCheckoutSessionDto, UpgradeSubscriptionDto } from 'src/infrastructure/controllers/subscription/subscription.dto';
import { Users } from 'src/infrastructure/entities/users.entity';

@Injectable()
export class SubscriptionUseCase {
  constructor(
    private readonly subscriptionRepo: SubscriptionRepository,
    private readonly paymentsService: PaymentsService,
    private readonly pricingConfig: PricingConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async getSubscription(userId: number): Promise<Subscription> {
    const ownerId = userId;
    const subscription = await this.subscriptionRepo.findByOwner(ownerId);
    
    if (!subscription) {
      // Create free subscription if doesn't exist
      const user = await this.userRepository.getUser(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.stripe_customer_id) {
        await this.paymentsService.createCustomer(user as Users);
        return await this.subscriptionRepo.findByOwner(ownerId);
      }
    }

    return subscription;
  }

  async createCheckoutSession(
    userId: number,
    dto: CreateCheckoutSessionDto,
  ) {
    const user = await this.userRepository.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure customer exists
    if (!user.stripe_customer_id) {
      await this.paymentsService.createCustomer(user as Users);
    }
    const priceId = this.pricingConfig.getStripePriceId(
      dto.tier,
      dto.billingInterval,
    );
    if (!priceId) {
      throw new BadRequestException(
        `Price ID not configured for tier ${dto.tier} with interval ${dto.billingInterval}`,
      );
    }

    return await this.paymentsService.createSubscriptionSession(user as Users, priceId);
  }

  async upgradeSubscription(
    userId: number,
    dto: UpgradeSubscriptionDto,
  ) {
    const ownerId = userId;
    const subscription = await this.subscriptionRepo.findByOwner(ownerId);
    
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.stripe_subscription_id) {
      // No active Stripe subscription, create checkout session
      return await this.createCheckoutSession(userId, {
        tier: dto.targetTier,
        billingInterval: dto.billingInterval || BillingIntervalEnum.MONTHLY,
      });
    }

    // Upgrade existing subscription
    return await this.paymentsService.upgradeSubscription(
      subscription.stripe_subscription_id,
      dto.targetTier,
      dto.billingInterval,
    );
  }

  async cancelSubscription(
    userId: number,
    immediately: boolean = false,
  ) {
    const ownerId = userId;
    const subscription = await this.subscriptionRepo.findByOwner(ownerId);
    
    if (!subscription || !subscription.stripe_subscription_id) {
      throw new NotFoundException('Active subscription not found');
    }

    return await this.paymentsService.cancelSubscription(
      subscription.stripe_subscription_id,
      immediately,
    );
  }

  async getPricingTiers() {
    return {
      individual: this.pricingConfig.getAllIndividualTiers(),
    };
  }

  async startTrial(userId: number, tier: SubscriptionTier) {
    const user = await this.userRepository.getUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.stripe_customer_id) {
      await this.paymentsService.createCustomer(user as Users);
    }

    const subscription = await this.subscriptionRepo.findByOwner(userId);
    if (subscription && subscription.tier !== 'free') {
      throw new BadRequestException('User already has an active subscription');
    }

    // Create 7-day Pro trial
    return await this.paymentsService.startTrial(userId, tier as IndividualTier);
  }
}

