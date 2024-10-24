"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDealsTable1729265341627 = void 0;
const typeorm_1 = require("typeorm");
class createDealsTable1729265341627 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'deals',
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
                    name: 'property_name',
                    type: 'varchar',
                },
                {
                    name: 'property_apartment',
                    type: 'varchar',
                },
                {
                    name: 'property_area',
                    type: 'varchar',
                },
                {
                    name: 'property_unit_sale_date',
                    type: 'timestamp',
                },
                {
                    name: 'developer_name',
                    type: 'varchar',
                },
                {
                    name: 'developer_commission',
                    type: 'int',
                },
                {
                    name: 'expected_commission_paydate',
                    type: 'timestamp',
                },
                {
                    name: 'deal',
                    type: 'int4',
                },
            ],
        }));
        await queryRunner.createForeignKeys('deals', [
            new typeorm_1.TableForeignKey({
                name: 'deals_wallets_fk1',
                columnNames: ['deal'],
                referencedColumnNames: ['id'],
                referencedTableName: 'wallets',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('deals', 'deals_wallets_fk1');
        await queryRunner.dropTable('deals', true);
    }
}
exports.createDealsTable1729265341627 = createDealsTable1729265341627;
//# sourceMappingURL=1729265341627-create-deal-table.js.map