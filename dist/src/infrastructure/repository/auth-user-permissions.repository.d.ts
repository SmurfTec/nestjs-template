import { AuthUserPermissions } from '../entities/auth-user-permissions.entity';
import { EntityManager, Repository } from 'typeorm';
import { IAuthUserPermissions } from 'src/domain/repositories/auth-user-permissions.repository.interface';
import { AuthUserPermissionsModel } from 'src/domain/models/authorization';
export declare class AuthUserPermissionsRepository implements IAuthUserPermissions {
    private readonly authUserPermissionRepository;
    constructor(authUserPermissionRepository: Repository<AuthUserPermissions>);
    createAuthUserPermissions(authUserPermissionsModel: AuthUserPermissionsModel, manager: EntityManager): Promise<AuthUserPermissionsModel>;
    getAuthUserPermissions(userId: number): Promise<AuthUserPermissions[]>;
    deleteAuthUserPermissionsByUserId(id: number, manager: EntityManager): Promise<string>;
    deleteAuthUserPermissions(id: number, permissions: string[], manager: EntityManager): Promise<string>;
}
