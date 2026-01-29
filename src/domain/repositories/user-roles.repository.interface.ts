import {
  UserRoleModel,
  FetchUserRoleModel,
  UpdateUserRoleModel,
} from '../models/user-roles';
import { UserRoles } from '../../infrastructure/entities/user-roles.entity';

export interface IUserRole {
  createUserRole(userRoleModel: UserRoleModel): Promise<FetchUserRoleModel>;
  getUserRole(id: number): Promise<FetchUserRoleModel>;
  getUserRolesByUserId(UserId: number): Promise<UserRoles[]>;
  getUserRolesByRoleId(RoleId: number): Promise<FetchUserRoleModel[]>;
  getUserRoles(): Promise<FetchUserRoleModel[]>;
  updateUserRole(
    id: number,
    updateUserRoleModel: UpdateUserRoleModel,
  ): Promise<FetchUserRoleModel>;
  deleteUserRole(id: number): Promise<void>;
}
