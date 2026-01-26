export class TwoFactorAuthModel {
  user_id: number;
  secret?: string;
  is_enabled?: boolean;
  recovery_codes?: string[];
}

export class FetchTwoFactorAuthModel {
  id: number;
  user_id: number;
  secret: string;
  is_enabled: boolean;
  recovery_codes: string[];
  created_at: Date;
  updated_at: Date;
}

export class UpdateTwoFactorAuthModel {
  secret?: string;
  is_enabled?: boolean;
  recovery_codes?: string[];
}

