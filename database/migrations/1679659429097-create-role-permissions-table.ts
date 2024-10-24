import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRolePermissionsTable1679659429097
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_role_permissions',
        columns: [
          {
            name: 'permissions',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'role',
            type: 'varchar',
            length: '50',
            isPrimary: true,
          },
          {
            name: 'created_by',
            type: 'int8',
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

    await queryRunner.createForeignKeys('auth_role_permissions', [
      new TableForeignKey({
        name: 'auth_role_permissions_users_fk1',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'auth_role_permissions_auth_permissions_fk2',
        columnNames: ['permissions'],
        referencedColumnNames: ['name'],
        referencedTableName: 'auth_permissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'auth_role_permissions_auth_roles_fk3',
        columnNames: ['role'],
        referencedColumnNames: ['name'],
        referencedTableName: 'auth_roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'auth_role_permissions',
      'auth_role_permissions_users_fk1',
    );
    await queryRunner.dropForeignKey(
      'auth_role_permissions',
      'auth_role_permissions_auth_permissions_fk2',
    );
    await queryRunner.dropForeignKey(
      'auth_role_permissions',
      'auth_role_permissions_auth_roles_fk3',
    );
    await queryRunner.dropTable('auth_role_permissions', true);
  }
}
