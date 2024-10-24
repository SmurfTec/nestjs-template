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
exports.AuthorizationUseCases = void 0;
const common_1 = require("@nestjs/common");
const user_data_1 = require("../../infrastructure/common/user.data");
const auth_permissions_repository_1 = require("../../infrastructure/repository/auth-permissions.repository");
const auth_role_permissions_repository_1 = require("../../infrastructure/repository/auth-role-permissions.repository");
const auth_roles_repository_1 = require("../../infrastructure/repository/auth-roles.repository");
const auth_user_permissions_repository_1 = require("../../infrastructure/repository/auth-user-permissions.repository");
const auth_user_roles_repository_1 = require("../../infrastructure/repository/auth-user-roles.repository");
const cache_service_1 = require("../../infrastructure/services/cache.service");
const utility_functions_1 = require("../../infrastructure/util/utility-functions");
const typeorm_1 = require("typeorm");
let AuthorizationUseCases = class AuthorizationUseCases {
    constructor(dataSource, cacheService, authPermissionsRepository, authUserPermissionsRepository, authRoleRepository, authUserRolesRepository, authRolePermissionsRepository) {
        this.dataSource = dataSource;
        this.cacheService = cacheService;
        this.authPermissionsRepository = authPermissionsRepository;
        this.authUserPermissionsRepository = authUserPermissionsRepository;
        this.authRoleRepository = authRoleRepository;
        this.authUserRolesRepository = authUserRolesRepository;
        this.authRolePermissionsRepository = authRolePermissionsRepository;
    }
    async createRole(authRoleDto) {
        const role = await this.authRoleRepository.getRoleByName(authRoleDto.name);
        if (role)
            throw new common_1.HttpException('Role Already exists', common_1.HttpStatus.CONFLICT);
        const userId = user_data_1.UserData.getUserData().id;
        return await this.authRoleRepository.createRole(Object.assign(Object.assign({}, authRoleDto), { created_by: userId }));
    }
    async getRoles() {
        return { data: await this.authRoleRepository.getRoles() };
    }
    async getRole(name) {
        return { data: await this.authRoleRepository.getRole(name) };
    }
    async deleteRole(role) {
        return await this.authRoleRepository.deleteRole(role);
    }
    async getUsersByRole(role) {
        return {
            data: await this.authUserRolesRepository.getUsersByRole(role),
        };
    }
    async updateRole(role, authRoleDto) {
        return await this.authRoleRepository.updateRole(role, Object.assign({}, authRoleDto));
    }
    async createRolePermissions(role, authRolePermissionsDto) {
        const rolePermissions = [];
        const userId = user_data_1.UserData.getUserData().id;
        const existingRolePermissions = await this.authRolePermissionsRepository.getRolePermissions(role);
        (0, utility_functions_1.checkExistingPermissions)(existingRolePermissions.map((rolePermissions) => rolePermissions.permissions), authRolePermissionsDto.permissions);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            for (const permission of authRolePermissionsDto.permissions) {
                rolePermissions.push(await this.authRolePermissionsRepository.createRolePermissions({
                    role: role,
                    permissions: permission,
                    created_by: userId,
                }, queryRunner.manager));
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return rolePermissions;
    }
    async updateRolePermissions(role, authRolePermissionsDto) {
        const rolePermissions = [];
        const userId = user_data_1.UserData.getUserData().id;
        const existingRolePermissions = await this.authRolePermissionsRepository.getRolePermissionsNew(role);
        let permissionsToRemove = existingRolePermissions
            .filter((rolePermission) => !authRolePermissionsDto.permissions.includes(rolePermission.permissions))
            .map((rolePermission) => rolePermission.permissions);
        const permissionsToAdd = authRolePermissionsDto.permissions.filter((permission) => !existingRolePermissions
            .map((rolePermission) => rolePermission.permissions)
            .includes(permission));
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            if (permissionsToRemove.length > 0) {
                await this.authRolePermissionsRepository.deleteRolePermissions(role, permissionsToRemove, queryRunner.manager);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        if (permissionsToAdd.length > 0) {
            (0, utility_functions_1.checkExistingPermissions)(existingRolePermissions.map((rolePermissions) => rolePermissions.permissions), permissionsToAdd);
        }
        const queryRunner2 = this.dataSource.createQueryRunner();
        await queryRunner2.startTransaction();
        try {
            await this.authRolePermissionsRepository.createRolePermissionsBulk(permissionsToAdd.map((permission) => ({
                role: role,
                permissions: permission,
                created_by: userId,
            })), queryRunner2.manager);
            await queryRunner2.commitTransaction();
        }
        catch (error) {
            await queryRunner2.rollbackTransaction();
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return rolePermissions;
    }
    async getRolePermissions(role) {
        return {
            data: await this.authRolePermissionsRepository.getRolePermissions(role),
        };
    }
    async createUserRoles(id, authUserRolesDto) {
        var _a;
        console.log('authUserRolesDto', authUserRolesDto);
        const key = id + '.permissions';
        const created_by = ((_a = user_data_1.UserData.getUserData()) === null || _a === void 0 ? void 0 : _a.id) || null;
        const userRoles = [];
        const existingUserRoles = await this.authUserRolesRepository.getAuthUserRoles(id);
        console.log('existingUserRoles', existingUserRoles);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const deleteRoles = existingUserRoles.map((userRoles) => userRoles.role);
            console.log('deleteRoles', deleteRoles);
            await this.authUserRolesRepository.deleteAuthUserRole(id, deleteRoles, queryRunner.manager);
            for (const role of authUserRolesDto.roles) {
                userRoles.push(await this.authUserRolesRepository.createAuthUserRoles({ role, user_id: id, created_by }, queryRunner.manager));
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return userRoles;
    }
    async getUserRoles(userId) {
        return {
            data: await this.authUserRolesRepository.getAuthUserRoles(userId),
        };
    }
    async deleteUserRole(id, roles) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.startTransaction();
        try {
            const data = await this.authUserRolesRepository.deleteAuthUserRole(id, roles, queryRunner.manager);
            queryRunner.commitTransaction();
            return data;
        }
        catch (e) {
            queryRunner.rollbackTransaction();
        }
    }
    async getPermissions() {
        return { data: await this.authPermissionsRepository.getPermissions() };
    }
    async createUserPermissions(id, authUserPermisisonsDto) {
        const userPermissions = [];
        const created_by = user_data_1.UserData.getUserData().id;
        const existingUserPermissions = await this.authUserPermissionsRepository.getAuthUserPermissions(id);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            await this.authUserPermissionsRepository.deleteAuthUserPermissionsByUserId(id, queryRunner.manager);
            for (const permission of authUserPermisisonsDto.permissions) {
                userPermissions.push(await this.authUserPermissionsRepository.createAuthUserPermissions({
                    permissions: permission,
                    created_by,
                    user_id: id,
                    is_allow: true,
                }, queryRunner.manager));
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
        return userPermissions;
    }
    async getUserPermissions(userId) {
        return {
            data: await this.authUserPermissionsRepository.getAuthUserPermissions(userId),
        };
    }
    async deleteUserPermission(id, permissions) {
        const queryRunner = this.dataSource.createQueryRunner();
        queryRunner.startTransaction();
        try {
            const data = await this.authUserPermissionsRepository.deleteAuthUserPermissions(id, permissions, queryRunner.manager);
            queryRunner.commitTransaction();
            return data;
        }
        catch (e) {
            queryRunner.rollbackTransaction();
        }
    }
};
AuthorizationUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        cache_service_1.CacheService,
        auth_permissions_repository_1.AuthPermissionsRepository,
        auth_user_permissions_repository_1.AuthUserPermissionsRepository,
        auth_roles_repository_1.AuthRolesRepository,
        auth_user_roles_repository_1.AuthUserRolesRepository,
        auth_role_permissions_repository_1.AuthRolePermissionsRepository])
], AuthorizationUseCases);
exports.AuthorizationUseCases = AuthorizationUseCases;
//# sourceMappingURL=authorization.usecases.js.map