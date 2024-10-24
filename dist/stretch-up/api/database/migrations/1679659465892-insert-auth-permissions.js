"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAuthPermissions1679659465892 = void 0;
class insertAuthPermissions1679659465892 {
    async up(queryRunner) {
        await queryRunner.query(`insert into auth_permissions values
        ('role.create', 'To create new role.'),
        ('role.permission.create', 'Assign permission to a role.'),
        ('user.permission.create', 'Assign permission to a user.'),
        ('user.role.create', 'Assign role to a user.'),
        ('roles.read', 'Read all roles.'),
        ('permissions.read', 'Read all permissions.'),
        ('user.permissions.read', 'Read all permissions assigned to a user.'),
        ('user.roles.read', 'Read all roles assigned to a user.'),
        ('bids.create', 'Bid on a product or listing');
        `);
        await queryRunner.query(`insert into auth_roles
            ("name", description, parent_role, created_at, created_by)
            VALUES('superadmin', 'It can do any thing.', '', now(), 1),
            ('user', 'For loggedIn User.', '', now(), 1);
        `);
        await queryRunner.query(`insert into auth_role_permissions
            (permissions, role, created_by, created_at)
            VALUES('role.create', 'superadmin',1, now()),
            ('role.permission.create', 'superadmin',1, now()),
            ('user.permission.create', 'superadmin',1, now()),
            ('user.role.create', 'superadmin',1, now()),
            ('roles.read', 'superadmin',1, now()),
            ('permissions.read', 'superadmin',1, now()),
            ('user.permissions.read', 'superadmin',1, now()),
            ('user.roles.read', 'superadmin',1, now()),
            ('bids.create', 'user',1, now())
            ;`);
        await queryRunner.query(`insert into auth_user_roles
            (user_id, role, created_by, created_at)
            VALUES(1, 'superadmin', 1, now());`);
    }
    async down(queryRunner) { }
}
exports.insertAuthPermissions1679659465892 = insertAuthPermissions1679659465892;
//# sourceMappingURL=1679659465892-insert-auth-permissions.js.map