import {
  notificationEnums,
  notificationEnumsArray,
} from 'src/infrastructure/common/enums/notifications.enums';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addTypeColumnToNotificationsTable1688464965367
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const typeColumn = new TableColumn({
      name: 'type',
      type: 'enum',
      enum: notificationEnumsArray,
      default: `'${notificationEnums.ALL}'`,
    });
    await queryRunner.addColumns('notifications', [typeColumn]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('notifications', ['type']);
  }
}
