import { Controller, Injectable } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { RabbitMQPattersEnums } from '../common/enums/rabbitmq.enums';

@Controller()
export class CrudLogsSubscriber {
  @EventPattern(RabbitMQPattersEnums.CRUD_LOGS)
  async handleBookCreatedEvent(createUserBackupDto: any) {
  }
}
