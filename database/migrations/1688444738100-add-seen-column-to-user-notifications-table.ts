import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSeenColumnToUserNotificationsTable1688444738100
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const seenColumn = new TableColumn({
      name: 'seen',
      type: 'bool',
      default: false,
    });
    await queryRunner.addColumns('user_notifications', [seenColumn]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('user_notifications', ['seen']);
  }
}
