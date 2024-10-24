import { UserCreatedModel, UserModel, UserUpdateModel } from '../../domain/models/user';
import { IUser } from '../../domain/repositories/user.repository.interface';
import { Users } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EntityManager } from 'typeorm';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
export declare class UserRepository implements IUser {
    private userRepository;
    private readonly bcryptService;
    constructor(userRepository: Repository<Users>, bcryptService: BcryptService);
    updateRefreshToken(email: string, refreshToken: string): Promise<void>;
    getUsersByRole(role: string): Promise<UserModel[]>;
    getWalletStats(): Promise<{
        available_withdrawn: number;
    }>;
    deleteUsers(userIds: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    banUsers(userIds: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    unbanUsers(userIds: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    getActiveUserByEmail(email: string): Promise<UserModel>;
    getUserByEmail(email: string): Promise<UserModel>;
    getUserByCode(code: number): Promise<UserModel>;
    updateLastLogin(email: string): Promise<void>;
    private toUser;
    private toUserEntity;
    createUser(userModel: UserModel): Promise<UserCreatedModel>;
    getUser(id: number): Promise<Users>;
    viewAdmin(id: number): Promise<any>;
    getEmployee(id: number): Promise<any>;
    getCustomer(id: number): Promise<any>;
    getUserStats(): Promise<{
        total_users: Users[];
        total_users_this_month: any;
        total_users_last_month: any;
        total_user_this_year: any;
        total_user_last_year: any;
    }>;
    getUsers(queryparams: any): Promise<any[]>;
    getEmployees(): Promise<any[]>;
    getCustomers(): Promise<any[]>;
    updateUser(id: number, userModel: UserUpdateModel, manager?: EntityManager): Promise<any>;
    deleteUser(id: number): Promise<void>;
}
