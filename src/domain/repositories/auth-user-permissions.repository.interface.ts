import { EntityManager } from 'typeorm';
import { AuthUserPermissionsModel } from '../models/authorization';

export interface IAuthUserPermissions {
  createAuthUserPermissions(
    authUserPermissionsModel: AuthUserPermissionsModel,
    manager: EntityManager,
  ): Promise<AuthUserPermissionsModel>;
  getAuthUserPermissions(userId: number): Promise<AuthUserPermissionsModel[]>;
}
