"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateusertable1729265341668 = void 0;
class updateusertable1729265341668 {
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
exports.updateusertable1729265341668 = updateusertable1729265341668;
//# sourceMappingURL=1729265341667-update-profile-table.js.map