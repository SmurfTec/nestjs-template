"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConstraintToUserNotificationColumn1688472580859 = void 0;
class addConstraintToUserNotificationColumn1688472580859 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE user_notifications ADD CONSTRAINT notifcations_users_notifications_unique_index UNIQUE ("user", "notification");');
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE user_notifications
    DROP CONSTRAINT notifcations_users_notifications_unique_index;`);
    }
}
exports.addConstraintToUserNotificationColumn1688472580859 = addConstraintToUserNotificationColumn1688472580859;
//# sourceMappingURL=1688472580859-add-constraint-to-user-notification-column.js.map