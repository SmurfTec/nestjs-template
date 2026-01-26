import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MailService {
  configSerivce = new EnvironmentConfigService(new ConfigService());
  private support_email;
  private support_name;
  constructor(
    private mailerService: MailerService, // @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
  ) {
    this.support_email = this.configSerivce.getSupportEmail();
    this.support_name = this.configSerivce.getSupportName();
  }

  async sendSetupConfirmationEmail(email: string, code: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: `"${this.support_name}" <${this.support_email}>`, // override default fromS
        subject: 'Setup your account',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          baseUrl: this.configSerivce.getFrontEndBaseUrl(),
          code,
        },
      });
    } catch (error) {
      console.error(error.message, error, 'UserNotificationSubscriber');
    }
  }

  async sendConfirmationEmail(email: string, token: string) {
    const url =
      this.configSerivce.getFrontEndBaseUrl() +
      `/#/confirm-user?token=${token}`;
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: `"${this.support_name}" <${this.support_email}>`, // override default from
        subject: 'Setup your account',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          url,
        },
      });
    } catch (error) {
      console.error(error.message, error, 'UserNotificationSubscriber');
    }
  }

  async sendPasswordSetEmail(name: string, email: string, token: string) {
    const url =
      this.configSerivce.getFrontEndBaseUrl() +
      `/#/update-password?token=${token}`;
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: `"${this.support_name}" <${this.support_email}>`, // override default from
        subject: 'Setup your account',
        template: './account-password-set', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          name: name,
          url,
        },
      });
    } catch (error) {
      console.error(error.message, error, 'UserNotificationSubscriber');
    }
  }

  async sendNotifyEmail(
    emails: string[],
    ticket_id: number,
    percent: string,
    escalationLevel: string,
  ) {
    return await this.mailerService.sendMail({
      to: emails,
      from: `"${this.support_name}" <${this.support_email}>`, // override default from
      subject: `Ticket #${ticket_id} reminder ${escalationLevel}`,
      template: './ticket-escalation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        ticket_id,
        percent,
      },
    });
  }

  async forgotPasswordEmail(name: string, email: string, token: string) {
    const url =
      this.configSerivce.getFrontEndBaseUrl() +
      `/#/update-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: `"${this.support_name}" <${this.support_email}>`,
      subject: 'Password Reset Request',
      template: './forgot-password',
      context: {
        name,
        url,
      },
    });
  }

  async sendEmailUpdateVerificationEmail(email: string, code: string) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        from: `"${this.support_name}" <${this.support_email}>`,
        subject: 'Email Update Verification',
        template: './confirmation', // Using the existing confirmation template
        context: {
          code,
        },
      });
    } catch (error) {
      console.error(error.message, error, 'EmailUpdateVerification');
    }
  }
}
