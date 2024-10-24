"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPermissionsTable1679659410680 = void 0;
const typeorm_1 = require("typeorm");
class createUserPermissionsTable1679659410680 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth_user_permissions',
            columns: [
                {
                    name: 'user_id',
                    type: 'int8',
                    isPrimary: true,
                },
                {
                    name: 'permissions',
                    type: 'text',
                    isPrimary: true,
                },
                {
                    name: 'is_allow',
                    type: 'bool',
                    default: true,
                },
                {
                    name: 'created_by',
                    type: 'int8',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
        await queryRunner.createForeignKeys('auth_user_permissions', [
            new typeorm_1.TableForeignKey({
                name: 'auth_user_permissions_users_fk1',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                name: 'auth_user_permissions_auth_permissions_fk2',
                columnNames: ['permissions'],
                referencedColumnNames: ['name'],
                referencedTableName: 'auth_permissions',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('auth_user_permissions', 'auth_user_permissions_users_fk1');
        await queryRunner.dropForeignKey('auth_user_permissions', 'auth_user_permissions_auth_permissions_fk2');
        await queryRunner.dropTable('auth_user_permissions', true);
    }
}
exports.createUserPermissionsTable1679659410680 = createUserPermissionsTable1679659410680;
//# sourceMappingURL=1679659410680-create-user-permissions-table.js.map