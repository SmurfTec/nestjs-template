"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeDefaultCredentials1679659519425 = void 0;
const bcrypt = require("bcrypt");
class changeDefaultCredentials1679659519425 {
    async up(queryRunner) {
        const password = await bcrypt.hash('admin', 10);
        queryRunner.query(`UPDATE users SET email='admin@tes.com.pk', "password"='${password}' WHERE id=1;`);
    }
    async down(queryRunner) {
        queryRunner.query(`UPDATE users SET email='admin' WHERE id=1;`);
    }
}
exports.changeDefaultCredentials1679659519425 = changeDefaultCredentials1679659519425;
//# sourceMappingURL=1679659519425-change-default-credentials.js.map