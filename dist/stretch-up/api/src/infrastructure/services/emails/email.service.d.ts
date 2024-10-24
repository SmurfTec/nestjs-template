import { MailerService } from '@nestjs-modules/mailer';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
export declare class MailService {
    private mailerService;
    configSerivce: EnvironmentConfigService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(email: string, code: string): Promise<void>;
    sendSupportReply(email: string, name: string, supportDescription: string, reply: string): Promise<void>;
    sendPasswordSetEmail(name: string, email: string, token: string): Promise<void>;
    sendEmail2FA(email: string, code: number): Promise<boolean>;
    forgotPasswordEmail(email: string, code: string): Promise<void>;
}
