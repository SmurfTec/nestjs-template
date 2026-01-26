import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: false, description: '2FA token if user has 2FA enabled' })
  @IsString()
  readonly twoFactorToken?: string;
}
export class AuthSignUpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class AuthVerifyUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ required: true})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class ResendOtpDto {
  @ApiProperty({ required: true})
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class APIKeyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly new_password: string;
}

export class InitiateEmailUpdateDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class VerifyEmailUpdateDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly otp: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  readonly new_email: string;
}
