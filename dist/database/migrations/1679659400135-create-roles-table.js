"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRolesTable1679659400135 = void 0;
const typeorm_1 = require("typeorm");
class createRolesTable1679659400135 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth_roles',
            columns: [
                {
                    name: 'name',
                    type: 'varchar',
                    length: '50',
                    isPrimary: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'parent_role',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                    default: null,
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
        await queryRunner.createForeignKey('auth_roles', new typeorm_1.TableForeignKey({
            name: 'auth_role_user_fk1',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('auth_roles', 'auth_role_user_fk1');
        await queryRunner.dropTable('auth_roles', true);
    }
}
exports.createRolesTable1679659400135 = createRolesTable1679659400135;
//# sourceMappingURL=1679659400135-create-roles-table.js.map