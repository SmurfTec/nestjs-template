import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPermissionsTable1679659393763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_permissions',
        columns: [
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('auth_permissions', true);
  }
}
