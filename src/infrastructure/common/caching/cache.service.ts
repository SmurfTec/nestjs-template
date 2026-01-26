import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async hmget(key: string) {
    return JSON.parse(await this.cacheManager.get(key));
  }

  async set(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    return await this.cacheManager.set(key, value, ttl);
  }

  async incr(key: string) {
    const count = await this.cacheManager.get(key);
    if (count) {
      await this.cacheManager.set(key, +count + 1);
      return +count + 1;
    } else {
      await this.cacheManager.set(key, 1);
      return 1;
    }
  }

  async hmset(key: string, value: any, ttl: number = 60 * 60 * 24 * 1000) {
    return await this.cacheManager.set(key, JSON.stringify(value), ttl);
  }

  async delete(key: string) {
    return await this.cacheManager.del(key);
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
    return await this.cacheManager.clear();
  }
}
