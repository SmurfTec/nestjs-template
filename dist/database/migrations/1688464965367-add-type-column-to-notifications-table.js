"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTypeColumnToNotificationsTable1688464965367 = void 0;
const notifications_enums_1 = require("../../src/infrastructure/common/enums/notifications.enums");
const typeorm_1 = require("typeorm");
class addTypeColumnToNotificationsTable1688464965367 {
    async up(queryRunner) {
        const typeColumn = new typeorm_1.TableColumn({
            name: 'type',
            type: 'enum',
            enum: notifications_enums_1.notificationEnumsArray,
            default: `'${notifications_enums_1.notificationEnums.ALL}'`,
        });
        await queryRunner.addColumns('notifications', [typeColumn]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('notifications', ['type']);
    }
}
exports.addTypeColumnToNotificationsTable1688464965367 = addTypeColumnToNotificationsTable1688464965367;
//# sourceMappingURL=1688464965367-add-type-column-to-notifications-table.js.map