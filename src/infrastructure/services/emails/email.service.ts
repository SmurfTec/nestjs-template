import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';

@Injectable()
export class MailService {
  configSerivce = new EnvironmentConfigService(new ConfigService());
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome  Confirm your Email',
      template: 'src/infrastructure/services/emails/templates/confirmation.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        code,
        appName: this.configSerivce.getAppName(),
      },
    });
  }

  async sendSupportReply(
    email: string,
    name: string,
    supportDescription: string,
    reply: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Reply to Your Inquiry: [Brief Description]`,
      template:
        'src/infrastructure/services/emails/templates/support-email.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name,
        appName: this.configSerivce.getAppName(),
        replyMessage: reply,
        supportMessage: supportDescription.substring(0, 100),
      },
    });
  }

  async sendPasswordSetEmail(name: string, email: string, token: string) {
    const url = this.configSerivce.getFrontEndBaseUrl() + `?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Setup your account',
      template:
        'src/infrastructure/services/emails/templates/account-password-set', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: name,
        appName: this.configSerivce.getAppName(),
        url,
      },
    });
  }

  // async sendBidExpireEmail(name: string, email: string) {
  //   await this.mailerService.sendMail({
  //     to: email,
  //     // from: '"Support Team" <support@example.com>', // override default from
  //     subject: 'Your bid is about to expire',
  //     template: './bid-expired', // `.hbs` extension is appended automatically
  //     context: {
  //       // ✏️ filling curly brackets with content
  //       name: name,
  //       appName: this.configSerivce.getAppName(),
  //     },
  //   });
  // }

  async sendEmail2FA(email: string, code: number) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '2FA Code',
        template: './2fa', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          appName: this.configSerivce.getAppName(),
          code,
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  async forgotPasswordEmail(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Password Reset Request',
        template:
          'src/infrastructure/services/emails/templates/forgot-password.hbs', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          appName: this.configSerivce.getAppName(),
          code,
        },
      });
    } catch (e) {}
  }
}
