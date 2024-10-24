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
exports.NotificationPreferenceController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../../infrastructure/common/guards/jwtAuth.guard");
const notificationpreference_usecases_1 = require("../../../usecases/notificationpreference/notificationpreference.usecases");
const notificationpreference_dto_1 = require("./notificationpreference.dto");
let NotificationPreferenceController = class NotificationPreferenceController {
    constructor(notificationPreferenceUseCases) {
        this.notificationPreferenceUseCases = notificationPreferenceUseCases;
    }
    createNotificationPreference(notificationPreference) {
        return this.notificationPreferenceUseCases.createNotificationPreference(notificationPreference);
    }
    getNotificationPreference(id) {
        return this.notificationPreferenceUseCases.getNotificationPreference(id);
    }
    getNotificationPreferences() {
        return this.notificationPreferenceUseCases.getNotificationPreferences();
    }
    updateNotificationPreference(id, notificationPreference) {
        return this.notificationPreferenceUseCases.updateNotificationPreference(id, notificationPreference);
    }
    deleteNotificationPreference(id) {
        return this.notificationPreferenceUseCases.deleteNotificationPreference(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notificationpreference_dto_1.CreateNotificationPreferenceDto]),
    __metadata("design:returntype", void 0)
], NotificationPreferenceController.prototype, "createNotificationPreference", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationPreferenceController.prototype, "getNotificationPreference", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationPreferenceController.prototype, "getNotificationPreferences", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, notificationpreference_dto_1.UpdateNotificationPreferenceDto]),
    __metadata("design:returntype", void 0)
], NotificationPreferenceController.prototype, "updateNotificationPreference", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationPreferenceController.prototype, "deleteNotificationPreference", null);
NotificationPreferenceController = __decorate([
    (0, common_1.Controller)('notificationpreferences'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof notificationpreference_usecases_1.NotificationPreferenceUseCases !== "undefined" && notificationpreference_usecases_1.NotificationPreferenceUseCases) === "function" ? _a : Object])
], NotificationPreferenceController);
exports.NotificationPreferenceController = NotificationPreferenceController;
//# sourceMappingURL=notificationpreference.controller.js.map