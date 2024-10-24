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
exports.AuthUserPermissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_user_permissions_entity_1 = require("../entities/auth-user-permissions.entity");
const typeorm_2 = require("typeorm");
let AuthUserPermissionsRepository = class AuthUserPermissionsRepository {
    constructor(authUserPermissionRepository) {
        this.authUserPermissionRepository = authUserPermissionRepository;
    }
    async createAuthUserPermissions(authUserPermissionsModel, manager) {
        return await manager
            .getRepository(auth_user_permissions_entity_1.AuthUserPermissions)
            .save(authUserPermissionsModel);
    }
    async getAuthUserPermissions(userId) {
        return await this.authUserPermissionRepository.find({
            where: { user_id: userId },
        });
    }
    async deleteAuthUserPermissionsByUserId(id, manager) {
        const permissions = await manager.getRepository(auth_user_permissions_entity_1.AuthUserPermissions).find({
            where: { user_id: id },
        });
        await this.authUserPermissionRepository.remove(permissions);
        return 'deleted';
    }
    async deleteAuthUserPermissions(id, permissions, manager) {
        for (let i = 0; i < permissions.length; i++) {
            const permission = await manager
                .getRepository(auth_user_permissions_entity_1.AuthUserPermissions)
                .findOne({
                where: { user_id: id, permissions: permissions[i] },
            });
            await this.authUserPermissionRepository.remove(permission);
        }
        return 'deleted';
    }
};
AuthUserPermissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_user_permissions_entity_1.AuthUserPermissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthUserPermissionsRepository);
exports.AuthUserPermissionsRepository = AuthUserPermissionsRepository;
//# sourceMappingURL=auth-user-permissions.repository.js.map