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
exports.UserNotificationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usernotification_entity_1 = require("../entities/usernotification.entity");
let UserNotificationRepository = class UserNotificationRepository {
    constructor(userNotificationRepository) {
        this.userNotificationRepository = userNotificationRepository;
    }
    async createUserNotification(userNotificationModel) {
        return await this.userNotificationRepository.save(userNotificationModel);
    }
    async getUserNotification(id) {
        return await this.userNotificationRepository.findOne({ where: { id } });
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
    async readAllNotifications(userId) {
        await this.userNotificationRepository.query(`update user_notifications set is_active = false
       where is_active = true AND user = ${userId} `);
        return;
    }
};
UserNotificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usernotification_entity_1.UserNotifications)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserNotificationRepository);
exports.UserNotificationRepository = UserNotificationRepository;
//# sourceMappingURL=usernotification.repository.js.map