import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createNotificationsTable1679669965317
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
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
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'is_active',
            type: 'bool',
            default: true,
          },
          {
            name: 'resource_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'resource_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'from_user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'from_user_name',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications', true);
  }
}
