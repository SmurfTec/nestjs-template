import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../entities/notification.entity';
import { NotificationChannel } from '../../entities/notification-channel.entity';
import { UserNotificationSettings } from '../../entities/user-notification-settings.entity';
import { DeviceToken } from '../../entities/device-token.entity';
import { NotificationRepository } from '../../repository/notification.repository';
import { NotificationChannelRepository } from '../../repository/notification-channel.repository';
import { UserNotificationSettingsRepository } from '../../repository/user-notification-settings.repository';
import { DeviceTokenRepository } from '../../repository/device-token.repository';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from '../../controllers/notifications/notification.controller';
import { EmailProvider } from './providers/email.provider';
import { PushProvider } from './providers/push.provider';
import { SmsProvider } from './providers/sms.provider';
import { InAppProcessor } from './processors/inapp.processor';
import { EmailProcessor } from './processors/email.processor';
import { PushProcessor } from './processors/push.processor';
import { SmsProcessor } from './processors/sms.processor';
import { CacheMangerModule } from '../../common/caching/cache-manager.module';
import { JwtModule } from '../../services/jwt/jwt.module';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import { mailConfigurations } from '../../emails/email.config';
import { RepositoryModule } from '../../repository/repository.module';

const configService = new EnvironmentConfigService(new ConfigService());
const redisHost = configService.getCacheManagerHost() || 'localhost';
const redisPort = configService.getCacheManagerPort() || '6379';
const redisPassword = configService.getCacheManagerPassword();

const redisConnection = {
  host: redisHost,
  port: typeof redisPort === 'string' ? parseInt(redisPort, 10) : redisPort,
  ...(redisPassword && { password: redisPassword }),
};

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Notification,
      NotificationChannel,
      UserNotificationSettings,
      DeviceToken,
    ]),
    RepositoryModule,
    BullModule.forRoot({
      connection: redisConnection,
    }),
    BullModule.registerQueue(
        { name: 'notifications-inapp' },
        { name: 'notifications-email' },
        { name: 'notifications-push' },
        { name: 'notifications-sms' },
    ),
    mailConfigurations,
    CacheMangerModule,
    JwtModule,
  ],
  providers: [
    NotificationRepository,
    NotificationChannelRepository,
    UserNotificationSettingsRepository,
    DeviceTokenRepository,
    NotificationService,
    NotificationGateway,
    EmailProvider,
    PushProvider,
    SmsProvider,
    InAppProcessor,
    EmailProcessor,
    PushProcessor,
    SmsProcessor,
  ],
  exports: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
})
export class NotificationModule {}

