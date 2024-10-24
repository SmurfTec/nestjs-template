"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSeenColumnToUserNotificationsTable1688444738100 = void 0;
const typeorm_1 = require("typeorm");
class addSeenColumnToUserNotificationsTable1688444738100 {
    async up(queryRunner) {
        const seenColumn = new typeorm_1.TableColumn({
            name: 'seen',
            type: 'bool',
            default: false,
        });
        await queryRunner.addColumns('user_notifications', [seenColumn]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('user_notifications', ['seen']);
    }
}
exports.addSeenColumnToUserNotificationsTable1688444738100 = addSeenColumnToUserNotificationsTable1688444738100;
//# sourceMappingURL=1688444738100-add-seen-column-to-user-notifications-table.js.map