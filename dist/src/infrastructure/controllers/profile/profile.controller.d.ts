import { ProfilesUseCases } from '../../../usecases/profile/profile.usecases';
import { UpdateProfileDto } from './profile.dto';
import { UserUseCases } from 'src/usecases/user/user.usecases';
export declare class ProfileController {
    private readonly profileUseCases;
    private readonly userUseCases;
    constructor(profileUseCases: ProfilesUseCases, userUseCases: UserUseCases);
    getProfile(id: number): Promise<{
        data: import("../../../domain/models/profile").ProfileModel;
    }>;
    getProfiles(): Promise<import("../../../domain/models/profile").ProfileModel[]>;
    updateProfile(profile: UpdateProfileDto): Promise<{
        message: string;
        status: number;
        profile: import("../../../domain/models/profile").ProfileModel;
        user: any;
    }>;
    deleteProfile(id: number): Promise<void>;
}
