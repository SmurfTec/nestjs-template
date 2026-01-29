import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  // Database Variables
  @IsNotEmpty()
  @IsString()
  DATABASE_TYPE: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_PORT: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_USERNAME: string;
  @IsOptional()
  @IsString()
  DATABASE_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_SYNCHRONIZE: string;
  @IsNotEmpty()
  @IsString()
  DATABASE_MIGRATIONS_RUN: string;

  // JWT Variables
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;

  // Application Variables
  @IsNotEmpty()
  @IsString()
  PORT: string;

  // Cache Variables
  @IsString()
  @IsOptional()
  CACHE_MANAGER_HOST: string;
  @IsString()
  @IsOptional()
  CACHE_MANAGER_PORT: string;
  @IsString()
  @IsOptional()
  USE_LOCAL_MEMORY_CACHE_MANAGER: string;

  // Email Variables
  @IsString()
  EMAIL_PORT: string;
  @IsString()
  EMAIL_HOST: string;
  // @IsString()
  // EMAIL_USER: string;
  // @IsString()
  // EMAIL_PASS: string;
  @IsString()
  SUPPORT_EMAIL: string;
  @IsString()
  SUPPORT_NAME: string;

  // Google Variables
  @IsString()
  GOOGLE_CLIENT_ID: string;
  @IsString()
  GOOGLE_CLIENT_SECRET: string;
  @IsString()
  GOOGLE_CALLBACK_URL: string;

  // Apple Variables
  @IsString()
  APPLE_CLIENT_ID: string;
  @IsString()
  APPLE_TEAM_ID: string;
  @IsString()
  APPLE_KEY_ID: string;
  @IsString()
  APPLE_PRIVATE_KEY: string;
  @IsString()
  APPLE_CALLBACK_URL: string;

  // Stripe Variables
  @IsString()
  @IsOptional()
  STRIPE_SECRET_KEY: string;
  @IsString()
  @IsOptional()
  STRIPE_WEBHOOK_SECRET: string;
  @IsString()
  @IsOptional()
  STRIPE_PUBLISHABLE_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new BadRequestException(errors.toString());
  }
  return validatedConfig;
}
