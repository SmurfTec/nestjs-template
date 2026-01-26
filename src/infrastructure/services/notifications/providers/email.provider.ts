import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Notification } from '../../../entities/notification.entity';
import { Users } from '../../../entities/users.entity';
import { FetchUserModel } from 'src/domain/models/users';

@Injectable()
export class EmailProvider {
  constructor(private mailerService: MailerService) {}

  async send(notification: Notification, user: FetchUserModel): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: notification.title,
        template: './notification',
        context: {
          title: notification.title,
          body: notification.body,
          data: notification.data,
        },
      });
    } catch (error) {
      throw new Error(`Failed to send email notification: ${error.message}`);
    }
  }
}

