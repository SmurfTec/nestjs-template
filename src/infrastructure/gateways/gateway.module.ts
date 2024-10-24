import { Module } from '@nestjs/common';
import { MenuGateway } from './menus.gateway';
import { NotificationGateway } from './notification.gateway';
import { UseCaseModule } from 'src/usecases/usecase.module';

@Module({
  imports: [UseCaseModule],
  providers: [MenuGateway, NotificationGateway],
  exports: [MenuGateway, NotificationGateway],
})
export class GatewayModule {}
