import { UserRoleUseCases } from './user-role/user-roles.usecases';
import { RoleUseCases } from './role/roles.usecases';
import { UserUseCases } from './user/users.usecases';
import { ProfileUseCases } from './profile/profiles.usecases';
import { OnboardingProgressUsecase } from './onboarding/onboarding-progress.usecase';
import { PersonalDetailsUsecase } from './onboarding/personal-details.usecase';
import { OnboardingCompletionUsecase } from './onboarding/onboarding-completion.usecase';
import { NotificationPreferencesUseCases } from './settings/notification-preferences.usecases';
import { CredentialsUseCases } from './settings/credentials.usecases';
import { TwoFactorAuthUseCases } from './settings/two-factor-auth.usecases';
import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infrastructure/repository/repository.module';
import { JwtModule } from 'src/infrastructure/services/jwt/jwt.module';
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from 'src/infrastructure/config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/infrastructure/emails/email.module';
import { CacheMangerModule } from 'src/infrastructure/common/caching/cache-manager.module';
import { IsAuthenticatedUseCases } from './auth/isAuthenticated.usecases';
import { LoginUseCases } from './auth/login.usecases';
import { LogoutUseCases } from './auth/logout.usecases';
import { TwoFactorAuthModule } from 'src/infrastructure/services/2fa/2fa.module';
import { SubscriptionUseCase } from './subscription/subscription.usecase';
import { PaymentModule } from 'src/infrastructure/services/stripe/payment.module';
import { forwardRef } from '@nestjs/common';
import { PricingConfigService } from 'src/infrastructure/services/pricing/pricing-config.service';

@Module({
  imports: [
    RepositoryModule,
    JwtModule,
    CacheMangerModule,
    EmailModule,
    BcryptModule,
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    TwoFactorAuthModule,
    forwardRef(() => PaymentModule),
  ],
  providers: [
    ProfileUseCases,
    UserUseCases,
    IsAuthenticatedUseCases,
    LoginUseCases,
    LogoutUseCases,
    RoleUseCases,
    UserRoleUseCases,
    OnboardingProgressUsecase,
    PersonalDetailsUsecase,
    OnboardingCompletionUsecase,
    NotificationPreferencesUseCases,
    CredentialsUseCases,
    TwoFactorAuthUseCases,
    SubscriptionUseCase,
    PricingConfigService,
  ],
  exports: [
    ProfileUseCases,
    UserUseCases,
    IsAuthenticatedUseCases,
    LoginUseCases,
    LogoutUseCases,
    RoleUseCases,
    UserRoleUseCases,
    OnboardingProgressUsecase,
    PersonalDetailsUsecase,
    OnboardingCompletionUsecase,
    NotificationPreferencesUseCases,
    CredentialsUseCases,
    TwoFactorAuthUseCases,
    SubscriptionUseCase,
  ],
})
export class UsecasesModule {}
