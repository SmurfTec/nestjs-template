import { AuthPermissionsModel } from '../models/authorization';

export interface IAuthPermissions {
  getPermissions(): Promise<AuthPermissionsModel[]>;
}
