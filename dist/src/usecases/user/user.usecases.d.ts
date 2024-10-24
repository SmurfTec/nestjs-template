import { ProfilesRepository } from './../../infrastructure/repository/profile.repository';
import { UserModel, UserUpdateModel } from 'src/domain/models/user';
import { CacheService } from 'src/infrastructure/services/cache.service';
import { MailService } from 'src/infrastructure/services/emails/email.service';
import { EntityManager } from 'typeorm';
import { UserRepository } from '../../infrastructure/repository/user.repository';
export declare class UserUseCases {
    private readonly userRepository;
    private readonly profileRepository;
    private cacheService;
    private emailService;
    constructor(userRepository: UserRepository, profileRepository: ProfilesRepository, cacheService: CacheService, emailService: MailService);
    userTypes: {
        employee: () => Promise<any[]>;
        customer: () => Promise<any[]>;
    };
    transformationTypes: {
        employee: (data: any) => Promise<any[] | {
            id: any;
            username: any;
            is_active: any;
            last_login: any;
            employee: any;
        }>;
        customer: (data: any) => Promise<any>;
    };
    viewAdmin(id: any): Promise<any>;
    setCacheCode(code: string | number, email: string): Promise<void>;
    createUser(user: UserModel): Promise<import("src/domain/models/user").UserCreatedModel>;
    createUserOnConfirmation(code: number, email: string, manager?: EntityManager): Promise<any>;
    resendCodeEmail(userEmail: string): Promise<UserModel>;
    sendPhoneCode(phone: string, email: string): Promise<number>;
    createPhoneConfirmation(code: number, email: string, manager?: EntityManager): Promise<import("../../domain/models/profile").ProfileModel>;
    checkUser(userEmail: any): Promise<UserModel>;
    createAdmin(user: UserModel): Promise<import("src/domain/models/user").UserCreatedModel>;
    banUsers(ids: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    deleteUsers(ids: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    unbanUsers(ids: number[]): Promise<{
        successfulIds: number[];
        failedIds: number[];
    }>;
    getUser(id: number, getProfileId?: boolean): Promise<any>;
    getUserByEmail(email: string): Promise<UserModel>;
    getUserStats(): Promise<{
        total_users_registered: any;
        total_users_percentage: number;
        users_percentage: number;
        total_users_this_month: any;
        total_users_last_month: any;
        total_user_this_year: any;
        users_years_percentage: number;
    }>;
    getUserReveueStats(): Promise<{
        total_users_registered: any;
        total_users_percentage: number;
        users_percentage: number;
        total_users_this_month: any;
        total_users_last_month: any;
        total_user_this_year: any;
        users_years_percentage: number;
    }>;
    getUsersByRole(role: string): Promise<UserModel[]>;
    getUsers(query: any): Promise<{
        stats: {
            total_users_registered: any;
            total_users_percentage: number;
            users_percentage: number;
            total_users_this_month: any;
            total_users_last_month: any;
            total_user_this_year: any;
            users_years_percentage: number;
        };
        data: any[];
    }>;
    updateUser(id: number, user: UserUpdateModel, manager?: EntityManager): Promise<any>;
    transformEmployeeData(employeeData: any[] | any): Promise<any[] | {
        id: any;
        username: any;
        is_active: any;
        last_login: any;
        employee: any;
    }>;
    forgotPassword(email: string): Promise<string>;
    validateCode(code: string): Promise<{
        status: boolean;
    }>;
    getUserEmailByCode(code: string): Promise<any>;
    setUsersPassword(code: number, password: string): Promise<any>;
    transformEmployeeObject(employee: any): Promise<{
        id: any;
        username: any;
        is_active: any;
        last_login: any;
        employee: any;
    }>;
    userStatsTransformer({ total_users: data, total_users_this_month, total_users_last_month, total_user_this_year, total_user_last_year, }: {
        total_users: any;
        total_users_this_month: any;
        total_users_last_month: any;
        total_user_this_year: any;
        total_user_last_year: any;
    }): {
        total_users_registered: any;
        total_users_percentage: number;
        users_percentage: number;
        total_users_this_month: any;
        total_users_last_month: any;
        total_user_this_year: any;
        users_years_percentage: number;
    };
    randomIntFromInterval(min: any, max: any): number;
}
