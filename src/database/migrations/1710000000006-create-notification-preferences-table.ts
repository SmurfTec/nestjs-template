import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNotificationPreferencesTable1710000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_preferences',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'email_alerts',
            type: 'boolean',
            default: true,
          },
          {
            name: 'push_notifications',
            type: 'boolean',
            default: true,
          },
          {
            name: 'in_app_digest',
            type: 'boolean',
            default: true,
          },
          {
            name: 'marketing_emails',
            type: 'boolean',
            default: false,
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
        indices: [
          {
            name: 'UQ_notification_preferences_user_id',
            columnNames: ['user_id'],
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notification_preferences');
  }
}
