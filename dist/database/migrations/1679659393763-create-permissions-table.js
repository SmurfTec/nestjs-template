"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPermissionsTable1679659393763 = void 0;
const typeorm_1 = require("typeorm");
class createPermissionsTable1679659393763 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth_permissions',
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
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('auth_permissions', true);
    }
}
exports.createPermissionsTable1679659393763 = createPermissionsTable1679659393763;
//# sourceMappingURL=1679659393763-create-permissions-table.js.map