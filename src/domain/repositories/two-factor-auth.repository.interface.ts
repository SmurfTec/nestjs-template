import {
  TwoFactorAuthModel,
  FetchTwoFactorAuthModel,
  UpdateTwoFactorAuthModel,
} from '../models/two-factor-auth';

export interface ITwoFactorAuth {
  createTwoFactorAuth(
    twoFactorModel: TwoFactorAuthModel,
  ): Promise<FetchTwoFactorAuthModel>;
  getTwoFactorAuthByUserId(userId: number): Promise<FetchTwoFactorAuthModel>;
  updateTwoFactorAuth(
    userId: number,
    updateModel: UpdateTwoFactorAuthModel,
  ): Promise<FetchTwoFactorAuthModel>;
  deleteTwoFactorAuth(userId: number): Promise<void>;
}

