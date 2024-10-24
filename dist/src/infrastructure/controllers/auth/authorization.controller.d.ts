import { UserUseCases } from './../../../usecases/user/user.usecases';
import { AuthRoleDto } from './dtos/auth-role.dto';
import { AuthorizationUseCases } from 'src/usecases/auth/authorization.usecases';
import { AuthUserRoleDto } from './dtos/auth-user-roles.dto';
import { AuthUserPermissionsDto } from './dtos/auth-user-permissions.dto';
export declare class AuthorizationController {
    private authorizationUseCases;
    private userUseCases;
    constructor(authorizationUseCases: AuthorizationUseCases, userUseCases: UserUseCases);
    createRole(createRole: AuthRoleDto, req: any, res: any, next: any): Promise<void>;
    deleteRole(role: string, req: any, res: any, next: any): Promise<void>;
    createUserPermissions(id: number, authUserPermissionsDto: AuthUserPermissionsDto, req: any, res: any, next: any): Promise<void>;
    createUserRole(authUserRoleDto: AuthUserRoleDto, id: number, req: any, res: any, next: any): Promise<void>;
    getRoles(req: any, res: any, next: any): Promise<void>;
    updateRole(name: string, authRoleDto: AuthRoleDto, req: any, res: any, next: any): Promise<void>;
    getPermissions(req: any, res: any, next: any): Promise<void>;
    viewAdmin(id: number, req: any, res: any, next: any): Promise<void>;
    getUserPermissions(id: number, req: any, res: any, next: any): Promise<void>;
    getUserRoles(id: number, req: any, res: any, next: any): Promise<void>;
    deleteUserPermission(id: number, permissions: string[], req: any, res: any, next: any): Promise<void>;
    deleteUserRole(id: number, roles: string[], req: any, res: any, next: any): Promise<void>;
    getRolePermissions(role: string, req: any, res: any, next: any): Promise<void>;
}
