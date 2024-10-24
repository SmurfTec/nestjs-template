import { Module } from '@nestjs/common';
import { RabbitMQModule } from 'src/infrastructure/config/rabbitmq/rabbitmq.module';
import { CacheMangerModule } from '../caching/cache-manager.module';
import { RabbitMQService } from '../../services/rabbitmq.service';
import { AuthRolePermissionsSubscriber } from './auth-role-permissions.subscriber';
import { AuthUserRolesSubscriber } from './auth-user-roles.subscriber';
import { EntitySubscriber } from './entity.subscriber';
import { ValidationSubscriber } from './validation-subscriber';

@Module({
  imports: [CacheMangerModule, RabbitMQModule],
  providers: [
    EntitySubscriber,
    AuthRolePermissionsSubscriber,
    AuthUserRolesSubscriber,
    RabbitMQService,
    ValidationSubscriber,
  ],
  exports: [
    ValidationSubscriber,
    EntitySubscriber,
    AuthRolePermissionsSubscriber,
    AuthUserRolesSubscriber,
  ],
})
export class SubcriberModule {}
