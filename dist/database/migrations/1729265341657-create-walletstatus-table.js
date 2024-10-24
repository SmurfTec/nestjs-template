"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletStatusesTable1729265341657 = void 0;
const typeorm_1 = require("typeorm");
class createWalletStatusesTable1729265341657 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'wallet_statuses',
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
        await queryRunner.dropTable('wallet_statuses', true);
    }
}
exports.createWalletStatusesTable1729265341657 = createWalletStatusesTable1729265341657;
//# sourceMappingURL=1729265341657-create-walletstatus-table.js.map