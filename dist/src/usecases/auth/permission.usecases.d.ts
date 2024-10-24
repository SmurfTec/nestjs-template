import { CacheService } from 'src/infrastructure/services/cache.service';
import { AuthUserPermissionsRepository } from 'src/infrastructure/repository/auth-user-permissions.repository';
import { AuthUserRolesRepository } from 'src/infrastructure/repository/auth-user-roles.repository';
export declare class PermissionsUseCases {
    private readonly authUserRolesRepository;
    private readonly authUserPermissionsRepository;
    private readonly cacheSerivce;
    constructor(authUserRolesRepository: AuthUserRolesRepository, authUserPermissionsRepository: AuthUserPermissionsRepository, cacheSerivce: CacheService);
    getUserPermissionsByRole(userId: number): Promise<any[]>;
    getUserPermissionsByUserId(userId: number): Promise<import("../../infrastructure/entities/auth-user-permissions.entity").AuthUserPermissions[]>;
    getUserPermissionsAndRoles(userId: number): Promise<{
        permissions: unknown[];
        roles: unknown[];
    }>;
    getOrSetUserPermissionsFromCache(userId: number): Promise<any>;
}
