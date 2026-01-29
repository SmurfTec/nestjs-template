import { RoleModel, FetchRoleModel, UpdateRoleModel } from '../models/roles';
export interface IRole {
  createRole(roleModel: RoleModel): Promise<FetchRoleModel>;
  getRole(id: number): Promise<FetchRoleModel>;
  getRoles(): Promise<FetchRoleModel[]>;
  updateRole(
    id: number,
    updateRoleModel: UpdateRoleModel,
  ): Promise<FetchRoleModel>;
  deleteRole(id: number): Promise<void>;
}
