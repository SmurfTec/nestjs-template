import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createNotificationPreferencesTable1729265341665
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_preferences',
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
            name: 'category',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'allow_email',
            type: 'boolean',
            default: false,
          },
          {
            name: 'allow_push',
            type: 'boolean',
            default: false,
          },
          {
            name: 'user',
            type: 'int4',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('notification_preferences', [
      new TableForeignKey({
        name: 'notification_preferences_users_fk1',
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'notification_preferences',
      'notification_preferences_users_fk1',
    );
    await queryRunner.dropTable('notification_preferences', true);
  }
}
