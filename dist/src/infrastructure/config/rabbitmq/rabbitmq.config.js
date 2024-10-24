"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQConfigurations = void 0;
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const environment_config_service_1 = require("../environment-config/environment-config.service");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
exports.rabbitMQConfigurations = [
    {
        name: 'RABBITMQ_SERVICE',
        transport: microservices_1.Transport.RMQ,
    },
];
//# sourceMappingURL=rabbitmq.config.js.map