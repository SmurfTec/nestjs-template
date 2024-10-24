"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_module_1 = require("../infrastructure/common/caching/cache-manager.module");
const environment_config_service_1 = require("../infrastructure/config/environment-config/environment-config.service");
const bcrypt_service_1 = require("../infrastructure/services/bcrypt/bcrypt.service");
const jwt_service_1 = require("../infrastructure/services/jwt/jwt.service");
const authorization_usecases_1 = require("./auth/authorization.usecases");
const is_authenticated_usecases_1 = require("./auth/is-authenticated.usecases");
const login_usecases_1 = require("./auth/login.usecases");
const logout_usecases_1 = require("./auth/logout.usecases");
const permission_usecases_1 = require("./auth/permission.usecases");
const user_usecases_1 = require("./user/user.usecases");
const app_module_usecases_1 = require("./app_module/app_module.usecases");
const app_module_permissions_usecases_1 = require("./app_module_permissions/app_module_permissions.usecases");
const repository_module_1 = require("../infrastructure/repository/repository.module");
const profile_usecases_1 = require("./profile/profile.usecases");
const notifications_usecases_1 = require("./notification/notifications.usecases");
const usernotifications_usecases_1 = require("./usernotification/usernotifications.usecases");
const email_module_1 = require("../infrastructure/services/emails/email.module");
const nestjs_stripe_1 = require("nestjs-stripe");
const configService = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
let UseCaseModule = class UseCaseModule {
};
UseCaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_stripe_1.StripeModule.forRoot({
                apiKey: configService.getStripeSecretKey(),
                apiVersion: '2022-11-15',
            }),
            repository_module_1.RepositoryModule,
            cache_manager_module_1.CacheMangerModule,
            email_module_1.EmailModule,
        ],
        providers: [
            app_module_usecases_1.AppModulesUseCases,
            app_module_permissions_usecases_1.AppModulePermissionsUseCases,
            user_usecases_1.UserUseCases,
            is_authenticated_usecases_1.IsAuthenticatedUseCases,
            login_usecases_1.LoginUseCases,
            logout_usecases_1.LogoutUseCases,
            jwt_service_1.JwtTokenService,
            environment_config_service_1.EnvironmentConfigService,
            bcrypt_service_1.BcryptService,
            jwt_1.JwtService,
            config_1.ConfigService,
            permission_usecases_1.PermissionsUseCases,
            authorization_usecases_1.AuthorizationUseCases,
            profile_usecases_1.ProfilesUseCases,
            notifications_usecases_1.NotificationsUseCases,
            usernotifications_usecases_1.UserNotificationsUseCases,
        ],
        exports: [
            app_module_usecases_1.AppModulesUseCases,
            app_module_permissions_usecases_1.AppModulePermissionsUseCases,
            user_usecases_1.UserUseCases,
            is_authenticated_usecases_1.IsAuthenticatedUseCases,
            login_usecases_1.LoginUseCases,
            logout_usecases_1.LogoutUseCases,
            jwt_service_1.JwtTokenService,
            environment_config_service_1.EnvironmentConfigService,
            bcrypt_service_1.BcryptService,
            jwt_1.JwtService,
            config_1.ConfigService,
            permission_usecases_1.PermissionsUseCases,
            authorization_usecases_1.AuthorizationUseCases,
            profile_usecases_1.ProfilesUseCases,
            notifications_usecases_1.NotificationsUseCases,
            usernotifications_usecases_1.UserNotificationsUseCases,
        ],
    })
], UseCaseModule);
exports.UseCaseModule = UseCaseModule;
//# sourceMappingURL=usecase.module.js.map