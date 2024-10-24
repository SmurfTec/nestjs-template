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
exports.PermissionsUseCases = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../infrastructure/services/cache.service");
const auth_user_permissions_repository_1 = require("../../infrastructure/repository/auth-user-permissions.repository");
const auth_user_roles_repository_1 = require("../../infrastructure/repository/auth-user-roles.repository");
let PermissionsUseCases = class PermissionsUseCases {
    constructor(authUserRolesRepository, authUserPermissionsRepository, cacheSerivce) {
        this.authUserRolesRepository = authUserRolesRepository;
        this.authUserPermissionsRepository = authUserPermissionsRepository;
        this.cacheSerivce = cacheSerivce;
    }
    async getUserPermissionsByRole(userId) {
        return await this.authUserRolesRepository.getUserRolePermissions(userId);
    }
    async getUserPermissionsByUserId(userId) {
        return await this.authUserPermissionsRepository.getAuthUserPermissions(userId);
    }
    async getUserPermissionsAndRoles(userId) {
        const set = new Set();
        const roleSet = new Set();
        (await this.getUserPermissionsByRole(userId)).forEach((permission) => {
            set.add(permission.permissions);
            roleSet.add(permission.roles);
        });
        (await this.getUserPermissionsByUserId(userId)).forEach((permission) => {
            if (!set.has(permission.permissions) && permission.is_allow) {
                set.add(permission.permissions);
            }
            else if (set.has(permission.permissions) && !permission.is_allow) {
                set.delete(permission.permissions);
            }
        });
        return { permissions: Array.from(set), roles: Array.from(roleSet) };
    }
    async getOrSetUserPermissionsFromCache(userId) {
        const key = userId + '.permissions';
        if (await this.cacheSerivce.has(key)) {
            await this.cacheSerivce.getKeysByPattern(key);
            return await this.cacheSerivce.hmget(key);
        }
        else {
            const { permissions, roles } = await this.getUserPermissionsAndRoles(userId);
            await this.cacheSerivce.hmset(key, { permissions, roles }, 60 * 60 * 24 * 7);
            return { permissions, roles };
        }
    }
};
PermissionsUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_user_roles_repository_1.AuthUserRolesRepository,
        auth_user_permissions_repository_1.AuthUserPermissionsRepository,
        cache_service_1.CacheService])
], PermissionsUseCases);
exports.PermissionsUseCases = PermissionsUseCases;
//# sourceMappingURL=permission.usecases.js.map