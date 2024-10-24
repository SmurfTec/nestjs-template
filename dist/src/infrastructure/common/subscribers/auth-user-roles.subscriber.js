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
exports.AuthUserRolesSubscriber = void 0;
const common_1 = require("@nestjs/common");
const auth_user_roles_entity_1 = require("../../entities/auth-user-roles.entity");
const typeorm_1 = require("typeorm");
const cache_enums_1 = require("../enums/cache.enums");
const cache_service_1 = require("../../services/cache.service");
let AuthUserRolesSubscriber = class AuthUserRolesSubscriber {
    constructor(datasource, cacheService) {
        this.datasource = datasource;
        this.cacheService = cacheService;
        this.datasource.subscribers.push(this);
    }
    listenTo() {
        return auth_user_roles_entity_1.AuthUserRoles;
    }
    afterInsert(event) {
        return this.cacheService.deleteByKeyPattern(cache_enums_1.CacheEnums.LOGIN_PERMISSIONS);
    }
};
AuthUserRolesSubscriber = __decorate([
    (0, common_1.Injectable)(),
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        cache_service_1.CacheService])
], AuthUserRolesSubscriber);
exports.AuthUserRolesSubscriber = AuthUserRolesSubscriber;
//# sourceMappingURL=auth-user-roles.subscriber.js.map