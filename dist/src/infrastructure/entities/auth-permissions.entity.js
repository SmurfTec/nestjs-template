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
exports.AuthPermissions = void 0;
const typeorm_1 = require("typeorm");
const app_module_permissions_entity_1 = require("./app_module_permissions.entity");
const auth_role_permissions_entity_1 = require("./auth-role-permissions.entity");
const auth_user_permissions_entity_1 = require("./auth-user-permissions.entity");
let AuthPermissions = class AuthPermissions {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255, unique: true, primary: true }),
    __metadata("design:type", String)
], AuthPermissions.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AuthPermissions.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auth_user_permissions_entity_1.AuthUserPermissions, (authUserPermission) => authUserPermission.permissions),
    (0, typeorm_1.JoinColumn)({ name: 'auth_user_permissions' }),
    __metadata("design:type", auth_user_permissions_entity_1.AuthUserPermissions)
], AuthPermissions.prototype, "auth_user_permissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auth_role_permissions_entity_1.AuthRolePermissions, (authRolePermissions) => authRolePermissions.permissions),
    (0, typeorm_1.OneToMany)(() => app_module_permissions_entity_1.AppModulePermissions, (appModulePermissions) => appModulePermissions.permission),
    __metadata("design:type", Array)
], AuthPermissions.prototype, "appModulePermissions", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'auth_role_permissions' }),
    __metadata("design:type", String)
], AuthPermissions.prototype, "auth_role_permissions", void 0);
AuthPermissions = __decorate([
    (0, typeorm_1.Entity)()
], AuthPermissions);
exports.AuthPermissions = AuthPermissions;
//# sourceMappingURL=auth-permissions.entity.js.map