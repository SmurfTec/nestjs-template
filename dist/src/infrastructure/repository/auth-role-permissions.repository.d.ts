import { AuthRolePermissionsModel } from 'src/domain/models/authorization';
import { IAuthRolePermissions } from 'src/domain/repositories/auth-role-permissions.repository.interface';
import { AuthRolePermissions } from '../entities/auth-role-permissions.entity';
import { Repository, EntityManager } from 'typeorm';
export declare class AuthRolePermissionsRepository implements IAuthRolePermissions {
    private readonly authRolePermissionsRepository;
    constructor(authRolePermissionsRepository: Repository<AuthRolePermissions>);
    createRolePermissions(authRolePermissionsModel: AuthRolePermissionsModel, manager: EntityManager): Promise<AuthRolePermissionsModel>;
    getRolePermissions(role: string): Promise<AuthRolePermissionsModel[]>;
    getRolePermissionsNew(role: string): Promise<AuthRolePermissionsModel[]>;
    createRolePermissionsBulk(authRolePermissionsModel: AuthRolePermissionsModel[], manager: EntityManager): Promise<AuthRolePermissionsModel[]>;
    deleteRolePermissions(role: string, permissionsToRemove: string[], manager: EntityManager): Promise<string>;
}
