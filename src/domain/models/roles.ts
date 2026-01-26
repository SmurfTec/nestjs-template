export class RoleModel {
  name: string;
  description: string;
  is_active?: boolean;
}

export class FetchRoleModel {
  id: number;
  name: string;
  description: string;
  is_active?: boolean;
}

export class UpdateRoleModel {
  name?: string;
  description?: string;
  is_active?: boolean;
}
