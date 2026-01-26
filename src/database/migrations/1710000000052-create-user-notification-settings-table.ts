import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateUserNotificationSettingsTable1710000000052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_notification_settings',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email_enabled',
            type: 'bool',
            default: true,
          },
          {
            name: 'push_enabled',
            type: 'bool',
            default: true,
          },
          {
            name: 'sms_enabled',
            type: 'bool',
            default: false,
          },
          {
            name: 'in_app_enabled',
            type: 'bool',
            default: true,
          },
          {
            name: 'quiet_hours',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'preferences',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_notification_settings');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('user_notification_settings', foreignKey);
    }
    await queryRunner.dropTable('user_notification_settings');
  }
}

