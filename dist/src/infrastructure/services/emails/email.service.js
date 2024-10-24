"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
        this.configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
    }
    async sendUserConfirmation(email, code) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome To Upfront Please Confirm your Email',
            template: 'src/infrastructure/services/emails/templates/confirmation.hbs',
            context: {
                code,
                appName: this.configSerivce.getAppName(),
            },
        });
    }
    async sendSupportReply(email, name, supportDescription, reply) {
        await this.mailerService.sendMail({
            to: email,
            subject: `Reply to Your Inquiry: [Brief Description]`,
            template: 'src/infrastructure/services/emails/templates/support-email.hbs',
            context: {
                name,
                appName: this.configSerivce.getAppName(),
                replyMessage: reply,
                supportMessage: supportDescription.substring(0, 100),
            },
        });
    }
    async sendPasswordSetEmail(name, email, token) {
        const url = this.configSerivce.getFrontEndBaseUrl() + `?token=${token}`;
        await this.mailerService.sendMail({
            to: email,
            subject: 'Setup your account',
            template: 'src/infrastructure/services/emails/templates/account-password-set',
            context: {
                name: name,
                appName: this.configSerivce.getAppName(),
                url,
            },
        });
    }
    async sendEmail2FA(email, code) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: '2FA Code',
                template: './2fa',
                context: {
                    appName: this.configSerivce.getAppName(),
                    code,
                },
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async forgotPasswordEmail(email, code) {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Password Reset Request',
                template: 'src/infrastructure/services/emails/templates/forgot-password.hbs',
                context: {
                    appName: this.configSerivce.getAppName(),
                    code,
                },
            });
        }
        catch (e) { }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=email.service.js.map