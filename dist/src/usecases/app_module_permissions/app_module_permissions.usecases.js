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
exports.AppModulePermissionsUseCases = void 0;
const common_1 = require("@nestjs/common");
const app_module_permissions_repository_1 = require("../../infrastructure/repository/app_module_permissions.repository");
let AppModulePermissionsUseCases = class AppModulePermissionsUseCases {
    constructor(appModulePermissionsRepository) {
        this.appModulePermissionsRepository = appModulePermissionsRepository;
    }
    async createAppModulePermission(appModulePermissionModel) {
        return {
            data: await this.appModulePermissionsRepository.createAppModulePermission(appModulePermissionModel),
        };
    }
    async getAppModulePermission(id) {
        const data = await this.appModulePermissionsRepository.getAppModulePermission(id);
        if (!data) {
            throw new common_1.HttpException('AppModulePermission Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getAppModulePermissions() {
        return {
            data: await this.appModulePermissionsRepository.getAppModulePermissions(),
        };
    }
    async updateAppModulePermission(id, appModulePermissionUpdateModel) {
        return await this.appModulePermissionsRepository.updateAppModulePermission(id, appModulePermissionUpdateModel);
    }
    async deleteAppModulePermission(id) {
        return await this.appModulePermissionsRepository.deleteAppModulePermission(id);
    }
};
AppModulePermissionsUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_module_permissions_repository_1.AppModulePermissionsRepository])
], AppModulePermissionsUseCases);
exports.AppModulePermissionsUseCases = AppModulePermissionsUseCases;
//# sourceMappingURL=app_module_permissions.usecases.js.map