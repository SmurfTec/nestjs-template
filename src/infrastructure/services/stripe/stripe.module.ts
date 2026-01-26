import { Module, Global } from '@nestjs/common';
import Stripe from 'stripe';

@Global()
@Module({
  providers: [
    {
      provide: 'STRIPE',
      useFactory: () => {
        return new Stripe(process.env.STRIPE_SECRET_KEY!, {
          apiVersion: '2025-12-15.clover',
        });
      },
    },
  ],
  exports: ['STRIPE'],
})
export class StripeModule {}