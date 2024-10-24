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
exports.AppModulesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const app_module_entity_1 = require("../entities/app_module.entity");
let AppModulesRepository = class AppModulesRepository {
    constructor(appModulesRepository) {
        this.appModulesRepository = appModulesRepository;
    }
    async createAppModule(appModulesModel) {
        return await this.appModulesRepository.save(appModulesModel);
    }
    async getAppModule(id) {
        return await this.appModulesRepository.findOne({ where: { id } });
    }
    async getAppModules() {
        return await this.appModulesRepository.find();
    }
    async updateAppModule(id, updateAppModuleModel) {
        const appModule = await this.appModulesRepository.findOne({
            where: { id },
        });
        if (appModule) {
            const updatedAppModule = Object.assign(Object.assign({}, appModule), updateAppModuleModel);
            return this.appModulesRepository.save(updatedAppModule);
        }
        return;
    }
    async deleteAppModule(id) {
        await this.appModulesRepository.delete(id);
        return;
    }
};
AppModulesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(app_module_entity_1.AppModules)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppModulesRepository);
exports.AppModulesRepository = AppModulesRepository;
//# sourceMappingURL=app_module.repository.js.map