import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  // Application Configuration
  getPORT(): number {
    return +this.configService.get<string>('PORT')!;
  }

  // Frontend Configuration
  getFrontEndBaseUrl(): string {
    return this.configService.get<string>('FRONT_END_BASE_URL')!;
  }

  // Apple Configuration
  getAppleClientId(): string {
    return this.configService.get<string>('APPLE_CLIENT_ID')!;
  }

  getAppleTeamId(): string {
    return this.configService.get<string>('APPLE_TEAM_ID')!;
  }

  getAppleKeyId(): string {
    return this.configService.get<string>('APPLE_KEY_ID')!;
  }

  getApplePrivateKey(): string {
    return this.configService
      .get<string>('APPLE_PRIVATE_KEY')!
      .replace(/\\n/g, '\n');
  }

  getAppleClientCallBackUrl(): string {
    return this.configService.get<string>('APPLE_CALLBACK_URL')!;
  }

  // Google Configuration
  getGoogleCallBackUrl(): string {
    return this.configService.get<string>('GOOGLE_CALLBACK_URL')!;
  }

  getGoogleClientId(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID')!;
  }

  getGoogleClientSecret(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET')!;
  }

  // Email Configuration
  getSupportName(): string {
    return this.configService.get<string>('SUPPORT_NAME');
  }

  getSupportEmail(): string {
    return this.configService.get<string>('SUPPORT_EMAIL');
  }

  getEmailHost(): string {
    return this.configService.get<string>('EMAIL_HOST');
  }

  getEmailPort(): string {
    return this.configService.get<string>('EMAIL_PORT');
  }

  getEmailUser(): any {
    const user = this.configService.get<string>('EMAIL_USER');
    return user ? { user } : {};
  }

  getEmailPass(): any {
    const pass = this.configService.get<string>('EMAIL_PASS');
    return pass ? { pass } : {};
  }

  // JWT Configuration
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  // Database Configuration
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST')!;
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT')!;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USERNAME')!;
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD')!;
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME')!;
  }

  getDatabaseType(): any {
    return this.configService.get<string>('DATABASE_TYPE')!;
  }

  getDatabaseSync(): boolean {
    return this.configService.get<string>('DATABASE_SYNCHRONIZE') === 'true';
  }

  getDatabaseMigrationRun(): boolean {
    return this.configService.get<string>('DATABASE_MIGRATIONS_RUN') === 'true';
  }

  // Cache Configuration
  getLocalMemoryUsageForCacheManager(): boolean {
    return (
      !this.configService.get<string>('USE_LOCAL_MEMORY_CACHE_MANAGER') ||
      this.configService
        .get<string>('USE_LOCAL_MEMORY_CACHE_MANAGER')
        .toLowerCase() === 'true'
    );
  }

  getCacheManagerPort(): string {
    return this.configService.get<string>('CACHE_MANAGER_PORT');
  }

  getCacheManagerHost(): string {
    return this.configService.get<string>('CACHE_MANAGER_HOST');
  }

  getCacheManagerPassword(): any {
    const password = this.configService.get<string>('CACHE_MANAGER_PASSWORD');
    return password ? password : '';
  }

  // AWS Configuration
  getAwsAccessKey(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY');
  }

  getAwsSecretAccessKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  getAwsRegion(): string {
    return this.configService.get<string>('AWS_REGION');
  }

  getAwsBucketName(): string {
    return this.configService.get<string>('AWS_BUCKET_NAME');
  }

  getAmazonClientId(): string {
    return this.configService.get<string>('AMAZON_SP_API_CLIENT_ID');
  }

  getAmazonClientSecret(): string {
    return this.configService.get<string>('AMAZON_SP_API_CLIENT_SECRET');
  }

  getAmazonRedirectURI(): string {
    return this.configService.get<string>('AMAZON_SP_API_REDIRECT_URI');
  }

  getAmazonBaseUrl(): string {
    return this.configService.get<string>('AMAZON_SP_API_BASE_URL');
  }

  getAmazonRefreshToken(): string {
    return this.configService.get<string>('AMAZON_SP_API_REFRESH_TOKEN');
  }
}
