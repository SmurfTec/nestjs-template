import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUsernotificationsTable1679670155769
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_notifications',
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
            name: 'is_active',
            type: 'bool',
            default: true,
          },
          {
            name: 'user',
            type: 'int4',
            isNullable: true,
            default: null,
          },
          {
            name: 'notification',
            type: 'int4',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('user_notifications', [
      new TableForeignKey({
        name: 'user_notifications_users_fk1',
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'user_notifications_notifications_fk2',
        columnNames: ['notification'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notifications',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'user_notifications',
      'user_notifications_users_fk1',
    );
    await queryRunner.dropForeignKey(
      'user_notifications',
      'user_notifications_notifications_fk2',
    );
    await queryRunner.dropTable('user_notifications', true);
  }
}
