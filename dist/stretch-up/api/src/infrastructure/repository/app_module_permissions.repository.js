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
exports.AppModulePermissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_module_permissions_entity_1 = require("../entities/app_module_permissions.entity");
let AppModulePermissionsRepository = class AppModulePermissionsRepository {
    constructor(appModulePermissionsRepository) {
        this.appModulePermissionsRepository = appModulePermissionsRepository;
    }
    async createAppModulePermission(appModulePermissionsModel) {
        const createdAppModule = await this.appModulePermissionsRepository.save(appModulePermissionsModel);
        return await this.appModulePermissionsRepository.findOne({
            where: { id: createdAppModule.id },
            relations: ['app_module', 'permission'],
        });
    }
    async getAppModulePermission(id) {
        return await this.appModulePermissionsRepository.findOne({
            where: { id },
            relations: ['app_module', 'permission'],
        });
    }
    async getAppModulePermissions() {
        return await this.appModulePermissionsRepository.find({
            relations: ['app_module', 'permission'],
        });
    }
    async getAppModulePermissionsWithoutRelations() {
        return await this.appModulePermissionsRepository.find();
    }
    async updateAppModulePermission(id, updateAppModulePermissionModel) {
        const appModulePermission = await this.appModulePermissionsRepository.findOne({ where: { id } });
        if (appModulePermission) {
            const updatedAppModulePermission = Object.assign(Object.assign({}, appModulePermission), updateAppModulePermissionModel);
            return this.appModulePermissionsRepository.save(updatedAppModulePermission);
        }
        return;
    }
    async deleteAppModulePermission(id) {
        await this.appModulePermissionsRepository.delete(id);
        return;
    }
};
AppModulePermissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(app_module_permissions_entity_1.AppModulePermissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppModulePermissionsRepository);
exports.AppModulePermissionsRepository = AppModulePermissionsRepository;
//# sourceMappingURL=app_module_permissions.repository.js.map