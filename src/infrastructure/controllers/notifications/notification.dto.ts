import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsEnum, IsObject, Min, Max } from 'class-validator';
import { NotificationType } from '../../entities/notification.entity';
import { DevicePlatform } from '../../entities/device-token.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  send_email?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  send_push?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  send_sms?: boolean;
}

export class GetNotificationsDto {
  @ApiProperty()
  @IsOptional()
  limit?: number = 20;

  @ApiProperty()
  @IsOptional()
  cursor?: number;

  @ApiProperty()
  @IsOptional()
  is_read?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NotificationType)
  type?: NotificationType;
}

export class MarkAsReadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class RegisterDeviceTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(DevicePlatform)
  platform: DevicePlatform;

  @ApiProperty()
  @IsOptional()
  @IsString()
  device_name?: string;
}

export class UpdateNotificationSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  email_enabled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  push_enabled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  sms_enabled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  in_app_enabled?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  quiet_hours?: { start: string; end: string };

  @ApiProperty()
  @IsOptional()
  @IsObject()
  preferences?: Record<string, any>;
}

export class NotificationResponseDto {
  id: number;
  user_id: number;
  title: string;
  body: string;
  type: NotificationType;
  data: Record<string, any> | null;
  is_read: boolean;
  read_at: Date | null;
  created_at: Date;
}

export class UnreadCountResponseDto {
  count: number;
}

