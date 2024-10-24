"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationPreferencesTable1729265341665 = void 0;
const typeorm_1 = require("typeorm");
class createNotificationPreferencesTable1729265341665 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'notification_preferences',
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
                    name: 'category',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'allow_email',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'allow_push',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'user',
                    type: 'int4',
                },
            ],
        }));
        await queryRunner.createForeignKeys('notification_preferences', [
            new typeorm_1.TableForeignKey({
                name: 'notification_preferences_users_fk1',
                columnNames: ['user'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('notification_preferences', 'notification_preferences_users_fk1');
        await queryRunner.dropTable('notification_preferences', true);
    }
}
exports.createNotificationPreferencesTable1729265341665 = createNotificationPreferencesTable1729265341665;
//# sourceMappingURL=1729265341665-create-notificationpreference-table.js.map