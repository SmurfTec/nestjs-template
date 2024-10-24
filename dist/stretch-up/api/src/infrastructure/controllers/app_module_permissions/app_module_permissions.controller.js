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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModulePermissionController = void 0;
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../../common/guards/jwtAuth.guard");
const app_module_permissions_usecases_1 = require("../../../usecases/app_module_permissions/app_module_permissions.usecases");
const app_module_permissions_dto_1 = require("./app_module_permissions.dto");
let AppModulePermissionController = class AppModulePermissionController {
    constructor(appModulePermissionUseCases) {
        this.appModulePermissionUseCases = appModulePermissionUseCases;
    }
    createAppModulePermission(appModulePermission) {
        return this.appModulePermissionUseCases.createAppModulePermission(appModulePermission);
    }
    getAppModulePermission(id) {
        return this.appModulePermissionUseCases.getAppModulePermission(id);
    }
    getAppModulePermissions() {
        return this.appModulePermissionUseCases.getAppModulePermissions();
    }
    updateAppModulePermission(id, appModulePermission) {
        return this.appModulePermissionUseCases.updateAppModulePermission(id, appModulePermission);
    }
    deleteAppModulePermission(id) {
        return this.appModulePermissionUseCases.deleteAppModulePermission(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_module_permissions_dto_1.CreateAppModulePermissionDto]),
    __metadata("design:returntype", void 0)
], AppModulePermissionController.prototype, "createAppModulePermission", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppModulePermissionController.prototype, "getAppModulePermission", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppModulePermissionController.prototype, "getAppModulePermissions", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, app_module_permissions_dto_1.UpdateAppModulePermissionDto]),
    __metadata("design:returntype", void 0)
], AppModulePermissionController.prototype, "updateAppModulePermission", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppModulePermissionController.prototype, "deleteAppModulePermission", null);
AppModulePermissionController = __decorate([
    (0, common_1.Controller)('app_modules_permissions'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof app_module_permissions_usecases_1.AppModulePermissionsUseCases !== "undefined" && app_module_permissions_usecases_1.AppModulePermissionsUseCases) === "function" ? _a : Object])
], AppModulePermissionController);
exports.AppModulePermissionController = AppModulePermissionController;
//# sourceMappingURL=app_module_permissions.controller.js.map