"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationsTable1679669965317 = void 0;
const typeorm_1 = require("typeorm");
class createNotificationsTable1679669965317 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notifications',
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
                    name: 'message',
                    type: 'varchar',
                },
                {
                    name: 'is_active',
                    type: 'bool',
                    default: true,
                },
                {
                    name: 'resource_name',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'resource_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'from_user_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'from_user_name',
                    type: 'varchar',
                    isNullable: true,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('notifications', true);
    }
}
exports.createNotificationsTable1679669965317 = createNotificationsTable1679669965317;
//# sourceMappingURL=1679669965317-create-notifications-table.js.map