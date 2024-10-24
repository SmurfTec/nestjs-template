"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubcriberModule = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_module_1 = require("../../config/rabbitmq/rabbitmq.module");
const cache_manager_module_1 = require("../caching/cache-manager.module");
const rabbitmq_service_1 = require("../../services/rabbitmq.service");
const auth_role_permissions_subscriber_1 = require("./auth-role-permissions.subscriber");
const auth_user_roles_subscriber_1 = require("./auth-user-roles.subscriber");
const entity_subscriber_1 = require("./entity.subscriber");
const validation_subscriber_1 = require("./validation-subscriber");
let SubcriberModule = class SubcriberModule {
};
SubcriberModule = __decorate([
    (0, common_1.Module)({
        imports: [cache_manager_module_1.CacheMangerModule, rabbitmq_module_1.RabbitMQModule],
        providers: [
            entity_subscriber_1.EntitySubscriber,
            auth_role_permissions_subscriber_1.AuthRolePermissionsSubscriber,
            auth_user_roles_subscriber_1.AuthUserRolesSubscriber,
            rabbitmq_service_1.RabbitMQService,
            validation_subscriber_1.ValidationSubscriber,
        ],
        exports: [
            validation_subscriber_1.ValidationSubscriber,
            entity_subscriber_1.EntitySubscriber,
            auth_role_permissions_subscriber_1.AuthRolePermissionsSubscriber,
            auth_user_roles_subscriber_1.AuthUserRolesSubscriber,
        ],
    })
], SubcriberModule);
exports.SubcriberModule = SubcriberModule;
//# sourceMappingURL=subscribers.module.js.map