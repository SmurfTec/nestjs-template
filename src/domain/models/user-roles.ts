export class UserRoleModel {
  is_active?: boolean;
  user_id: number;
  role_id: number;
}

export class FetchUserRoleModel {
  id: number;
  is_active?: boolean;
  user_id: number;
  role_id: number;
}

export class UpdateUserRoleModel {
  is_active?: boolean;
  user_id?: number;
  role_id?: number;
}
