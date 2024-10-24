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
exports.NotificationPreferenceUseCases = void 0;
const common_1 = require("@nestjs/common");
const notificationpreference_repository_1 = require("../../infrastructure/repository/notificationpreference.repository");
let NotificationPreferenceUseCases = class NotificationPreferenceUseCases {
    constructor(notificationPreferenceRepository) {
        this.notificationPreferenceRepository = notificationPreferenceRepository;
    }
    async createNotificationPreference(notificationPreferenceModel) {
        return await this.notificationPreferenceRepository.createNotificationPreference(notificationPreferenceModel);
    }
    async getNotificationPreference(id) {
        const data = await this.notificationPreferenceRepository.getNotificationPreference(id);
        if (!data) {
            throw new common_1.HttpException('NotificationPreference Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getNotificationPreferences() {
        return await this.notificationPreferenceRepository.getNotificationPreferences();
    }
    async updateNotificationPreference(id, notificationPreferenceUpdateModel) {
        return await this.notificationPreferenceRepository.updateNotificationPreference(id, notificationPreferenceUpdateModel);
    }
    async deleteNotificationPreference(id) {
        return await this.notificationPreferenceRepository.deleteNotificationPreference(id);
    }
};
NotificationPreferenceUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notificationpreference_repository_1.NotificationPreferenceRepository])
], NotificationPreferenceUseCases);
exports.NotificationPreferenceUseCases = NotificationPreferenceUseCases;
//# sourceMappingURL=notificationpreference.usecases.js.map