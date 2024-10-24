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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const usernotifications_usecases_1 = require("../../../usecases/usernotification/usernotifications.usecases");
const user_notifications_dto_1 = require("./user-notifications.dto");
const user_data_1 = require("../../common/user.data");
let UserNotificationController = class UserNotificationController {
    constructor(userNotificationUseCases) {
        this.userNotificationUseCases = userNotificationUseCases;
    }
    createUserNotification(userNotification) {
        return this.userNotificationUseCases.createUserNotification(userNotification);
    }
    getUserNotification(id) {
        return this.userNotificationUseCases.getUserNotification(id);
    }
    getAUserNotifications() {
        const user = user_data_1.UserData.getUserData();
        if (!user) {
            throw new common_1.HttpException('User Not Logged In', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userNotificationUseCases.getAUsersNotifications(user.id);
    }
    getUserNotifications() {
        return this.userNotificationUseCases.getUserNotifications();
    }
    updateUserNotification(id, userNotification) {
        return this.userNotificationUseCases.updateUserNotification(id, userNotification);
    }
    deleteUserNotification(id) {
        return this.userNotificationUseCases.deleteUserNotification(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_notifications_dto_1.CreateUserNotificationDto]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "createUserNotification", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "getUserNotification", null);
__decorate([
    (0, common_1.Get)('personal/notifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "getAUserNotifications", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "getUserNotifications", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_notifications_dto_1.UpdateUserNotificationDto]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "updateUserNotification", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserNotificationController.prototype, "deleteUserNotification", null);
UserNotificationController = __decorate([
    (0, common_1.Controller)('usernotifications'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof usernotifications_usecases_1.UserNotificationsUseCases !== "undefined" && usernotifications_usecases_1.UserNotificationsUseCases) === "function" ? _a : Object])
], UserNotificationController);
exports.UserNotificationController = UserNotificationController;
//# sourceMappingURL=user-notifications.controller.js.map