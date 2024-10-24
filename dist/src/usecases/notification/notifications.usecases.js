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
exports.NotificationsUseCases = void 0;
const common_1 = require("@nestjs/common");
const notifications_repository_1 = require("../../infrastructure/repository/notifications.repository");
const usernotifications_usecases_1 = require("../usernotification/usernotifications.usecases");
const notifications_enums_1 = require("../../infrastructure/common/enums/notifications.enums");
const notification_events_1 = require("../../infrastructure/common/events/notification-events");
let NotificationsUseCases = class NotificationsUseCases {
    constructor(notificationRepository, userNotificationsUseCases) {
        this.notificationRepository = notificationRepository;
        this.userNotificationsUseCases = userNotificationsUseCases;
    }
    async createNotification(notificationModel) {
        return await this.createNotificationForCertainOrAllUsers(notificationModel);
    }
    async createNotificationForCertainOrAllUsers(notificationModel) {
        let users = [];
        if (notificationModel.users && notificationModel.users.length > 0) {
            users = notificationModel.users;
            notificationModel = Object.assign(Object.assign({}, notificationModel), { type: notifications_enums_1.notificationEnums.SELECTIVE });
        }
        const createdNotification = await this.notificationRepository.createNotification(notificationModel);
        if (users.length > 0) {
            const userNotifications = [];
            for (let i = 0; i < users.length; i++) {
                userNotifications.push({
                    notification: createdNotification.id,
                    user: users[i],
                });
            }
            await this.userNotificationsUseCases.createUserNotifications(userNotifications);
        }
        notification_events_1.NotificationEvents.createNotificationEmitter({
            notificationID: createdNotification.id,
        });
        return createdNotification;
    }
    async getNotification(id) {
        const data = await this.notificationRepository.getNotification(id);
        if (data.length === 0) {
            throw new common_1.HttpException('Notification Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data: data[0] };
    }
    async getOwnNotifications() {
        return await this.userNotificationsUseCases.getOwnNotification();
    }
    async getNotifications() {
        return await this.notificationRepository.getNotifications();
    }
    async getTypeAllNotifications() {
        return await this.notificationRepository.getTypeAllNotifications();
    }
    async getNotificationUsers(id) {
        return await this.userNotificationsUseCases.getUserNotification(id);
    }
    async updateNotification(id, notificationUpdateModel) {
        return await this.notificationRepository.updateNotification(id, notificationUpdateModel);
    }
    async deleteNotification(id) {
        return await this.notificationRepository.deleteNotification(id);
    }
};
NotificationsUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notifications_repository_1.NotificationsRepository,
        usernotifications_usecases_1.UserNotificationsUseCases])
], NotificationsUseCases);
exports.NotificationsUseCases = NotificationsUseCases;
//# sourceMappingURL=notifications.usecases.js.map