import { Module } from '@nestjs/common';
import { mailConfigurations } from './email.config';
import { MailService } from './email.service';

@Module({
  imports: [mailConfigurations],
  providers: [MailService],
  exports: [MailService],
})
export class EmailModule {}
