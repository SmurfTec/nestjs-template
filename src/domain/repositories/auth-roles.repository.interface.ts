import { AuthRoleModel } from '../models/authorization';

export interface IAuthRoles {
  createRole(authRoleModel: AuthRoleModel): Promise<AuthRoleModel>;
  getRoles(): Promise<AuthRoleModel[]>;
}
