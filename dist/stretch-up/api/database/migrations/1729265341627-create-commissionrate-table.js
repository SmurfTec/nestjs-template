"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommissionRatesTable1729265341627 = void 0;
const typeorm_1 = require("typeorm");
class createCommissionRatesTable1729265341627 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'commission_rates',
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
                    name: 'percentage',
                    type: 'double precision',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'from_day',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'to_day',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('commission_rates', true);
    }
}
exports.createCommissionRatesTable1729265341627 = createCommissionRatesTable1729265341627;
//# sourceMappingURL=1729265341627-create-commissionrate-table.js.map