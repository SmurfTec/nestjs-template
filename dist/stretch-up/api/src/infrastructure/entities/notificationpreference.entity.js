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
exports.NotificationPreferences = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let NotificationPreferences = class NotificationPreferences {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int4' }),
    __metadata("design:type", Number)
], NotificationPreferences.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, }),
    __metadata("design:type", String)
], NotificationPreferences.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, }),
    __metadata("design:type", Boolean)
], NotificationPreferences.prototype, "allow_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, }),
    __metadata("design:type", Boolean)
], NotificationPreferences.prototype, "allow_push", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (users) => users),
    (0, typeorm_1.JoinColumn)({ name: 'user' }),
    __metadata("design:type", Number)
], NotificationPreferences.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], NotificationPreferences.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], NotificationPreferences.prototype, "updated_on", void 0);
NotificationPreferences = __decorate([
    (0, typeorm_1.Entity)()
], NotificationPreferences);
exports.NotificationPreferences = NotificationPreferences;
//# sourceMappingURL=notificationpreference.entity.js.map