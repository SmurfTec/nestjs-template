import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { EmailModule } from 'src/infrastructure/services/emails/email.module';
import { EmailConsumer } from './queues.consumer';
import { QueueService } from './queues.service';
const configService = new EnvironmentConfigService(new ConfigService());

@Module({
  imports: [
    EmailModule,
    BullModule.forRoot({
      redis: {
        host: configService.getRedisHost(),
        port: +configService.getRedisPort(),
        password: configService.getRedisPassword(),
      },
    }),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
  providers: [QueueService, EmailConsumer],
})
export class QueueModule {}
