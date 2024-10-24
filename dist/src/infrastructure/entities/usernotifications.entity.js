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
exports.UserNotifications = void 0;
const typeorm_1 = require("typeorm");
const notification_entity_1 = require("./notification.entity");
const user_entity_1 = require("./user.entity");
let UserNotifications = class UserNotifications {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], UserNotifications.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: false }),
    __metadata("design:type", Boolean)
], UserNotifications.prototype, "seen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], UserNotifications.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.Notifications, (notifications) => notifications),
    (0, typeorm_1.JoinColumn)({ name: 'notification' }),
    __metadata("design:type", Number)
], UserNotifications.prototype, "notification", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (users) => users),
    (0, typeorm_1.JoinColumn)({ name: 'user' }),
    __metadata("design:type", Number)
], UserNotifications.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserNotifications.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserNotifications.prototype, "updated_on", void 0);
UserNotifications = __decorate([
    (0, typeorm_1.Entity)()
], UserNotifications);
exports.UserNotifications = UserNotifications;
//# sourceMappingURL=usernotifications.entity.js.map