import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
const configSerivce = new EnvironmentConfigService(new ConfigService());

export const mailConfigurations = MailerModule.forRoot({
  // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
  // or

  transport: {
    host: configSerivce.getEmailHost(),
    port: +configSerivce.getEmailPort(),
    auth: {
      user: configSerivce.getEmailUser(),
      pass: configSerivce.getEmailPass(),
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    options: {
      strict: true,
    },
  },
});
