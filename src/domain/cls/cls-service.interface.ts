import { ClsStore } from 'nestjs-cls';
import { Profiles } from 'src/infrastructure/entities/profiles.entity';

export interface User {
  id?: number;
  email?: string;
  status?: string;
  lastLogin?: Date;
  hashRefreshToken?: string;
  last_password_change?: Date;
  profile?: Profiles;
  changePassword?: boolean;
}

export interface CustomClsStore extends ClsStore {
  user?: User;
}
