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
exports.AuthUserPermissions = void 0;
const typeorm_1 = require("typeorm");
const auth_permissions_entity_1 = require("./auth-permissions.entity");
const user_entity_1 = require("./user.entity");
let AuthUserPermissions = class AuthUserPermissions {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 50 }),
    (0, typeorm_1.ManyToOne)(() => auth_permissions_entity_1.AuthPermissions, (authPermission) => authPermission.auth_user_permissions),
    (0, typeorm_1.JoinColumn)({ name: 'permissions' }),
    __metadata("design:type", String)
], AuthUserPermissions.prototype, "permissions", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int8' }),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.auth_user_permissions),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], AuthUserPermissions.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bool', default: true }),
    __metadata("design:type", Boolean)
], AuthUserPermissions.prototype, "is_allow", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AuthUserPermissions.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int8' }),
    __metadata("design:type", Number)
], AuthUserPermissions.prototype, "created_by", void 0);
AuthUserPermissions = __decorate([
    (0, typeorm_1.Entity)()
], AuthUserPermissions);
exports.AuthUserPermissions = AuthUserPermissions;
//# sourceMappingURL=auth-user-permissions.entity.js.map