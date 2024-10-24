import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createAttachmentsTable1683373416835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attachments',
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
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'filename',
            type: 'varchar',
          },
          {
            name: 'mime_type',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'int',
          },
          {
            name: 'resource_id',
            type: 'int4',
          },
          {
            name: 'table',
            type: 'varchar',
          },
          {
            name: 'type_of',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attachments', true);
  }
}
