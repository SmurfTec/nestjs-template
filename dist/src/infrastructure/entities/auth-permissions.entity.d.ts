import { AppModulePermissions } from './app_module_permissions.entity';
import { AuthUserPermissions } from './auth-user-permissions.entity';
export declare class AuthPermissions {
    name: string;
    description: string;
    auth_user_permissions: AuthUserPermissions;
    appModulePermissions: AppModulePermissions[];
    auth_role_permissions: string;
}
