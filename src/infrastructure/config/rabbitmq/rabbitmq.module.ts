import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { rabbitMQConfigurations } from './rabbitmq.config';

const clientDynamicModule = (() => {
  return ClientsModule.register(rabbitMQConfigurations);
})();

@Module({
  imports: [clientDynamicModule, EnvironmentConfigModule],
  controllers: [],
  providers: [],
  exports: [clientDynamicModule],
})
export class RabbitMQModule {}
