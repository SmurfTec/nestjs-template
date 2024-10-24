"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
let CacheService = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async get(key) {
        return await this.cacheManager.get(key);
    }
    async hmget(key) {
        return JSON.parse(await this.cacheManager.get(key));
    }
    async set(key, value, ttl = 60 * 60 * 24 * 1000) {
        return await this.cacheManager.set(key, value, { ttl });
    }
    async hmset(key, value, ttl = 60 * 60 * 24 * 1000) {
        return await this.cacheManager.set(key, JSON.stringify(value), ttl);
    }
    async delete(key) {
        return await this.cacheManager.del(key);
    }
    async deleteByKeyPattern(pattern) {
        const keys = await this.getKeysByPattern(pattern);
        if (keys.length > 0) {
            return await this.cacheManager.del(keys[0]);
        }
        return;
    }
    async getKeysByPattern(pattern) {
        return await this.cacheManager.store.keys(pattern);
    }
    async update(key, value, ttl = 60 * 60 * 24 * 1000) {
        const data = await this.cacheManager.get(key);
        if (Array.isArray(data) && data.length > 0) {
            return await this.cacheManager.set(key, value, ttl);
        }
        else if (!Array.isArray(data) && data) {
            return await this.cacheManager.set(key, value, ttl);
        }
    }
    async has(key) {
        const data = await this.cacheManager.get(key);
        return data ? true : false;
    }
    async reset() {
        return await this.cacheManager.reset();
    }
};
CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
exports.CacheService = CacheService;
//# sourceMappingURL=cache.service.js.map