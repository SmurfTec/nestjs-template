import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { EnvironmentConfigService } from '../../../infrastructure/config/environment-config/environment-config.service';
import { CacheService } from './cache.service';
import { CacheModule } from '@nestjs/cache-manager';

const configSerivce = new EnvironmentConfigService(new ConfigService());
const userLocalMemory = configSerivce.getLocalMemoryUsageForCacheManager();
const cacheHost = configSerivce.getCacheManagerHost();
const cachePort = configSerivce.getCacheManagerPort();
const cachePassword = configSerivce.getCacheManagerPassword();
let config = {};
if (!userLocalMemory && cacheHost && cachePort) {
  config = {
    store: redisStore,
    socket: {
      host: cacheHost,
      port: cachePort,
    },
    ...cachePassword,
  };
} else {
  config = {
    store: 'memory',
  };
}

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ...config,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheMangerModule {}
