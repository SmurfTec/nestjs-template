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
var MyCronJob_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyCronJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notifications_usecases_1 = require("../../../usecases/notification/notifications.usecases");
let MyCronJob = MyCronJob_1 = class MyCronJob {
    constructor(notificationsUseCases) {
        this.notificationsUseCases = notificationsUseCases;
        this.logger = new common_1.Logger(MyCronJob_1.name);
    }
    async handleCron() { }
};
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MyCronJob.prototype, "handleCron", null);
MyCronJob = MyCronJob_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_usecases_1.NotificationsUseCases])
], MyCronJob);
exports.MyCronJob = MyCronJob;
//# sourceMappingURL=cron-jobs.js.map