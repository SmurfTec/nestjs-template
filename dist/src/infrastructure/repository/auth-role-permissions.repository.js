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
exports.AuthRolePermissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_role_permissions_entity_1 = require("../entities/auth-role-permissions.entity");
const typeorm_2 = require("typeorm");
let AuthRolePermissionsRepository = class AuthRolePermissionsRepository {
    constructor(authRolePermissionsRepository) {
        this.authRolePermissionsRepository = authRolePermissionsRepository;
    }
    async createRolePermissions(authRolePermissionsModel, manager) {
        return await manager
            .getRepository(auth_role_permissions_entity_1.AuthRolePermissions)
            .save(authRolePermissionsModel);
    }
    async getRolePermissions(role) {
        return await this.authRolePermissionsRepository.find({
            where: { role },
            relations: ['permissions'],
        });
    }
    async getRolePermissionsNew(role) {
        return await this.authRolePermissionsRepository.find({
            where: { role },
        });
    }
    async createRolePermissionsBulk(authRolePermissionsModel, manager) {
        return await manager
            .getRepository(auth_role_permissions_entity_1.AuthRolePermissions)
            .save(authRolePermissionsModel);
    }
    async deleteRolePermissions(role, permissionsToRemove, manager) {
        for (let i = 0; i < permissionsToRemove.length; i++) {
            const rolePermission = await manager
                .getRepository(auth_role_permissions_entity_1.AuthRolePermissions)
                .findOne({
                where: { role, permissions: permissionsToRemove[i] },
            });
            await manager.getRepository(auth_role_permissions_entity_1.AuthRolePermissions).remove(rolePermission);
        }
        return 'deleted';
    }
};
AuthRolePermissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_role_permissions_entity_1.AuthRolePermissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthRolePermissionsRepository);
exports.AuthRolePermissionsRepository = AuthRolePermissionsRepository;
//# sourceMappingURL=auth-role-permissions.repository.js.map