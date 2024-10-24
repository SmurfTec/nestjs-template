"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRolePermissionsTable1679659429097 = void 0;
const typeorm_1 = require("typeorm");
class createRolePermissionsTable1679659429097 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth_role_permissions',
            columns: [
                {
                    name: 'permissions',
                    type: 'varchar',
                    length: '50',
                    isPrimary: true,
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '50',
                    isPrimary: true,
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
        await queryRunner.createForeignKeys('auth_role_permissions', [
            new typeorm_1.TableForeignKey({
                name: 'auth_role_permissions_users_fk1',
                columnNames: ['created_by'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                name: 'auth_role_permissions_auth_permissions_fk2',
                columnNames: ['permissions'],
                referencedColumnNames: ['name'],
                referencedTableName: 'auth_permissions',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                name: 'auth_role_permissions_auth_roles_fk3',
                columnNames: ['role'],
                referencedColumnNames: ['name'],
                referencedTableName: 'auth_roles',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('auth_role_permissions', 'auth_role_permissions_users_fk1');
        await queryRunner.dropForeignKey('auth_role_permissions', 'auth_role_permissions_auth_permissions_fk2');
        await queryRunner.dropForeignKey('auth_role_permissions', 'auth_role_permissions_auth_roles_fk3');
        await queryRunner.dropTable('auth_role_permissions', true);
    }
}
exports.createRolePermissionsTable1679659429097 = createRolePermissionsTable1679659429097;
//# sourceMappingURL=1679659429097-create-role-permissions-table.js.map