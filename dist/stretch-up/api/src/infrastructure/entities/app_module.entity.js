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
exports.AppModules = void 0;
const typeorm_1 = require("typeorm");
const app_module_permissions_entity_1 = require("./app_module_permissions.entity");
let AppModules = class AppModules {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppModules.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], AppModules.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], AppModules.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => app_module_permissions_entity_1.AppModulePermissions, (appModulePermissions) => appModulePermissions.app_module),
    __metadata("design:type", Array)
], AppModules.prototype, "appModulePermissions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'date' }),
    __metadata("design:type", Date)
], AppModules.prototype, "created_on", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'date' }),
    __metadata("design:type", Date)
], AppModules.prototype, "updated_on", void 0);
AppModules = __decorate([
    (0, typeorm_1.Entity)()
], AppModules);
exports.AppModules = AppModules;
//# sourceMappingURL=app_module.entity.js.map