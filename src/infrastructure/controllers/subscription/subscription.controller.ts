import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { SubscriptionUseCase } from 'src/usecases/subscription/subscription.usecase';
import {
  CreateCheckoutSessionDto,
  UpgradeSubscriptionDto,
  SubscriptionResponseDto,
} from './subscription.dto';
import { ResponseService } from '../../common/services/response.service';

@Controller('/subscriptions')
@ApiTags('Subscriptions')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
export class SubscriptionController {
  constructor(
    private readonly subscriptionUseCase: SubscriptionUseCase,
    private readonly responseService: ResponseService,
  ) {}

  @Get('/pricing')
  @ApiOperation({ summary: 'Get all pricing tiers' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Pricing tiers retrieved successfully',
  })
  async getPricingTiers() {
    const tiers = await this.subscriptionUseCase.getPricingTiers();
    return this.responseService.success(tiers, 'Pricing tiers retrieved successfully');
  }

  @Get('/current')
  @ApiOperation({ summary: 'Get current user subscription' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Subscription retrieved successfully',
    type: SubscriptionResponseDto,
  })
  async getCurrentSubscription(@Req() req: any) {
    const userId = req.user.id;
    const subscription = await this.subscriptionUseCase.getSubscription(userId);
    return this.responseService.success(subscription, 'Subscription retrieved successfully');
  }

  @Post('/checkout')
  @ApiOperation({ summary: 'Create checkout session for individual subscription' })
  @SwaggerApiResponse({
    status: 201,
    description: 'Checkout session created successfully',
  })
  async createCheckoutSession(
    @Req() req: any,
    @Body() dto: CreateCheckoutSessionDto,
  ) {
    const userId = req.user.id;
    const session = await this.subscriptionUseCase.createCheckoutSession(
      userId,
      dto,
    );
    return this.responseService.success(session, 'Checkout session created successfully');
  }

  @Post('/upgrade')
  @ApiOperation({ summary: 'Upgrade subscription' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Subscription upgrade initiated',
  })
  async upgradeSubscription(
    @Req() req: any,
    @Body() dto: UpgradeSubscriptionDto,
  ) {
    const userId = req.user.id;

    const result = await this.subscriptionUseCase.upgradeSubscription(
      userId,
      dto
    );
    return this.responseService.success(result, 'Subscription upgrade initiated');
  }

  @Post('/trial')
  @ApiOperation({ summary: 'Start 7-day Pro trial' })
  @SwaggerApiResponse({
    status: 201,
    description: 'Trial started successfully',
  })
  async startTrial(
    @Req() req: any,
    @Body('tier') tier: 'pro',
  ) {
    const userId = req.user.id;
    const result = await this.subscriptionUseCase.startTrial(userId, tier);
    return this.responseService.success(result, 'Trial started successfully');
  }

  @Delete('/cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Subscription cancelled successfully',
  })
  async cancelSubscription(
    @Req() req: any,
    @Query('immediately', new ParseBoolPipe({ optional: true })) immediately?: boolean,
  ) {
    const userId = req.user.id;

    const result = await this.subscriptionUseCase.cancelSubscription(
      userId,
      immediately || false,
    );
    return this.responseService.success(result, 'Subscription cancelled successfully');
  }
}

