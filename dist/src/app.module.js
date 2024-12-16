"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const rabbitmq_module_1 = require("./infrastructure/config/rabbitmq/rabbitmq.module");
const common_1 = require("@nestjs/common");
const typeorm_module_1 = require("./infrastructure/config/typeorm/typeorm.module");
const controller_module_1 = require("./infrastructure/controllers/controller.module");
const bcrypt_module_1 = require("./infrastructure/services/bcrypt/bcrypt.module");
const jwt_module_1 = require("./infrastructure/services/jwt/jwt.module");
const environment_config_module_1 = require("./infrastructure/config/environment-config/environment-config.module");
const gateway_module_1 = require("./infrastructure/gateways/gateway.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const email_module_1 = require("./infrastructure/services/emails/email.module");
const tasks_module_1 = require("./infrastructure/common/tasks-scheduling/tasks.module");
const notifications_module_1 = require("./infrastructure/services/notifications/notifications.module");
const raw_body_middleware_1 = require("./middlewares/raw-body.middleware");
const json_body_middleware_1 = require("./middlewares/json-body.middleware");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(raw_body_middleware_1.RawBodyMiddleware)
            .forRoutes({
            path: '/wallets/webhook',
            method: common_1.RequestMethod.POST,
        })
            .apply(json_body_middleware_1.JsonBodyMiddleware)
            .forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            tasks_module_1.TasksModule,
            notifications_module_1.NotificationModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../..', 'uploads'),
            }),
            gateway_module_1.GatewayModule,
            rabbitmq_module_1.RabbitMQModule,
            typeorm_module_1.TypeOrmConfigModule,
            controller_module_1.ControllerModule,
            bcrypt_module_1.BcryptModule,
            jwt_module_1.JwtModule,
            bcrypt_module_1.BcryptModule,
            jwt_module_1.JwtModule,
            environment_config_module_1.EnvironmentConfigModule,
            schedule_1.ScheduleModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map