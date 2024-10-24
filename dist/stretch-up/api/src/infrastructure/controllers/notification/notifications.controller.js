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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const usernotifications_usecases_1 = require("./../../../usecases/usernotification/usernotifications.usecases");
const user_data_1 = require("../../common/user.data");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const notifications_usecases_1 = require("../../../usecases/notification/notifications.usecases");
const notifications_dto_1 = require("./notifications.dto");
const catch_async_1 = require("../../../utils/catch-async");
let NotificationController = class NotificationController {
    constructor(notificationUseCases, userNotificationsUseCases) {
        this.notificationUseCases = notificationUseCases;
        this.userNotificationsUseCases = userNotificationsUseCases;
    }
    createNotification(notification) {
        return this.notificationUseCases.createNotification(notification);
    }
    readAllNotification() {
        return this.userNotificationsUseCases.readAllNotifications(user_data_1.UserData.getUserData().id);
    }
    getNotification(id) {
        return this.notificationUseCases.getNotification(id);
    }
    async getOwnNotification(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const noti = await this.notificationUseCases.getOwnNotifications();
            res.status(200).json(noti);
        })(req, res, next);
    }
    getNotifications() {
        return this.notificationUseCases.getNotifications();
    }
    updateNotification(id, notification) {
        return this.notificationUseCases.updateNotification(id, notification);
    }
    deleteNotification(id) {
        return this.notificationUseCases.deleteNotification(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notifications_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, common_1.Patch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "readAllNotification", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "getNotification", null);
__decorate([
    (0, common_1.Get)('own/all'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getOwnNotification", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, notifications_dto_1.UpdateNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "updateNotification", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "deleteNotification", null);
NotificationController = __decorate([
    (0, common_1.Controller)('notifications'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof notifications_usecases_1.NotificationsUseCases !== "undefined" && notifications_usecases_1.NotificationsUseCases) === "function" ? _a : Object, typeof (_b = typeof usernotifications_usecases_1.UserNotificationsUseCases !== "undefined" && usernotifications_usecases_1.UserNotificationsUseCases) === "function" ? _b : Object])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notifications.controller.js.map