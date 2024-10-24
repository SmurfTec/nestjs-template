export declare class AuthRoleModel {
    name: string;
    description: string;
    parent_role: string;
    created_by: number;
}
export declare class AuthRolePermissionsModel {
    role: string;
    permissions: string;
    created_by: number;
}
export declare class AuthUserRolesModel {
    role: string;
    user_id: number;
    created_by: number;
}
export declare class AuthUserPermissionsModel {
    permissions: string;
    user_id: number;
    created_by: number;
    is_allow: boolean;
}
export declare class AuthPermissionsModel {
    name: string;
    description: string;
    app_module?: number;
}
export declare class UpdateRoleModel {
    name: string;
    description?: string;
    parent_role?: string;
    created_by?: number;
}
