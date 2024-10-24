"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWalletTransactionsTable1729265341657 = void 0;
const typeorm_1 = require("typeorm");
class createWalletTransactionsTable1729265341657 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'wallet_transactions',
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
                    name: 'wallet',
                    type: 'int4',
                },
            ],
        }));
        await queryRunner.createForeignKeys('wallet_transactions', [
            new typeorm_1.TableForeignKey({
                name: 'wallet_transactions_wallets_fk1',
                columnNames: ['wallet'],
                referencedColumnNames: ['id'],
                referencedTableName: 'wallets',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('wallet_transactions', 'wallet_transactions_wallets_fk1');
        await queryRunner.dropTable('wallet_transactions', true);
    }
}
exports.createWalletTransactionsTable1729265341657 = createWalletTransactionsTable1729265341657;
//# sourceMappingURL=1729265341657-create-wallettransaction-table.js.map