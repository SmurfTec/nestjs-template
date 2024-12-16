import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { UseCaseModule } from 'src/usecases/usecase.module';

@Module({
  imports: [UseCaseModule],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class GatewayModule {}
