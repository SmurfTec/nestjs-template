import { ApiOkResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  EMAIL_HOST: string;
  @IsString()
  EMAIL_USER: string;
  @IsString()
  EMAIL_PASS: string;
  @IsString()
  EMAIL_PORT: string;
  @IsString()
  GOOGLE_CLIENT_ID: string;
  @IsString()
  GOOGLE_CLIENT_SECRET: string;
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRATION_TIME: string;
  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;
  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
  @IsString()
  DATABASE_TYPE: string;
  @IsString()
  DATABASE_NAME: string;
  @IsString()
  DATABASE_PORT: string;
  @IsString()
  DATABASE_HOST: string;
  @IsString()
  DATABASE_USERNAME: string;
  @IsString()
  DATABASE_PASSWORD: string;
  @IsString()
  DATABASE_SYNCHRONIZE: string;
  @IsString()
  DATABASE_MIGRATIONS_RUN: string;
  
  @IsString()
  PORT: string;

}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
