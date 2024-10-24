import { MigrationInterface, QueryRunner } from 'typeorm';

export class addConstraintToUserNotificationColumn1688472580859
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE user_notifications ADD CONSTRAINT notifcations_users_notifications_unique_index UNIQUE ("user", "notification");',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user_notifications
    DROP CONSTRAINT notifcations_users_notifications_unique_index;`);
  }
}
