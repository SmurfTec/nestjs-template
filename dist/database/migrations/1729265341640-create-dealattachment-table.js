"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDealAttachmentsTable1729265341640 = void 0;
const typeorm_1 = require("typeorm");
class createDealAttachmentsTable1729265341640 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'deal_attachments',
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
                    name: 'attachment',
                    type: 'varchar',
                },
                {
                    name: 'resource_id',
                    type: 'varchar',
                },
                {
                    name: 'deal',
                    type: 'int4',
                },
            ],
        }));
        await queryRunner.createForeignKeys('deal_attachments', [
            new typeorm_1.TableForeignKey({
                name: 'deal_attachments_deals_fk1',
                columnNames: ['deal'],
                referencedColumnNames: ['id'],
                referencedTableName: 'deals',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('deal_attachments', 'deal_attachments_deals_fk1');
        await queryRunner.dropTable('deal_attachments', true);
    }
}
exports.createDealAttachmentsTable1729265341640 = createDealAttachmentsTable1729265341640;
//# sourceMappingURL=1729265341640-create-dealattachment-table.js.map