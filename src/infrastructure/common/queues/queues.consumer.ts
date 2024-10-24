import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { MailService } from 'src/infrastructure/services/emails/email.service';

@Processor('emails')
export class EmailConsumer {
  constructor(private emailService: MailService) {}
  @Process('email-password-set-job')
  async handlePasswordSetEmail(job: Job) {
    try {
      const { name, email, token } = job.data;
      await this.emailService.sendPasswordSetEmail(name, email, token);
    } catch (e) {
      console.log(e.message);
    }
  }
}
