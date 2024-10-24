import { AuthUserRoles } from '../entities/auth-user-roles.entity';
import { Repository, EntityManager } from 'typeorm';
import { IAuthUserRoles } from 'src/domain/repositories/auth-user-roles.repository.interface';
import { AuthUserRolesModel } from 'src/domain/models/authorization';
export declare class AuthUserRolesRepository implements IAuthUserRoles {
    private entityManager;
    private authUserRolesRepository;
    constructor(entityManager: EntityManager, authUserRolesRepository: Repository<AuthUserRoles>);
    createAuthUserRoles(authUserRolesModel: AuthUserRolesModel, manager: EntityManager): Promise<AuthUserRolesModel>;
    getAuthUserRoles(userId: number): Promise<AuthUserRolesModel[]>;
    getUsersByRole(role: string): Promise<AuthUserRolesModel[]>;
    deleteAuthUserRole(id: number, roles: string[], manager: EntityManager): Promise<string>;
    getUserRolePermissions(userId: number): Promise<any[]>;
}
