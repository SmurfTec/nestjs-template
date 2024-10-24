import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  // @Inject(CACHE_MANAGER) private cacheManager: Cache;
  // @InjectRedis() private cacheManager: Redis,
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async hmget(key: string) {
    return JSON.parse(await this.cacheManager.get(key));
  }

  async set(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return await this.cacheManager.set(key, value, { ttl });
  }

  async hmset(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    return await this.cacheManager.set(key, JSON.stringify(value), ttl);
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
  }

  async deleteByKeyPattern(pattern: string) {
    const keys = await this.getKeysByPattern(pattern);
    if (keys.length > 0) {
      return await this.cacheManager.del(keys[0]);
    }
    return;
  }

  async getKeysByPattern(pattern: string) {
    return await this.cacheManager.store.keys(pattern);
  }

  async update(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    const data = await this.cacheManager.get(key);
    if (Array.isArray(data) && data.length > 0) {
      return await this.cacheManager.set(key, value, ttl);
    } else if (!Array.isArray(data) && data) {
      return await this.cacheManager.set(key, value, ttl);
    }
  }

  async has(key: string) {
    const data = await this.cacheManager.get(key);
    return data ? true : false;
  }

  async reset() {
    return await this.cacheManager.reset();
  }
}
