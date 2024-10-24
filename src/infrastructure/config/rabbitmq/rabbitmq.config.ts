import { ConfigService } from '@nestjs/config';
import { ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
const configSerivce = new EnvironmentConfigService(new ConfigService());

export const rabbitMQConfigurations: ClientsModuleOptions = [
  {
    name: 'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    // options: {
    //   urls: [configSerivce.getRabbitMQUrl()],
    //   queue: 'orion',
    //   maxConnectionAttempts: -1,
    //   noAck: true,
    //   queueOptions: {
    //     durable: true,
    //   },
    // },
  },
];
