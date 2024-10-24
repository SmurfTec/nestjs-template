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
exports.AppModuleController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const app_module_usecases_1 = require("../../../usecases/app_module/app_module.usecases");
const app_module_dto_1 = require("./app_module.dto");
let AppModuleController = class AppModuleController {
    constructor(appModuleUseCases) {
        this.appModuleUseCases = appModuleUseCases;
    }
    createAppModule(appModule) {
        return this.appModuleUseCases.createAppModule(appModule);
    }
    getAppModule(id) {
        return this.appModuleUseCases.getAppModulePermissions(id);
    }
    getAppModules() {
        return this.appModuleUseCases.getAppModules();
    }
    updateAppModule(id, appModule) {
        return this.appModuleUseCases.updateAppModule(id, appModule);
    }
    deleteAppModule(id) {
        return this.appModuleUseCases.deleteAppModule(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_module_dto_1.CreateAppModuleDto]),
    __metadata("design:returntype", void 0)
], AppModuleController.prototype, "createAppModule", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppModuleController.prototype, "getAppModule", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppModuleController.prototype, "getAppModules", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, app_module_dto_1.UpdateAppModuleDto]),
    __metadata("design:returntype", void 0)
], AppModuleController.prototype, "updateAppModule", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppModuleController.prototype, "deleteAppModule", null);
AppModuleController = __decorate([
    (0, common_1.Controller)('app_modules'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [app_module_usecases_1.AppModulesUseCases])
], AppModuleController);
exports.AppModuleController = AppModuleController;
//# sourceMappingURL=app_module.controller.js.map