import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payment.service';
import { StripeModule } from './stripe.module';
import { SubscriptionRepository } from '../../repository/subscription.repository';
import { Users } from '../../entities/users.entity';
import { Subscription } from '../../entities/subscription.entity';
import { PricingModule } from '../pricing/pricing.module';
import { UsecasesModule } from 'src/usecases/usecase.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [
    StripeModule,
    TypeOrmModule.forFeature([Users, Subscription]),
    PricingModule,
    InvoiceModule,
    forwardRef(() => UsecasesModule),
  ],
  providers: [PaymentsService, SubscriptionRepository],
  exports: [PaymentsService],
})
export class PaymentModule {}

