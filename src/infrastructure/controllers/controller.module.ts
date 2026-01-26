import { UserRoleController } from './user-role/user-roles.controller';
import { RoleController } from './role/roles.controller';
import { UserController } from './user/users.controller';
import { ProfileController } from './profile/profiles.controller';
import { SettingsController } from './settings/settings.controller';
import { OnboardingController } from './onboarding/onboarding.controller';
import { Module } from '@nestjs/common';
import { UsecasesModule } from 'src/usecases/usecase.module';
import { AuthController } from './auth/auth.controller';
import { RepositoryModule } from '../repository/repository.module';
import { S3Module } from '../services/s3/s3.module';
import { ResponseService } from '../common/services/response.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { StripeWebhookController } from './subscription/stripe-webhook.controller';
import { PaymentModule } from '../services/stripe/payment.module';
import { StripeModule } from '../services/stripe/stripe.module';
import { NotificationController } from './notifications/notification.controller';
import { NotificationModule } from '../services/notifications/notification.module';
import { InvoiceModule } from '../services/invoice/invoice.module';

@Module({
  imports: [
    UsecasesModule,
    RepositoryModule,
    S3Module,
    PaymentModule,
    StripeModule,
    NotificationModule,
    InvoiceModule,
  ],
  controllers: [
    AuthController,
    ProfileController,
    SettingsController,
    UserController,
    RoleController,
    UserRoleController,
    OnboardingController,
    SubscriptionController,
    StripeWebhookController,
    NotificationController,
  ],
  providers: [ResponseService],
})
export class ControllerModule {}
