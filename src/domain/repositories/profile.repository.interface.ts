import {
  ProfileModel,
  FetchProfileModel,
  ProfileUpdateModel,
} from '../models/Profile';
export interface IProfile {
  createProfile(profileModel: ProfileModel): Promise<FetchProfileModel>;
  getProfile(id: number): Promise<ProfileModel>;
  getProfiles(): Promise<ProfileModel[]>;
  updateProfile(
    id: number,
    updateProfileModel: ProfileUpdateModel,
  ): Promise<ProfileModel>;
  deleteProfile(id: number): Promise<void>;
}
