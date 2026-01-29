import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import entities from 'src/infrastructure/entities/db';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import dotenv from 'dotenv';
const configSerivce = new EnvironmentConfigService(new ConfigService());

const envPath = path.resolve(process.cwd(), 'env', '.env');
dotenv.config({ path: envPath });
export const databaseConfigurations: DataSourceOptions = {
  type: configSerivce.getDatabaseType(),
  port: configSerivce.getDatabasePort(),
  username: configSerivce.getDatabaseUser(),
  password: configSerivce.getDatabasePassword(),
  database: configSerivce.getDatabaseName(),
  synchronize: configSerivce.getDatabaseSync(),
  host: configSerivce.getDatabaseHost(),
  entities: entities,
  cache: false,
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsRun: configSerivce.getDatabaseMigrationRun(),
  applicationName: 'orion',
  logger: 'advanced-console',
  migrationsTransactionMode: 'each',
  logging: ['error'],
  poolSize: 100,
};