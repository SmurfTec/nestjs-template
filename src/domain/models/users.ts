import { Profiles } from 'src/infrastructure/entities/profiles.entity';

export class UserModel {
  email: string;
  password: string;
  status?: string;
  last_login?: Date;
  hach_refresh_token?: string;
  is_active?: boolean;
  profile_id?: number;
}

export class UserWithProfileModel {
  email: string;
  password: string;
  name: string;
  mobile?: string;
  status?: string;
  last_login?: Date;
  hach_refresh_token?: string;
  is_active?: boolean;
  profile_id?: number;
}

export class FetchUserModel {
  id: number;
  email: string;
  password: string;
  status: string;
  last_login?: Date;
  hach_refresh_token?: string;
  is_active?: boolean;
  profile_id: number;
  stripe_customer_id?: string;
}

export class UpdateUserModel {
  email?: string;
  password?: string;
  status?: string;
  last_login?: Date;
  hach_refresh_token?: string;
  is_active?: boolean;
}

export class UserWithoutPassword {
  id: number;
  email: string;
  created_on: Date;
  updated_on: Date;
  lastLogin: Date;
  status: string;
  is_active?: boolean;
  hashRefreshToken: string;
  profile: Profiles;
  requiresTwoFactor: boolean;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
