import { Job } from 'bull';
import { MailService } from 'src/infrastructure/services/emails/email.service';
export declare class EmailConsumer {
    private emailService;
    constructor(emailService: MailService);
    handlePasswordSetEmail(job: Job): Promise<void>;
}
