import { EntityManager, Repository } from 'typeorm';
import { ProfileCreatedModel, ProfileModel, ProfileUpdateModel } from 'src/domain/models/profile';
import { IProfile } from 'src/domain/repositories/profile.repository.interface';
import { Profiles } from '../entities/profile.entity';
export declare class ProfilesRepository implements IProfile {
    private ProfilesRepository;
    constructor(ProfilesRepository: Repository<Profiles>);
    createProfile(ProfilesModel: ProfileModel, manager?: EntityManager): Promise<ProfileCreatedModel>;
    getProfile(id: number): Promise<ProfileModel>;
    getProfiles(): Promise<ProfileModel[]>;
    updateProfile(id: number, updateProfileModel: ProfileUpdateModel): Promise<ProfileModel>;
    deleteProfile(id: number): Promise<void>;
    getProfileByCode(code: number): Promise<ProfileModel>;
}
