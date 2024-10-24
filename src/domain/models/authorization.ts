export class AuthRoleModel {
  name: string;
  description: string;
  parent_role: string;
  created_by: number;
}

export class AuthRolePermissionsModel {
  role: string;
  permissions: string;
  created_by: number;
}

export class AuthUserRolesModel {
  role: string;
  user_id: number;
  created_by: number;
}
export class AuthUserPermissionsModel {
  permissions: string;
  user_id: number;
  created_by: number;
  is_allow: boolean;
}

export class AuthPermissionsModel {
  name: string;
  description: string;
  app_module?: number = null;
}

export class UpdateRoleModel {
  name: string;
  description?: string;
  parent_role?: string;
  created_by?: number;
}
