"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfigurations = void 0;
const environment_config_service_1 = require("../environment-config/environment-config.service");
const config_1 = require("@nestjs/config");
const db_1 = require("../../entities/db");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const path = require("path");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
const envPath = path.resolve(__dirname, '../../../../../env/.env');
console.log('envPath typeorm config', envPath);
(0, dotenv_1.config)({ path: envPath });
exports.databaseConfigurations = {
    type: configSerivce.getDatabaseType(),
    port: configSerivce.getDatabasePort(),
    username: configSerivce.getDatabaseUser(),
    password: configSerivce.getDatabasePassword(),
    database: configSerivce.getDatabaseName(),
    synchronize: configSerivce.getDatabaseSync(),
    host: configSerivce.getDatabaseHost(),
    entities: db_1.default,
    cache: false,
    migrations: [(0, path_1.join)(__dirname, '../../../../database/migrations/*{.ts,.js}')],
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map