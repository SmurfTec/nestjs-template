import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class updateprofiletable1729265341668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE profiles
    ADD COLUMN phone_otp INTEGER DEFAULT NULL,
    ADD COLUMN phone_otp_expiry TIMESTAMP  DEFAULT NULL;`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE profiles
      DROP COLUMN phone_otp,
      DROP COLUMN phone_otp_expiry;
    `);
  }
}
