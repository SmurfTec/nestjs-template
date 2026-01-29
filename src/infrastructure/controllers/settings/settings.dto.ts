import {
  IsString,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
  ValidateIf,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name?: string;

  @IsEmail()
  @IsOptional()
  @ValidateIf((o) => o.email !== undefined)
  @ApiPropertyOptional({
    description: 'Email address (requires verification if changed)',
    example: 'john.doe@example.com',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+1234567890',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Company role or designation',
    example: 'Product Manager',
  })
  companyRole?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Avatar URL or S3 key (generated on upload)',
    example: 'avatars/uuid.jpg',
  })
  avatar?: string;
}

export class ProfileResponseDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Full name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Email address', example: 'john.doe@example.com' })
  email: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  phone?: string;

  @ApiPropertyOptional({ description: 'Company role', example: 'Product Manager' })
  companyRole?: string;

  @ApiPropertyOptional({ description: 'Avatar URL', example: 'https://bucket.s3.amazonaws.com/avatars/uuid.jpg' })
  avatar?: string;

  @ApiProperty({ description: 'Profile created date' })
  created_on: Date;

  @ApiProperty({ description: 'Profile last updated date' })
  updated_on: Date;
}

export class UpdateNotificationPreferencesDto {
  @ApiPropertyOptional({ description: 'Enable/disable email alerts', example: true })
  email_alerts?: boolean;

  @ApiPropertyOptional({ description: 'Enable/disable push notifications', example: true })
  push_notifications?: boolean;

  @ApiPropertyOptional({ description: 'Enable/disable in-app digest', example: true })
  in_app_digest?: boolean;

  @ApiPropertyOptional({ description: 'Enable/disable marketing emails', example: false })
  marketing_emails?: boolean;
}

export class NotificationPreferencesResponseDto {
  @ApiProperty({ description: 'Preferences ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'Email alerts enabled', example: true })
  email_alerts: boolean;

  @ApiProperty({ description: 'Push notifications enabled', example: true })
  push_notifications: boolean;

  @ApiProperty({ description: 'In-app digest enabled', example: true })
  in_app_digest: boolean;

  @ApiProperty({ description: 'Marketing emails enabled', example: false })
  marketing_emails: boolean;

  @ApiProperty({ description: 'Created date' })
  created_at: Date;

  @ApiProperty({ description: 'Last updated date' })
  updated_at: Date;
}

export class UpdateCredentialsDto {
  @ApiProperty({
    description: 'Current password for verification',
    example: 'CurrentPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  current_password: string;

  @ApiProperty({
    description: 'New password to set',
    example: 'NewSecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  new_password: string;

  @ApiPropertyOptional({
    description: 'Sign out of all devices - invalidates all refresh tokens',
    example: false,
  })
  @IsOptional()
  sign_out_all_devices?: boolean;
}

export class CredentialsUpdateResponseDto {
  @ApiProperty({ description: 'Success message', example: 'Password updated successfully' })
  message: string;

  @ApiPropertyOptional({ description: 'Whether all devices were signed out', example: false })
  all_devices_signed_out?: boolean;
}

export class Enable2FADto {
  @ApiProperty({ 
    description: '6-digit verification code from authenticator app after scanning QR code', 
    example: '123456' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  token: string;
}

export class TwoFactorAuthStatusDto {
  @ApiProperty({ description: 'Whether 2FA is enabled', example: true })
  is_enabled: boolean;

  @ApiPropertyOptional({ description: 'Recovery codes (only shown once)', example: ['abc123', 'def456'] })
  recovery_codes?: string[] | null;
}

export class TwoFactorAuthSetupResponseDto {
  @ApiProperty({ description: 'TOTP secret', example: 'JBSWY3DPEHPK3PXP' })
  secret: string;

  @ApiProperty({ description: 'QR code data URL', example: 'data:image/png;base64,...' })
  qrCode: string;

  @ApiProperty({ description: 'Recovery codes to save securely', example: ['code1', 'code2'] })
  recovery_codes: string[];
}

