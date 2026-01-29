import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from '../../services/stripe/payment.service';
import Stripe from 'stripe';

@Controller('/webhooks/stripe')
@ApiTags('Webhooks')
// Note: This endpoint should NOT use JwtAuthGuard as Stripe calls it directly
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  constructor(
    private readonly paymentsService: PaymentsService,
    @Inject('STRIPE') private readonly stripe: Stripe,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle Stripe webhook events' })
  async handleWebhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      this.logger.error('STRIPE_WEBHOOK_SECRET is not set');
      throw new Error('Webhook secret not configured');
    }

    let event: Stripe.Event;

    try {
      // Use rawBody if available (from bodyParser.raw middleware)
      const body = req.rawBody || req.body;
      event = this.stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    this.logger.log(`Received webhook event: ${event.type}`);

    try {
      await this.paymentsService.handle(event);
      return { received: true };
    } catch (error) {
      this.logger.error(`Error handling webhook: ${error.message}`, error.stack);
      throw error;
    }
  }
}

