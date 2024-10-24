"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataSource = void 0;
const typeorm_1 = require("typeorm");
const typeorm_config_1 = require("./typeorm.config");
exports.getDataSource = (() => {
    const dataSource = new typeorm_1.DataSource(typeorm_config_1.databaseConfigurations);
    return dataSource;
})();
//# sourceMappingURL=typeorm.datasource.js.map