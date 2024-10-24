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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usernotifications_entity_1 = require("../entities/usernotifications.entity");
let UserNotificationsRepository = class UserNotificationsRepository {
    constructor(userNotificationRepository) {
        this.userNotificationRepository = userNotificationRepository;
    }
    async createUserNotification(userNotificationModel) {
        return await this.userNotificationRepository.save(userNotificationModel);
    }
    async upsertUserNotification(userNotificationModel) {
        return await this.userNotificationRepository.upsert(userNotificationModel, [
            'user',
            'notification',
        ]);
    }
    async createUserNotifications(userNotificationsModel) {
        return await this.userNotificationRepository.save(userNotificationsModel);
    }
    async getUserNotification(id) {
        return await this.userNotificationRepository.findOne({ where: { id } });
    }
    async getNotificationUsers(id) {
        return await this.userNotificationRepository.query(`select * from user_notifications un where notification = ${id}`);
    }
    async getAUsersNotifications(id) {
        return await this.userNotificationRepository.query(`select un.user as user, n.id as notificationId,
      n.resource_id as resourceId, n.resource_name as resource_name,
      message, n.created_on as create_on , n.updated_on as updated_on , type, n.is_active as is_active  ,
           a.filename as image

      from user_notifications un 
      right join notifications n on n.id = un.notification
      LEFT JOIN attachments a on a.table = 'notifications' and a.type_of = n.resource_name
       where un."user" = ${id};`);
    }
    async checkUserNotification(userId, notificationId) {
        const notification = await this.userNotificationRepository.query(`select * from user_notifications un where un."user" = ${userId} and un.notification = ${notificationId} limit 1`);
        if (notification.length > 0)
            return true;
        return false;
    }
    async getAUsersSeenNotifications(id) {
        return await this.userNotificationRepository.query(`select * from user_notifications un where un."user" = ${id} and seen = true`);
    }
    async getAUsersUnSeenNotifications(id) {
        return await this.userNotificationRepository.query(`select * from user_notifications un where un."user" = ${id} and seen = false`);
    }
    async setSeenForAUserNotification(userId, notificationId) {
        const notification = await this.userNotificationRepository.query(`select * from user_notifications un where un."user" = ${userId} and un.notification = ${notificationId} limit 1`);
        if (notification.length > 0) {
            throw new common_1.NotFoundException('notification not found');
        }
        await this.userNotificationRepository.update(notification[0].id, {
            seen: true,
        });
        return Object.assign(Object.assign({}, notification), { seen: true });
    }
    async setSeenForAllUserNotification(userId) {
        await this.userNotificationRepository.query(`update user_notifications set seen = true where "user" = ${userId}`);
        return await this.userNotificationRepository.query(`select * from user_notifications un where un."user"  = ${userId}`);
    }
    async getUserNotifications() {
        return await this.userNotificationRepository.find();
    }
    async updateUserNotification(id, updateUserNotificationModel) {
        const userNotification = await this.userNotificationRepository.findOne({
            where: { id },
        });
        if (userNotification) {
            const updatedUserNotification = Object.assign(Object.assign({}, userNotification), updateUserNotificationModel);
            return this.userNotificationRepository.save(updatedUserNotification);
        }
        return;
    }
    async deleteUserNotification(id) {
        await this.userNotificationRepository.delete(id);
        return;
    }
};
UserNotificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotifications)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserNotificationsRepository);
exports.UserNotificationsRepository = UserNotificationsRepository;
//# sourceMappingURL=usernotifications.repository.js.map