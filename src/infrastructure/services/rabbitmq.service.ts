import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private rabbitMQClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.rabbitMQClient.connect();
    } catch (error) {}
  }

  send(pattern: any, data: any) {
    return this.rabbitMQClient.send(pattern, data);
  }

  emit(pattern: any, data: any) {
    return this.rabbitMQClient.emit(pattern, data);
  }
}
