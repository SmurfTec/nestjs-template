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
exports.AppModulePermissions = void 0;
const typeorm_1 = require("typeorm");
const app_module_entity_1 = require("./app_module.entity");
const auth_permissions_entity_1 = require("./auth-permissions.entity");
let AppModulePermissions = class AppModulePermissions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppModulePermissions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => app_module_entity_1.AppModules, (appModule) => appModule.appModulePermissions),
    (0, typeorm_1.JoinColumn)({ name: 'app_module' }),
    __metadata("design:type", Number)
], AppModulePermissions.prototype, "app_module", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_permissions_entity_1.AuthPermissions, (authPermissions) => authPermissions.appModulePermissions),
    (0, typeorm_1.JoinColumn)({ name: 'permission' }),
    __metadata("design:type", String)
], AppModulePermissions.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", Date)
], AppModulePermissions.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'date' }),
    __metadata("design:type", Date)
], AppModulePermissions.prototype, "updated_on", void 0);
AppModulePermissions = __decorate([
    (0, typeorm_1.Entity)()
], AppModulePermissions);
exports.AppModulePermissions = AppModulePermissions;
//# sourceMappingURL=app_module_permissions.entity.js.map