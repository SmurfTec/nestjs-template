import { AuthRolePermissionsModel } from '../models/authorization';
import { EntityManager } from 'typeorm';

export interface IAuthRolePermissions {
  createRolePermissions(
    authRolePermissionsModel: AuthRolePermissionsModel,
    manager: EntityManager,
  ): Promise<AuthRolePermissionsModel>;

  getRolePermissions(role: string): Promise<AuthRolePermissionsModel[]>;
}
