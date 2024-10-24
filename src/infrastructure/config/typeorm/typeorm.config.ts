import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';
import Entities from '../../entities/db';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as path from 'path';

// config({ path: 'env/.env' });
const configSerivce = new EnvironmentConfigService(new ConfigService());

// config({ path: 'env/config.env' });
const envPath = path.resolve(__dirname, '../../../../../env/.env');
console.log('envPath typeorm config', envPath);
config({ path: envPath });

export const databaseConfigurations: DataSourceOptions = {
  type: configSerivce.getDatabaseType(),
  port: configSerivce.getDatabasePort(),
  username: configSerivce.getDatabaseUser(),
  password: configSerivce.getDatabasePassword(),
  database: configSerivce.getDatabaseName(),
  synchronize: configSerivce.getDatabaseSync(),
  // synchronize: true,
  host: configSerivce.getDatabaseHost(),
  entities: Entities,
  cache: false,
  migrations: [join(__dirname, '../../../../database/migrations/*{.ts,.js}')],
  logging: true,
  // migrationsRun: configSerivce.getDatabaseMigrationRun(),
};
