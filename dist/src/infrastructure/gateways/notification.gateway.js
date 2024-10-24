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
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const user_usecases_1 = require("../../usecases/user/user.usecases");
const notification_events_1 = require("../common/events/notification-events");
const notifications_usecases_1 = require("../../usecases/notification/notifications.usecases");
const usernotifications_usecases_1 = require("../../usecases/usernotification/usernotifications.usecases");
const notifications_enums_1 = require("../common/enums/notifications.enums");
let NotificationGateway = class NotificationGateway {
    constructor(userUseCases, notificationsUseCases, userNotificationsUseCases) {
        this.userUseCases = userUseCases;
        this.notificationsUseCases = notificationsUseCases;
        this.userNotificationsUseCases = userNotificationsUseCases;
    }
    async onPermissionChange(data, client) {
        try {
            const user = await this.userUseCases.getUser(data['userId']);
            const notfications = await this.notificationsUseCases.getTypeAllNotifications();
            const updateUserNotifications = [];
            for (let i = 0; i < notfications.length; i++) {
                updateUserNotifications.push({
                    user: user.id,
                    notification: notfications[i].id,
                });
            }
            await this.userNotificationsUseCases.upsertUserNotification(updateUserNotifications);
            notification_events_1.NotificationEvents.onCreateNotificationHandler(async (emittedData) => {
                if (emittedData.notificationID) {
                    const notification = await this.notificationsUseCases.getNotification(emittedData.notificationID);
                    if (notification.data.type === notifications_enums_1.notificationEnums.ALL) {
                        client.emit('notifications', notification);
                        await this.userNotificationsUseCases.createUserNotification({
                            notification: notification.data.id,
                            user: user.id,
                        });
                    }
                    else {
                        if (await this.userNotificationsUseCases.checkUserNotifications(user.id, notification.data.id)) {
                            client.emit('notifications', notification);
                        }
                    }
                }
            });
        }
        catch (e) {
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('notifications'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "onPermissionChange", null);
NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [user_usecases_1.UserUseCases,
        notifications_usecases_1.NotificationsUseCases,
        usernotifications_usecases_1.UserNotificationsUseCases])
], NotificationGateway);
exports.NotificationGateway = NotificationGateway;
//# sourceMappingURL=notification.gateway.js.map