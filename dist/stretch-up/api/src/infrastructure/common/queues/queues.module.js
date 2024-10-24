"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const email_module_1 = require("../../services/emails/email.module");
const queues_consumer_1 = require("./queues.consumer");
const queues_service_1 = require("./queues.service");
const configService = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
let QueueModule = class QueueModule {
};
QueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            email_module_1.EmailModule,
            bull_1.BullModule.forRoot({
                redis: {
                    host: configService.getRedisHost(),
                    port: +configService.getRedisPort(),
                    password: configService.getRedisPassword(),
                },
            }),
            bull_1.BullModule.registerQueue({
                name: 'emails',
            }),
        ],
        providers: [queues_service_1.QueueService, queues_consumer_1.EmailConsumer],
    })
], QueueModule);
exports.QueueModule = QueueModule;
//# sourceMappingURL=queues.module.js.map