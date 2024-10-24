"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
const auth_permissions_entity_1 = require("./auth-permissions.entity");
const auth_role_permissions_entity_1 = require("./auth-role-permissions.entity");
const auth_roles_entity_1 = require("./auth-roles.entity");
const auth_user_permissions_entity_1 = require("./auth-user-permissions.entity");
const auth_user_roles_entity_1 = require("./auth-user-roles.entity");
const app_module_entity_1 = require("./app_module.entity");
const app_module_permissions_entity_1 = require("./app_module_permissions.entity");
const profile_entity_1 = require("./profile.entity");
const notification_entity_1 = require("./notification.entity");
const usernotification_entity_1 = require("./usernotification.entity");
exports.default = [
    notification_entity_1.Notifications,
    usernotification_entity_1.UserNotifications,
    app_module_entity_1.AppModules,
    app_module_permissions_entity_1.AppModulePermissions,
    user_entity_1.Users,
    auth_permissions_entity_1.AuthPermissions,
    auth_role_permissions_entity_1.AuthRolePermissions,
    auth_roles_entity_1.AuthRoles,
    auth_user_permissions_entity_1.AuthUserPermissions,
    auth_user_roles_entity_1.AuthUserRoles,
    profile_entity_1.Profiles,
    notification_entity_1.Notifications,
    usernotification_entity_1.UserNotifications,
];
//# sourceMappingURL=db.js.map