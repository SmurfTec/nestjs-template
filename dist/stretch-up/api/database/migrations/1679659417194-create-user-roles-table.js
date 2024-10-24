"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRolesTable1679659417194 = void 0;
const typeorm_1 = require("typeorm");
class createUserRolesTable1679659417194 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth_user_roles',
            columns: [
                {
                    name: 'user_id',
                    type: 'int8',
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
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
        await queryRunner.createForeignKeys('auth_user_roles', [
            new typeorm_1.TableForeignKey({
                name: 'auth_user_roles_users_fk1',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                name: 'auth_user_roles_auth_roles_fk2',
                columnNames: ['role'],
                referencedColumnNames: ['name'],
                referencedTableName: 'auth_roles',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('auth_user_roles', 'auth_user_roles_users_fk1');
        await queryRunner.dropForeignKey('auth_user_roles', 'auth_user_roles_auth_roles_fk2');
        await queryRunner.dropTable('auth_user_roles', true);
    }
}
exports.createUserRolesTable1679659417194 = createUserRolesTable1679659417194;
//# sourceMappingURL=1679659417194-create-user-roles-table.js.map