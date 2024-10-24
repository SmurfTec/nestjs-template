"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDealStatusesTable1729265341640 = void 0;
const typeorm_1 = require("typeorm");
class createDealStatusesTable1729265341640 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'deal_statuses',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_on',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'updated_on',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('deal_statuses', true);
    }
}
exports.createDealStatusesTable1729265341640 = createDealStatusesTable1729265341640;
//# sourceMappingURL=1729265341640-create-dealstatus-table.js.map