import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  status: string;
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  last_login: Date;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  hach_refresh_token: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  profile_id: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  password: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  status: string;
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  last_login: Date;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  hach_refresh_token: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  is_active: boolean;
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  profile_id: number;
}

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  mobile?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image_path?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  mobile?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  image_path?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;
}
