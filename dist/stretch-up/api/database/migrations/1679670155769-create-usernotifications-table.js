"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsernotificationsTable1679670155769 = void 0;
const typeorm_1 = require("typeorm");
class createUsernotificationsTable1679670155769 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user_notifications',
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
                    name: 'is_active',
                    type: 'bool',
                    default: true,
                },
                {
                    name: 'user',
                    type: 'int4',
                    isNullable: true,
                    default: null,
                },
                {
                    name: 'notification',
                    type: 'int4',
                    isNullable: true,
                    default: null,
                },
            ],
        }));
        await queryRunner.createForeignKeys('user_notifications', [
            new typeorm_1.TableForeignKey({
                name: 'user_notifications_users_fk1',
                columnNames: ['user'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                name: 'user_notifications_notifications_fk2',
                columnNames: ['notification'],
                referencedColumnNames: ['id'],
                referencedTableName: 'notifications',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('user_notifications', 'user_notifications_users_fk1');
        await queryRunner.dropForeignKey('user_notifications', 'user_notifications_notifications_fk2');
        await queryRunner.dropTable('user_notifications', true);
    }
}
exports.createUsernotificationsTable1679670155769 = createUsernotificationsTable1679670155769;
//# sourceMappingURL=1679670155769-create-usernotifications-table.js.map