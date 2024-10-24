import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProfilesTable1679659383923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles', true);
  }
}
