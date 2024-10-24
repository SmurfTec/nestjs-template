import { Module } from '@nestjs/common';
import { NotifcationGateway } from './notification.gateway';

@Module({ providers: [NotifcationGateway], exports: [NotifcationGateway] })
export class NotificationModule {}
