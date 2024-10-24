"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfilesTable1679659383923 = void 0;
const typeorm_1 = require("typeorm");
class createProfilesTable1679659383923 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'profiles',
            columns: [
                {
                    name: 'id',
                    type: 'int4',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_on',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'updated_on',
                    type: 'timestamptz',
                    default: 'now()',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'upcoming_phone',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'upcoming_phone_otp',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'upcoming_phone_otp_expiry',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'document_front',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'document_back',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'photo',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'user',
                    type: 'int4',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('profiles', true);
    }
}
exports.createProfilesTable1679659383923 = createProfilesTable1679659383923;
//# sourceMappingURL=1679659383924-create-profile-table.js.map