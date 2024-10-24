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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationController = void 0;
const user_usecases_1 = require("./../../../usecases/user/user.usecases");
const common_1 = require("@nestjs/common");
const auth_role_dto_1 = require("./dtos/auth-role.dto");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const permission_guard_1 = require("../../common/guards/permission.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const authorization_usecases_1 = require("../../../usecases/auth/authorization.usecases");
const auth_user_roles_dto_1 = require("./dtos/auth-user-roles.dto");
const auth_user_permissions_dto_1 = require("./dtos/auth-user-permissions.dto");
const catch_async_1 = require("../../../utils/catch-async");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationUseCases, userUseCases) {
        this.authorizationUseCases = authorizationUseCases;
        this.userUseCases = userUseCases;
    }
    async createRole(createRole, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const role = await this.authorizationUseCases.createRole({
                name: createRole.name,
                description: createRole.description,
                parent_role: createRole.parent_role,
            });
            const auth_role_permissions = await this.authorizationUseCases.updateRolePermissions(role.name, {
                permissions: createRole.permissions,
            });
            return res.status(201).json({
                data: {
                    role,
                    auth_role_permissions,
                },
            });
        })(req, res, next);
    }
    async deleteRole(role, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const result = await this.authorizationUseCases.deleteRole(role);
            if (result.affected === 0) {
                throw new common_1.NotFoundException('Role not found');
            }
            return res.json({
                message: 'Role deleted successfully',
            });
        })(req, res, next);
    }
    async createUserPermissions(id, authUserPermissionsDto, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            let resposne = await this.authorizationUseCases.createUserPermissions(id, authUserPermissionsDto);
            return res.json(resposne);
        })(req, res, next);
    }
    async createUserRole(authUserRoleDto, id, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            console.log('authUserRolesDto', authUserRoleDto);
            await this.authorizationUseCases.createUserRoles(id, authUserRoleDto);
            const user = await this.authorizationUseCases.getUserRoles(id);
            return res.json(user);
        })(req, res, next);
    }
    async getRoles(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const roles = await this.authorizationUseCases.getRoles();
            const usersPerRole = await Promise.all(roles.data.map(async (role) => {
                const users = await this.authorizationUseCases.getUsersByRole(role.name);
                return {
                    role: role.name,
                    users: users.data.length,
                };
            }));
            return res.json({
                results: roles.data.length,
                usersPerRole,
                roles: roles.data,
            });
        })(req, res, next);
    }
    async updateRole(name, authRoleDto, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            let new_role = await this.authorizationUseCases.getRole(name);
            console.log('new_role', new_role);
            if (!new_role.data.length) {
                throw new common_1.NotFoundException('Role not found');
            }
            if (authRoleDto.permissions.length > 0) {
                await this.authorizationUseCases.updateRolePermissions(name, {
                    permissions: authRoleDto.permissions,
                });
            }
            if (authRoleDto.name) {
                new_role = await this.authorizationUseCases.updateRole(name, authRoleDto);
            }
            let auth_role_permissions = await this.authorizationUseCases.getRolePermissions(authRoleDto.name || name);
            return res.json({
                data: {
                    role: new_role,
                    auth_role_permissions,
                },
            });
        })(req, res, next);
    }
    async getPermissions(req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const re = await this.authorizationUseCases.getPermissions();
            res.json(re);
        })(req, res, next);
    }
    async viewAdmin(id, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.userUseCases.viewAdmin(id);
            res.json(ss);
        })(req, res, next);
    }
    async getUserPermissions(id, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.authorizationUseCases.getUserPermissions(id);
            res.json(ss);
        })(req, res, next);
    }
    async getUserRoles(id, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.authorizationUseCases.getUserRoles(id);
            res.json(ss);
        })(req, res, next);
    }
    async deleteUserPermission(id, permissions, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.authorizationUseCases.deleteUserPermission(id, permissions);
            res.json(ss);
        })(req, res, next);
    }
    async deleteUserRole(id, roles, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.authorizationUseCases.deleteUserRole(id, roles);
            res.json(ss);
        })(req, res, next);
    }
    async getRolePermissions(role, req, res, next) {
        return await (0, catch_async_1.catchAsync)(async (req, res, next) => {
            const ss = await this.authorizationUseCases.getRolePermissions(role);
            res.json(ss);
        })(req, res, next);
    }
};
__decorate([
    (0, common_1.Post)('role'),
    (0, permissions_decorator_1.Permission)('role.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_role_dto_1.AuthRoleDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "createRole", null);
__decorate([
    (0, common_1.Delete)('roles/:role'),
    (0, permissions_decorator_1.Permission)('role.delete'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "deleteRole", null);
__decorate([
    (0, common_1.Post)('user-permissions/:id'),
    (0, permissions_decorator_1.Permission)('user.permission.create'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, auth_user_permissions_dto_1.AuthUserPermissionsDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "createUserPermissions", null);
__decorate([
    (0, common_1.Post)('user-roles/:id'),
    (0, permissions_decorator_1.Permission)('user.role.create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_user_roles_dto_1.AuthUserRoleDto, Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "createUserRole", null);
__decorate([
    (0, common_1.Get)('roles'),
    (0, permissions_decorator_1.Permission)('roles.read'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Patch)('role-permissions/:name'),
    (0, permissions_decorator_1.Permission)('role.update'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, auth_role_dto_1.AuthRoleDto, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Get)('permissions'),
    (0, permissions_decorator_1.Permission)('permissions.read'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Get)('admin/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "viewAdmin", null);
__decorate([
    (0, common_1.Get)('user-permissions/:id'),
    (0, permissions_decorator_1.Permission)('user.permissions.read'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getUserPermissions", null);
__decorate([
    (0, common_1.Get)('user-roles/:id'),
    (0, permissions_decorator_1.Permission)('user.roles.read'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getUserRoles", null);
__decorate([
    (0, common_1.Delete)('user-permissions/:id'),
    (0, permissions_decorator_1.Permission)('user.permissions.delete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('permissions')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "deleteUserPermission", null);
__decorate([
    (0, common_1.Delete)('user-roles/:id'),
    (0, permissions_decorator_1.Permission)('user.roles.delete'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('roles')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __param(4, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "deleteUserRole", null);
__decorate([
    (0, common_1.Get)('role-permissions/:role'),
    (0, permissions_decorator_1.Permission)('role.permissions.read'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getRolePermissions", null);
AuthorizationController = __decorate([
    (0, common_1.Controller)('authorization'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    __metadata("design:paramtypes", [authorization_usecases_1.AuthorizationUseCases, typeof (_a = typeof user_usecases_1.UserUseCases !== "undefined" && user_usecases_1.UserUseCases) === "function" ? _a : Object])
], AuthorizationController);
exports.AuthorizationController = AuthorizationController;
//# sourceMappingURL=authorization.controller.js.map