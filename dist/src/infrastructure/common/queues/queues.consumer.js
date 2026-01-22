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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConsumer = void 0;
const bull_1 = require("bull");
const bull_2 = require("@nestjs/bull");
const email_service_1 = require("../../services/emails/email.service");
let EmailConsumer = class EmailConsumer {
    constructor(emailService) {
        this.emailService = emailService;
    }
    async handlePasswordSetEmail(job) {
        try {
            const { name, email, token } = job.data;
            await this.emailService.sendPasswordSetEmail(name, email, token);
        }
        catch (e) {
            console.log(e.message);
        }
    }
};
exports.EmailConsumer = EmailConsumer;
__decorate([
    (0, bull_2.Process)('email-password-set-job'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_1.Job !== "undefined" && bull_1.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], EmailConsumer.prototype, "handlePasswordSetEmail", null);
exports.EmailConsumer = EmailConsumer = __decorate([
    (0, bull_2.Processor)('emails'),
    __metadata("design:paramtypes", [email_service_1.MailService])
], EmailConsumer);
//# sourceMappingURL=queues.consumer.js.map