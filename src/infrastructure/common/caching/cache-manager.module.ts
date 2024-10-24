import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
// import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheService } from '../../services/cache.service';

const configSerivce = new EnvironmentConfigService(new ConfigService());

@Module({
  imports: [
    CacheModule.register({
      // isGlobal: true,
      // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // //@ts-ignore
      // store: redisStore,
      // socket: {
      //   host: configSerivce.getCacheManagerHost(),
      //   port: configSerivce.getCacheManagerPort(),
      // },
      // ...configSerivce.getCacheManagerPassword(),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheMangerModule {}
