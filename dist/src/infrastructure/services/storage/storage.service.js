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
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const minio_1 = require("minio");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
let StorageService = class StorageService {
    constructor() {
        this.minioClient = new minio_1.default.Client({
            endPoint: configSerivce.getMinioEndPoint(),
            port: +configSerivce.getCacheManagerPort(),
            useSSL: true,
            accessKey: configSerivce.getMinioAccessKey(),
            secretKey: configSerivce.getMinioSecretKey(),
        });
    }
    async uploadFile(bucketName, fileName, filePath, metaData) {
        return new Promise((resolve, reject) => {
            this.minioClient.fPutObject(bucketName, fileName, filePath, metaData, function (err, etag) {
                if (err) {
                    reject(err.message);
                }
                resolve('file uploaded');
            });
        });
    }
    async getFile(bucketName, fileName, path) {
        await this.minioClient.fGetObject(bucketName, fileName, path);
        return;
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map