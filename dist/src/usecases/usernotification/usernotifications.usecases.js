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
exports.UserNotificationsUseCases = void 0;
const common_1 = require("@nestjs/common");
const usernotifications_repository_1 = require("../../infrastructure/repository/usernotifications.repository");
const user_data_1 = require("../../infrastructure/common/user.data");
let UserNotificationsUseCases = class UserNotificationsUseCases {
    constructor(userNotificationRepository) {
        this.userNotificationRepository = userNotificationRepository;
    }
    async createUserNotification(userNotificationModel) {
        return await this.userNotificationRepository.createUserNotification(userNotificationModel);
    }
    async readAllNotifications(userId) {
        return await this.userNotificationRepository.setSeenForAllUserNotification(userId);
    }
    async upsertUserNotification(userNotificationModel) {
        return await this.userNotificationRepository.upsertUserNotification(userNotificationModel);
    }
    async createUserNotifications(userNotificationsModel) {
        return await this.userNotificationRepository.createUserNotifications(userNotificationsModel);
    }
    async getAUsersNotifications(id) {
        return await this.userNotificationRepository.getAUsersNotifications(id);
    }
    async checkUserNotifications(userId, notificationId) {
        return await this.userNotificationRepository.checkUserNotification(userId, notificationId);
    }
    async getOwnNotification() {
        return await this.userNotificationRepository.getAUsersNotifications(user_data_1.UserData.getUserData().id);
    }
    async getNotificationUsers(id) {
        return await this.userNotificationRepository.getNotificationUsers(id);
    }
    async getUserNotification(id) {
        const data = await this.userNotificationRepository.getUserNotification(id);
        if (!data) {
            throw new common_1.HttpException('UserNotification Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getUserNotifications() {
        return await this.userNotificationRepository.getUserNotifications();
    }
    async updateUserNotification(id, userNotificationUpdateModel) {
        return await this.userNotificationRepository.updateUserNotification(id, userNotificationUpdateModel);
    }
    async deleteUserNotification(id) {
        return await this.userNotificationRepository.deleteUserNotification(id);
    }
};
UserNotificationsUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usernotifications_repository_1.UserNotificationsRepository])
], UserNotificationsUseCases);
exports.UserNotificationsUseCases = UserNotificationsUseCases;
//# sourceMappingURL=usernotifications.usecases.js.map