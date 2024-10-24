import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { DataSource } from 'typeorm';
import { ProfileModel, ProfileUpdateModel } from '../../domain/models/profile';
import { ProfilesRepository } from '../../infrastructure/repository/profile.repository';
import { UserUseCases } from '../user/user.usecases';
export declare class ProfilesUseCases {
    private readonly ProfilesRepository;
    private readonly userRepository;
    private readonly userUsecases;
    private dataSource;
    constructor(ProfilesRepository: ProfilesRepository, userRepository: UserRepository, userUsecases: UserUseCases, dataSource: DataSource);
    random: (length?: number) => string;
    createProfile(ProfileModel: ProfileModel, userId: number): Promise<import("../../domain/models/profile").ProfileCreatedModel>;
    createProfileGoogle(ProfileModel: ProfileModel, email: string, userId: number): Promise<any>;
    getProfile(id: number): Promise<{
        data: ProfileModel;
    }>;
    getProfiles(): Promise<ProfileModel[]>;
    updateProfile(id: number, profileUpdateModel: ProfileUpdateModel): Promise<ProfileModel>;
    deleteProfile(id: number): Promise<void>;
}
