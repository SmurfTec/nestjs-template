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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EnvironmentConfigService = class EnvironmentConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    getShipstationAuth() {
        return this.configService.get('SHIPSTAION');
    }
    getFrontEndBaseUrl() {
        return this.configService.get('FRONT_END_BASE_URL');
    }
    getTempDirectoryPath() {
        return this.configService.get('TEMP_DIRECTORY_PATH');
    }
    getAppName() {
        return this.configService.get('APP_NAME');
    }
    getMinioEndPoint() {
        return this.configService.get('MINIO_END_POINT');
    }
    getMinioPort() {
        return this.configService.get('MINIO_PORT');
    }
    getMinioAccessKey() {
        return this.configService.get('MINIO_ACCESS_KEY');
    }
    getMinioSecretKey() {
        return this.configService.get('MINIO_SECRET_KEY');
    }
    getEmailHost() {
        return this.configService.get('EMAIL_HOST');
    }
    getEmailUser() {
        return this.configService.get('EMAIL_USER');
    }
    getEmailPass() {
        return this.configService.get('EMAIL_PASS');
    }
    getEmailPort() {
        return this.configService.get('EMAIL_PORT');
    }
    getGoogleClientId() {
        return this.configService.get('GOOGLE_CLIENT_ID');
    }
    getGoogleClientSecret() {
        return this.configService.get('GOOGLE_CLIENT_SECRET');
    }
    getRunGisService() {
        return this.configService.get('RUN_GIS_SERVICE') === 'true';
    }
    getRabbitMQHost() {
        return this.configService.get('RABBITMQ_HOST');
    }
    getRabbitMQPort() {
        return this.configService.get('RABBITMQ_PORT');
    }
    getRabbitMQUsername() {
        return this.configService.get('RABBITMQ_USERNAME');
    }
    getRabbitMQPassword() {
        return this.configService.get('RABBITMQ_PASSWORD');
    }
    getNceBaseUrl() {
        return this.configService.get('NCE_BASEURL');
    }
    getRedisHost() {
        return this.configService.get('REDIS_HOST');
    }
    getStripeSecretKey() {
        return this.configService.get('STRIPE_SECRET_KEY');
    }
    getRedisPort() {
        return this.configService.get('REDIS_PORT');
    }
    getRedisPassword() {
        return this.configService.get('REDIS_PASSWORD');
    }
    getRedisUsername() {
        return this.configService.get('REDIS_USERNAME');
    }
    getRedisUserPasswordRequired() {
        return (this.configService.get('REDIS_USER_PASSWORD_REQUIRED') === 'true');
    }
    getTablesExcludedFromCRUDLogs() {
        return this.configService
            .get('TABLES_EXCLUDED_FROM_CRUD_LOG')
            .split(',');
    }
    getJwtSecret() {
        return this.configService.get('JWT_SECRET');
    }
    getJwtExpirationTime() {
        return this.configService.get('JWT_EXPIRATION_TIME');
    }
    getJwtRefreshSecret() {
        return this.configService.get('JWT_REFRESH_TOKEN_SECRET');
    }
    getJwtRefreshExpirationTime() {
        return this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
    }
    getDatabaseHost() {
        return this.configService.get('DATABASE_HOST');
    }
    getDatabasePort() {
        return this.configService.get('DATABASE_PORT');
    }
    getDatabaseUser() {
        return this.configService.get('DATABASE_USERNAME');
    }
    getDatabasePassword() {
        return this.configService.get('DATABASE_PASSWORD');
    }
    getDatabaseName() {
        return this.configService.get('DATABASE_NAME');
    }
    getDatabaseType() {
        return this.configService.get('DATABASE_TYPE');
    }
    getDatabaseSync() {
        return this.configService.get('DATABASE_SYNCHRONIZE') === 'true';
    }
    getDatabaseMigrationRun() {
        return this.configService.get('DATABASE_MIGRATIONS_RUN') === 'true';
    }
    getGisDatabaseHost() {
        return this.configService.get('GIS_DATABASE_HOST');
    }
    getGisDatabasePort() {
        return this.configService.get('GIS_DATABASE_PORT');
    }
    getGisDatabaseUser() {
        return this.configService.get('GIS_DATABASE_USERNAME');
    }
    getGisDatabasePassword() {
        return this.configService.get('GIS_DATABASE_PASSWORD');
    }
    getGisDatabaseName() {
        return this.configService.get('GIS_DATABASE_NAME');
    }
    getGisDatabaseType() {
        return this.configService.get('GIS_DATABASE_TYPE');
    }
    getGisDatabaseSchema() {
        return this.configService.get('GIS_DATABASE_SCHEMA');
    }
    getGisDatabaseSync() {
        return (this.configService.get('GIS_DATABASE_SYNCHRONIZE') === 'true');
    }
    getGisDatabaseMigrationRun() {
        return (this.configService.get('GIS_DATABASE_MIGRATIONS_RUN') === 'true');
    }
    getPORT() {
        return this.configService.get('PORT');
    }
    getCacheManagerPort() {
        return this.configService.get('CACHE_MANAGER_PORT');
    }
    getCacheManagerHost() {
        return this.configService.get('CACHE_MANAGER_HOST');
    }
    getCacheManagerPassword() {
        const password = this.configService.get('CACHE_MANAGER_PASSWORD');
        return password ? { password } : {};
    }
    getRabbitMQUrl() {
        return `amqp://${this.getRabbitMQUsername()}:${this.getRabbitMQPassword()}@${this.getRabbitMQHost()}:${this.getRabbitMQPort()}`;
    }
    getRedisUrl() {
        if (this.checkIfRedisUserAndPasswordExists()) {
            return this.getRedisUrlWithUserAndPassword();
        }
        return this.getRedisUrlWithoutUserAndPassword();
    }
    getRedisUrlWithUserAndPassword() {
        return `redis://${this.getRedisUsername()}:${this.getRedisPassword()}@${this.getCacheManagerHost()}:${this.getCacheManagerPort()}`;
    }
    getRedisUrlWithoutUserAndPassword() {
        return `redis://${this.getCacheManagerHost()}:${this.getCacheManagerPort()}`;
    }
    checkIfRedisUserAndPasswordExists() {
        if (this.getRedisPassword() && this.getRedisUsername()) {
            return true;
        }
        return false;
    }
};
EnvironmentConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EnvironmentConfigService);
exports.EnvironmentConfigService = EnvironmentConfigService;
//# sourceMappingURL=environment-config.service.js.map