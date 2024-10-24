"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletsTable1729265341626 = void 0;
const typeorm_1 = require("typeorm");
class createWalletsTable1729265341626 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'wallets',
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
                    name: 'amount',
                    type: 'int',
                },
                {
                    name: 'bank_name',
                    type: 'varchar',
                },
                {
                    name: 'full_legal_name',
                    type: 'varchar',
                },
                {
                    name: 'account_number',
                    type: 'varchar',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('wallets', true);
    }
}
exports.createWalletsTable1729265341626 = createWalletsTable1729265341626;
//# sourceMappingURL=1729265341648-create-wallet-table.js.map