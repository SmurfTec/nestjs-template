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
exports.AuthRoles = void 0;
const typeorm_1 = require("typeorm");
const auth_role_permissions_entity_1 = require("./auth-role-permissions.entity");
const auth_user_roles_entity_1 = require("./auth-user-roles.entity");
let AuthRoles = class AuthRoles {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 255, unique: true, primary: true }),
    __metadata("design:type", String)
], AuthRoles.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AuthRoles.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], AuthRoles.prototype, "parent_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int8' }),
    __metadata("design:type", Number)
], AuthRoles.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], AuthRoles.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auth_user_roles_entity_1.AuthUserRoles, (authUserRole) => authUserRole.role),
    __metadata("design:type", Array)
], AuthRoles.prototype, "auth_user_roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auth_role_permissions_entity_1.AuthRolePermissions, (authRolePermissions) => authRolePermissions.role),
    __metadata("design:type", Array)
], AuthRoles.prototype, "auth_role_permissions", void 0);
AuthRoles = __decorate([
    (0, typeorm_1.Entity)()
], AuthRoles);
exports.AuthRoles = AuthRoles;
//# sourceMappingURL=auth-roles.entity.js.map