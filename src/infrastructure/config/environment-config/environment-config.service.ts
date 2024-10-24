import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig } from 'src/domain/config/rabbitmq.interface';
import { RedisConfig } from 'src/domain/config/redis.interface';
import { DatabaseConfig } from '../../../domain/config/database.interface';
import { JWTConfig } from '../../../domain/config/jwt.interface';

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, JWTConfig, RabbitMQConfig, RedisConfig
{
  constructor(private configService: ConfigService) {}

  getShipstationAuth(): string {
    return this.configService.get<string>('SHIPSTAION');
  }
  getFrontEndBaseUrl(): string {
    return this.configService.get<string>('FRONT_END_BASE_URL');
  }
  getTempDirectoryPath(): string {
    return this.configService.get<string>('TEMP_DIRECTORY_PATH');
  }
  getAppName(): string {
    return this.configService.get<string>('APP_NAME');
  }
  getMinioEndPoint(): string {
    return this.configService.get<string>('MINIO_END_POINT');
  }
  getMinioPort(): string {
    return this.configService.get<string>('MINIO_PORT');
  }
  getMinioAccessKey(): string {
    return this.configService.get<string>('MINIO_ACCESS_KEY');
  }
  getMinioSecretKey(): string {
    return this.configService.get<string>('MINIO_SECRET_KEY');
  }
  getEmailHost(): string {
    return this.configService.get<string>('EMAIL_HOST');
  }
  getEmailUser(): string {
    return this.configService.get<string>('EMAIL_USER');
  }
  getEmailPass(): string {
    return this.configService.get<string>('EMAIL_PASS');
  }
  getEmailPort(): string {
    return this.configService.get<string>('EMAIL_PORT');
  }
  getGoogleClientId(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }
  getGoogleClientSecret(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  }
  getRunGisService(): boolean {
    return this.configService.get<string>('RUN_GIS_SERVICE') === 'true';
  }

  getRabbitMQHost(): string {
    return this.configService.get<string>('RABBITMQ_HOST');
  }

  getRabbitMQPort(): string {
    return this.configService.get<string>('RABBITMQ_PORT');
  }

  getRabbitMQUsername(): string {
    return this.configService.get<string>('RABBITMQ_USERNAME');
  }

  getRabbitMQPassword(): string {
    return this.configService.get<string>('RABBITMQ_PASSWORD');
  }

  getNceBaseUrl(): string {
    return this.configService.get<string>('NCE_BASEURL');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getStripeSecretKey(): string {
    return this.configService.get<string>('STRIPE_SECRET_KEY');
  }

  getRedisPort(): string {
    return this.configService.get<string>('REDIS_PORT');
  }
  getRedisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD');
  }
  getRedisUsername(): string {
    return this.configService.get<string>('REDIS_USERNAME');
  }

  getRedisUserPasswordRequired(): boolean {
    return (
      this.configService.get<string>('REDIS_USER_PASSWORD_REQUIRED') === 'true'
    );
  }

  getTablesExcludedFromCRUDLogs(): string[] {
    return this.configService
      .get<string>('TABLES_EXCLUDED_FROM_CRUD_LOG')
      .split(',');
  }

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

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  }

  getDatabaseType(): any {
    return this.configService.get<string>('DATABASE_TYPE');
  }

  // getDatabaseSchema(): string {
  //   return this.configService.get<string>('DATABASE_SCHEMA');
  // }

  // getDatabaseSync(): boolean {
  //   const result = this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  //   console.log(typeof result, result);
  //   return result;
  // }
  getDatabaseSync(): boolean {
    return this.configService.get<string>('DATABASE_SYNCHRONIZE') === 'true';
  }

  getDatabaseMigrationRun(): boolean {
    return this.configService.get<string>('DATABASE_MIGRATIONS_RUN') === 'true';
  }

  getGisDatabaseHost(): string {
    return this.configService.get<string>('GIS_DATABASE_HOST');
  }

  getGisDatabasePort(): number {
    return this.configService.get<number>('GIS_DATABASE_PORT');
  }

  getGisDatabaseUser(): string {
    return this.configService.get<string>('GIS_DATABASE_USERNAME');
  }

  getGisDatabasePassword(): string {
    return this.configService.get<string>('GIS_DATABASE_PASSWORD');
  }

  getGisDatabaseName(): string {
    return this.configService.get<string>('GIS_DATABASE_NAME');
  }

  getGisDatabaseType(): any {
    return this.configService.get<string>('GIS_DATABASE_TYPE');
  }

  getGisDatabaseSchema(): any {
    return this.configService.get<string>('GIS_DATABASE_SCHEMA');
  }

  getGisDatabaseSync(): boolean {
    return (
      this.configService.get<string>('GIS_DATABASE_SYNCHRONIZE') === 'true'
    );
  }

  getGisDatabaseMigrationRun(): boolean {
    return (
      this.configService.get<string>('GIS_DATABASE_MIGRATIONS_RUN') === 'true'
    );
  }

  getPORT(): string {
    return this.configService.get<string>('PORT');
  }
  getCacheManagerPort(): string {
    return this.configService.get<string>('CACHE_MANAGER_PORT');
  }
  getCacheManagerHost(): string {
    return this.configService.get<string>('CACHE_MANAGER_HOST');
  }

  getCacheManagerPassword(): any {
    const password = this.configService.get<string>('CACHE_MANAGER_PASSWORD');
    return password ? { password } : {};
  }

  getRabbitMQUrl(): string {
    return `amqp://${this.getRabbitMQUsername()}:${this.getRabbitMQPassword()}@${this.getRabbitMQHost()}:${this.getRabbitMQPort()}`;
  }

  getRedisUrl() {
    if (this.checkIfRedisUserAndPasswordExists()) {
      return this.getRedisUrlWithUserAndPassword();
    }
    return this.getRedisUrlWithoutUserAndPassword();
  }

  getRedisUrlWithUserAndPassword() {
    return `redis://${this.getRedisUsername()}:${this.getRedisPassword()}@${this.getCacheManagerHost()}:${this.getCacheManagerPort()}`;
  }

  getRedisUrlWithoutUserAndPassword() {
    return `redis://${this.getCacheManagerHost()}:${this.getCacheManagerPort()}`;
  }

  checkIfRedisUserAndPasswordExists(): boolean {
    if (this.getRedisPassword() && this.getRedisUsername()) {
      return true;
    }
    return false;
  }
}
