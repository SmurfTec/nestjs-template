"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttachmentsTable1683373416835 = void 0;
const typeorm_1 = require("typeorm");
class createAttachmentsTable1683373416835 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'attachments',
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
                    name: 'url',
                    type: 'varchar',
                },
                {
                    name: 'filename',
                    type: 'varchar',
                },
                {
                    name: 'mime_type',
                    type: 'varchar',
                },
                {
                    name: 'size',
                    type: 'int',
                },
                {
                    name: 'resource_id',
                    type: 'int4',
                },
                {
                    name: 'table',
                    type: 'varchar',
                },
                {
                    name: 'type_of',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('attachments', true);
    }
}
exports.createAttachmentsTable1683373416835 = createAttachmentsTable1683373416835;
//# sourceMappingURL=1683373416835-create-attachment-table.js.map