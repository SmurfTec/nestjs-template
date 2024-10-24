import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-config.validation';
import * as path from 'path';
const envPath = path.resolve(__dirname, '../../../../../env/.env');

console.log('envPath envconfigmodule', envPath);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPath,
      // ignoreEnvFile: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' ? false : true,
      ignoreEnvFile: false,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
