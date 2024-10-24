import { UserModel, FetchUserModel, UserCreatedModel } from '../models/User';
export interface IUser {
    createUser(userModel: UserModel): Promise<UserCreatedModel>;
    getUser(id: number): Promise<FetchUserModel>;
    getUsers(queryparams: any): Promise<any[]>;
    updateUser(id: number, updateUserModel: UserCreatedModel): Promise<FetchUserModel>;
    deleteUser(id: number): Promise<void>;
}
