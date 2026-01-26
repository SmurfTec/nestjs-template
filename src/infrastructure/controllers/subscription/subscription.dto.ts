import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export enum SubscriptionTierEnum {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ELITE = 'elite',
}

export enum BillingIntervalEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export class CreateCheckoutSessionDto {
  @ApiProperty({
    enum: SubscriptionTierEnum,
    description: 'Subscription tier',
    example: 'pro',
  })
  @IsEnum(SubscriptionTierEnum)
  @IsNotEmpty()
  tier: SubscriptionTierEnum;

  @ApiProperty({
    enum: BillingIntervalEnum,
    description: 'Billing interval',
    example: 'monthly',
  })
  @IsEnum(BillingIntervalEnum)
  @IsNotEmpty()
  billingInterval: BillingIntervalEnum;
}

export class UpgradeSubscriptionDto {
  @ApiProperty({
    enum: SubscriptionTierEnum,
    description: 'Target subscription tier',
    example: 'elite',
  })
  @IsEnum(SubscriptionTierEnum)
  @IsNotEmpty()
  targetTier: SubscriptionTierEnum;

  @ApiPropertyOptional({
    enum: BillingIntervalEnum,
    description: 'Billing interval (if changing)',
    example: 'yearly',
  })
  @IsEnum(BillingIntervalEnum)
  @IsOptional()
  billingInterval?: BillingIntervalEnum;
}

export class CancelSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Cancel immediately or at period end',
    example: false,
  })
  @IsOptional()
  immediately?: boolean;
}

export class SubscriptionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ enum: SubscriptionTierEnum })
  tier: string;

  @ApiProperty({ enum: BillingIntervalEnum, nullable: true })
  billingInterval: string | null;

  @ApiProperty()
  status: string;

  @ApiProperty({ nullable: true })
  currentPeriodEnd: Date | null;

  @ApiProperty({ nullable: true })
  trialEndsAt: Date | null;

  @ApiProperty()
  seatCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PricingTierResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  monthlyPrice: number;

  @ApiProperty()
  yearlyPrice: number;

  @ApiProperty({ type: [String] })
  features: string[];
}

