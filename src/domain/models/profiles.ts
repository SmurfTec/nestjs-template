export class ProfileModel {
  name: string;
  mobile?: string;
  image_path?: string;
  is_active?: boolean;
}

export class FetchProfileModel {
  id: number;
  name: string;
  mobile?: string;
  image_path?: string;
  is_active?: boolean;
  created_on?: Date;
  updated_on?: Date;
}

export class UpdateProfileModel {
  name?: string;
  mobile?: string;
  image_path?: string;
  is_active?: boolean;
  created_on?: Date;
  updated_on?: Date;
}
