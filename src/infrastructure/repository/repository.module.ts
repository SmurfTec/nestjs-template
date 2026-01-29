import { UserRoleRepository } from './user-roles.repository';
import { RoleRepository } from './roles.repository';
import { UserRepository } from './users.repository';
import { ProfileRepository } from './profiles.repository';
import { OnboardingRepository } from './onboarding.repository';
import { AuditRepository } from './audit.repository';
import { NotificationPreferencesRepository } from './notification-preferences.repository';
import { TwoFactorAuthRepository } from './two-factor-auth.repository';
import { Module } from '@nestjs/common';
import entities from '../entities/db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { SubscriptionRepository } from './subscription.repository';
import { NotificationRepository } from './notification.repository';
import { NotificationChannelRepository } from './notification-channel.repository';
import { UserNotificationSettingsRepository } from './user-notification-settings.repository';
import { DeviceTokenRepository } from './device-token.repository';
import { InvoiceRepository } from './invoice.repository';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    ProfileRepository,
    UserRepository,
    RoleRepository,
    UserRoleRepository,
    OnboardingRepository,
    AuditRepository,
    NotificationPreferencesRepository,
    TwoFactorAuthRepository,
    EnvironmentConfigService,
    SubscriptionRepository,
    BcryptService,
    NotificationRepository,
    NotificationChannelRepository,
    UserNotificationSettingsRepository,
    DeviceTokenRepository,
    InvoiceRepository,
  ],
  exports: [
    ProfileRepository,
    UserRepository,
    RoleRepository,
    UserRoleRepository,
    OnboardingRepository,
    AuditRepository,
    NotificationPreferencesRepository,
    TwoFactorAuthRepository,
    SubscriptionRepository,
    NotificationRepository,
    NotificationChannelRepository,
    UserNotificationSettingsRepository,
    DeviceTokenRepository,
    InvoiceRepository,
  ],
})
export class RepositoryModule {}
