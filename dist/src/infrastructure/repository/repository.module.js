"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const db_1 = require("../entities/db");
const bcrypt_service_1 = require("../services/bcrypt/bcrypt.service");
const app_module_repository_1 = require("./app_module.repository");
const app_module_permissions_repository_1 = require("./app_module_permissions.repository");
const auth_permissions_repository_1 = require("./auth-permissions.repository");
const auth_role_permissions_repository_1 = require("./auth-role-permissions.repository");
const auth_roles_repository_1 = require("./auth-roles.repository");
const auth_user_permissions_repository_1 = require("./auth-user-permissions.repository");
const auth_user_roles_repository_1 = require("./auth-user-roles.repository");
const notification_repository_1 = require("./notification.repository");
const profile_repository_1 = require("./profile.repository");
const user_repository_1 = require("./user.repository");
const usernotification_repository_1 = require("./usernotification.repository");
const notifications_repository_1 = require("./notifications.repository");
const usernotifications_repository_1 = require("./usernotifications.repository");
let RepositoryModule = class RepositoryModule {
};
RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature(db_1.default)],
        providers: [
            notifications_repository_1.NotificationsRepository,
            usernotifications_repository_1.UserNotificationsRepository,
            usernotification_repository_1.UserNotificationRepository,
            app_module_repository_1.AppModulesRepository,
            app_module_permissions_repository_1.AppModulePermissionsRepository,
            user_repository_1.UserRepository,
            bcrypt_service_1.BcryptService,
            auth_user_roles_repository_1.AuthUserRolesRepository,
            auth_user_permissions_repository_1.AuthUserPermissionsRepository,
            auth_roles_repository_1.AuthRolesRepository,
            auth_role_permissions_repository_1.AuthRolePermissionsRepository,
            auth_permissions_repository_1.AuthPermissionsRepository,
            notification_repository_1.NotificationRepository,
            profile_repository_1.ProfilesRepository,
        ],
        exports: [
            usernotification_repository_1.UserNotificationRepository,
            app_module_repository_1.AppModulesRepository,
            app_module_permissions_repository_1.AppModulePermissionsRepository,
            user_repository_1.UserRepository,
            auth_user_roles_repository_1.AuthUserRolesRepository,
            auth_user_permissions_repository_1.AuthUserPermissionsRepository,
            auth_roles_repository_1.AuthRolesRepository,
            auth_role_permissions_repository_1.AuthRolePermissionsRepository,
            auth_permissions_repository_1.AuthPermissionsRepository,
            notification_repository_1.NotificationRepository,
            profile_repository_1.ProfilesRepository,
            notifications_repository_1.NotificationsRepository,
            usernotifications_repository_1.UserNotificationsRepository,
        ],
    })
], RepositoryModule);
exports.RepositoryModule = RepositoryModule;
//# sourceMappingURL=repository.module.js.map