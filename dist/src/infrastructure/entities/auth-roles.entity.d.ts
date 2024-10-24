import { AuthRolePermissions } from './auth-role-permissions.entity';
import { AuthUserRoles } from './auth-user-roles.entity';
export declare class AuthRoles {
    name: string;
    description: string;
    parent_role: string;
    created_by: number;
    created_at: Date;
    auth_user_roles: AuthUserRoles[];
    auth_role_permissions: AuthRolePermissions[];
}
