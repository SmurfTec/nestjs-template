import { AuthUserRolesModel } from '../models/authorization';
import { EntityManager } from 'typeorm';
export interface IAuthUserRoles {
    createAuthUserRoles(authUserRolesModel: AuthUserRolesModel, manager: EntityManager): Promise<AuthUserRolesModel>;
    getAuthUserRoles(userId: number): Promise<AuthUserRolesModel[]>;
    getUserRolePermissions(userId: number): Promise<any[]>;
}
