import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
export class AuthGoogleDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBoolean()
  readonly is_social_login: boolean;
}
export class AuthSignUpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  readonly password: string;
}
export class ResendCodeDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
export class AuthConfirmSignUpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly code: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class AuthConfirmPhoneDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[+]?[0-9]{10,15}$/) // Ensures the phone number is valid with optional '+'
  readonly phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
export class AuthConfirmOtpDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly code: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly currentPassword: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}

export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;
}

export class SetPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  readonly password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
}
export class ValidatePasswordDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Your password validation logic goes here
          // Example validation criteria: min length 8, at least one uppercase letter, one lowercase letter, one number, and one special character
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a strong password (min length 8, at least one uppercase letter, one lowercase letter, one number, and one special character)`;
        },
      },
    });
  };
}
