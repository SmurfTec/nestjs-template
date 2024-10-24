"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateprofiletable1729265341667 = void 0;
class updateprofiletable1729265341667 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE profiles
    ADD COLUMN phone_otp INTEGER DEFAULT NULL,
    ADD COLUMN phone_otp_expiry TIMESTAMP  DEFAULT NULL;`);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE profiles
      DROP COLUMN phone_otp,
      DROP COLUMN phone_otp_expiry;
    `);
    }
}
exports.updateprofiletable1729265341667 = updateprofiletable1729265341667;
//# sourceMappingURL=1729265341667-update-user-table.js.map