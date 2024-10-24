import { ProfilesUseCases } from '../../../usecases/profile/profile.usecases';
import { UpdateProfileDto } from './profile.dto';
import { UserUseCases } from 'src/usecases/user/user.usecases';
export declare class ProfileController {
    private readonly profileUseCases;
    private readonly userUseCases;
    constructor(profileUseCases: ProfilesUseCases, userUseCases: UserUseCases);
    getProfile(id: number): any;
    getProfiles(): any;
    updateProfile(profile: UpdateProfileDto): Promise<{
        message: string;
        status: number;
        profile: any;
        user: any;
    }>;
    deleteProfile(id: number): any;
}
