"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMangerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const cache_service_1 = require("../../services/cache.service");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
let CacheMangerModule = class CacheMangerModule {
};
CacheMangerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register({}),
        ],
        providers: [cache_service_1.CacheService],
        exports: [cache_service_1.CacheService],
    })
], CacheMangerModule);
exports.CacheMangerModule = CacheMangerModule;
//# sourceMappingURL=cache-manager.module.js.map