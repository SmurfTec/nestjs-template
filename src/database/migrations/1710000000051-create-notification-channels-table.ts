import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateNotificationChannelsTable1710000000051 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notification_channels',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'notification_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'channel',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            isNullable: false,
            default: "'PENDING'",
          },
          {
            name: 'error',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'retry_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'notification_channels',
      new TableIndex({
        name: 'IDX_notification_channels_notification_id',
        columnNames: ['notification_id'],
      }),
    );

    await queryRunner.createIndex(
      'notification_channels',
      new TableIndex({
        name: 'IDX_notification_channels_status_created_at',
        columnNames: ['status', 'created_at'],
      }),
    );

    await queryRunner.createForeignKey(
      'notification_channels',
      new TableForeignKey({
        columnNames: ['notification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notifications',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('notification_channels');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('notification_id') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('notification_channels', foreignKey);
    }
    await queryRunner.dropTable('notification_channels');
  }
}

