"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConfigurations = void 0;
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const fs_1 = require("fs");
const environment_config_service_1 = require("../environment-config/environment-config.service");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
exports.kafkaConfigurations = {
    transport: microservices_1.Transport.KAFKA,
    options: {
        client: {
            brokers: ['172.29.126.20:9092'],
            ssl: {
                rejectUnauthorized: false,
                ca: [(0, fs_1.readFileSync)('src/ssl-files/ca.crt', 'utf-8')],
                key: (0, fs_1.readFileSync)('src/ssl-files/client-key.pem', 'utf-8'),
                cert: (0, fs_1.readFileSync)('src/ssl-files/client-cert.pem', 'utf-8'),
            },
        },
    },
};
//# sourceMappingURL=kafka.config.js.map