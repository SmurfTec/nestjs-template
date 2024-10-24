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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModulesUseCases = void 0;
const common_1 = require("@nestjs/common");
const app_module_repository_1 = require("../../infrastructure/repository/app_module.repository");
const auth_permissions_repository_1 = require("../../infrastructure/repository/auth-permissions.repository");
let AppModulesUseCases = class AppModulesUseCases {
    constructor(appModulesRepository, authPermissionsRepository) {
        this.appModulesRepository = appModulesRepository;
        this.authPermissionsRepository = authPermissionsRepository;
    }
    async createAppModule(appModuleModel) {
        return {
            data: Object.assign(Object.assign({}, (await this.appModulesRepository.createAppModule(appModuleModel))), { permissions: [] }),
        };
    }
    async getAppModule(id) {
        const data = await this.appModulesRepository.getAppModule(id);
        if (!data) {
            throw new common_1.HttpException('AppModule Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data };
    }
    async getAppModulePermissions(id) {
        const app_module = await this.appModulesRepository.getAppModule(id);
        const data = await this.authPermissionsRepository.getPermissions();
        if (!app_module) {
            throw new common_1.HttpException('AppModule Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        const permissions = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].app_module['id'] === id) {
                delete data[i].app_module;
                permissions.push(Object.assign({}, data[i]));
            }
        }
        return {
            data: Object.assign(Object.assign({}, app_module), { permissions }),
        };
    }
    async getAppModules() {
        const app_modules = await this.appModulesRepository.getAppModules();
        const permissions = await this.authPermissionsRepository.getPermissions();
        const data = [];
        let allPermissions = [];
        for (let i = 0; i < app_modules.length; i++) {
            for (let j = 0; j < permissions.length; j++) {
                if (permissions[j].app_module['id'] === app_modules[i].id) {
                    const _a = permissions[j], { app_module } = _a, rest = __rest(_a, ["app_module"]);
                    allPermissions.push(Object.assign({}, rest));
                }
            }
            data.push(Object.assign(Object.assign({}, app_modules[i]), { permissions: allPermissions }));
            allPermissions = [];
        }
        return {
            data,
        };
    }
    async updateAppModule(id, appModuleUpdateModel) {
        return await this.appModulesRepository.updateAppModule(id, appModuleUpdateModel);
    }
    async deleteAppModule(id) {
        return await this.appModulesRepository.deleteAppModule(id);
    }
};
AppModulesUseCases = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_module_repository_1.AppModulesRepository !== "undefined" && app_module_repository_1.AppModulesRepository) === "function" ? _a : Object, typeof (_b = typeof auth_permissions_repository_1.AuthPermissionsRepository !== "undefined" && auth_permissions_repository_1.AuthPermissionsRepository) === "function" ? _b : Object])
], AppModulesUseCases);
exports.AppModulesUseCases = AppModulesUseCases;
//# sourceMappingURL=app_module.usecases.js.map