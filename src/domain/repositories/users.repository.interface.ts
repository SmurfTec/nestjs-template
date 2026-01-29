import { UserModel, FetchUserModel, UpdateUserModel } from '../models/users';
import { UserM } from '../models/users';

export interface IUser {
  createUser(userModel: UserModel): Promise<FetchUserModel>;
  getUser(id: number): Promise<FetchUserModel>;
  getUsers(): Promise<FetchUserModel[]>;
  updateUser(
    id: number,
    updateUserModel: UpdateUserModel,
  ): Promise<FetchUserModel>;
  deleteUser(id: number): Promise<void>;
  getActiveUserByEmail(email: string): Promise<UserModel>;
  getUserByEmail(email: string): Promise<UserM>;
  updateRefreshToken(email: string, refreshToken: string): Promise<void>;
  updateLastLogin(email: string): Promise<void>;
}
