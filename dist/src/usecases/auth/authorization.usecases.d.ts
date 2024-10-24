import { UpdateRoleModel } from 'src/domain/models/authorization';
import { AuthRolePermissionDto } from 'src/infrastructure/controllers/auth/dtos/auth-role-permission.dto';
import { AuthRoleDto } from 'src/infrastructure/controllers/auth/dtos/auth-role.dto';
import { AuthUserPermissionsDto } from 'src/infrastructure/controllers/auth/dtos/auth-user-permissions.dto';
import { AuthUserRoleDto } from 'src/infrastructure/controllers/auth/dtos/auth-user-roles.dto';
import { AuthPermissionsRepository } from 'src/infrastructure/repository/auth-permissions.repository';
import { AuthRolePermissionsRepository } from 'src/infrastructure/repository/auth-role-permissions.repository';
import { AuthRolesRepository } from 'src/infrastructure/repository/auth-roles.repository';
import { AuthUserPermissionsRepository } from 'src/infrastructure/repository/auth-user-permissions.repository';
import { AuthUserRolesRepository } from 'src/infrastructure/repository/auth-user-roles.repository';
import { CacheService } from 'src/infrastructure/services/cache.service';
import { DataSource } from 'typeorm';
export declare class AuthorizationUseCases {
    private dataSource;
    private cacheService;
    private authPermissionsRepository;
    private authUserPermissionsRepository;
    private authRoleRepository;
    private authUserRolesRepository;
    private authRolePermissionsRepository;
    constructor(dataSource: DataSource, cacheService: CacheService, authPermissionsRepository: AuthPermissionsRepository, authUserPermissionsRepository: AuthUserPermissionsRepository, authRoleRepository: AuthRolesRepository, authUserRolesRepository: AuthUserRolesRepository, authRolePermissionsRepository: AuthRolePermissionsRepository);
    createRole(authRoleDto: AuthRoleDto): Promise<import("src/domain/models/authorization").AuthRoleModel>;
    getRoles(): Promise<{
        data: import("src/domain/models/authorization").AuthRoleModel[];
    }>;
    getRole(name: any): Promise<{
        data: import("src/domain/models/authorization").AuthRoleModel[];
    }>;
    deleteRole(role: string): Promise<import("typeorm").DeleteResult>;
    getUsersByRole(role: string): Promise<{
        data: import("src/domain/models/authorization").AuthUserRolesModel[];
    }>;
    updateRole(role: string, authRoleDto: UpdateRoleModel): Promise<import("src/domain/models/authorization").AuthRoleModel>;
    createRolePermissions(role: string, authRolePermissionsDto: AuthRolePermissionDto): Promise<any[]>;
    updateRolePermissions(role: string, authRolePermissionsDto: AuthRolePermissionDto): Promise<any[]>;
    getRolePermissions(role: string): Promise<{
        data: import("src/domain/models/authorization").AuthRolePermissionsModel[];
    }>;
    createUserRoles(id: number, authUserRolesDto: AuthUserRoleDto): Promise<any[]>;
    getUserRoles(userId: number): Promise<{
        data: import("src/domain/models/authorization").AuthUserRolesModel[];
    }>;
    deleteUserRole(id: number, roles: string[]): Promise<string>;
    getPermissions(): Promise<{
        data: import("src/domain/models/authorization").AuthPermissionsModel[];
    }>;
    createUserPermissions(id: number, authUserPermisisonsDto: AuthUserPermissionsDto): Promise<any[]>;
    getUserPermissions(userId: number): Promise<{
        data: import("../../infrastructure/entities/auth-user-permissions.entity").AuthUserPermissions[];
    }>;
    deleteUserPermission(id: number, permissions: string[]): Promise<string>;
}
