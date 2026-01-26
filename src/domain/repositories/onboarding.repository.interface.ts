import {
  PersonalDetailsModel,
  OnboardingProgressModel,
  FetchOnboardingModel,
  UpdateOnboardingModel,
} from '../models/onboarding';

export interface OnboardingRepositoryInterface {
  updatePersonalDetails(userId: number, personalDetails: PersonalDetailsModel): Promise<FetchOnboardingModel>;
  getProgress(userId: number): Promise<OnboardingProgressModel>;
  getByUserId(userId: number): Promise<FetchOnboardingModel>;
  update(userId: number, updateData: UpdateOnboardingModel): Promise<FetchOnboardingModel>;
  complete(userId: number): Promise<FetchOnboardingModel>;
}
