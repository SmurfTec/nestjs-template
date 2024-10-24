import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPermission1679659495373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into auth_permissions values
        ('role.permissions.read', 'Read all permissions assigned to a role.');
        `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
