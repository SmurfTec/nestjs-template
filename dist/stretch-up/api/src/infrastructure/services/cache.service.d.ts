import { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    get(key: string): Promise<unknown>;
    hmget(key: string): Promise<any>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    hmset(key: string, value: any, ttl?: number): Promise<void>;
    delete(key: string): Promise<void>;
    deleteByKeyPattern(pattern: string): Promise<void>;
    getKeysByPattern(pattern: string): Promise<string[]>;
    update(key: string, value: any, ttl?: number): Promise<void>;
    has(key: string): Promise<boolean>;
    reset(): Promise<void>;
}
