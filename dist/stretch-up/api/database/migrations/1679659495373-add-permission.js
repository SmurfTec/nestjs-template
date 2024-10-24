"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPermission1679659495373 = void 0;
class addPermission1679659495373 {
    async up(queryRunner) {
        await queryRunner.query(`insert into auth_permissions values
        ('role.permissions.read', 'Read all permissions assigned to a role.');
        `);
    }
    async down(queryRunner) { }
}
exports.addPermission1679659495373 = addPermission1679659495373;
//# sourceMappingURL=1679659495373-add-permission.js.map