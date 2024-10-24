import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUserPermissionsTable1679659410680
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_user_permissions',
        columns: [
          {
            name: 'user_id',
            type: 'int8',
            isPrimary: true,
          },
          {
            name: 'permissions',
            type: 'text',
            isPrimary: true,
          },
          {
            name: 'is_allow',
            type: 'bool',
            default: true,
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

    await queryRunner.createForeignKeys('auth_user_permissions', [
      new TableForeignKey({
        name: 'auth_user_permissions_users_fk1',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'auth_user_permissions_auth_permissions_fk2',
        columnNames: ['permissions'],
        referencedColumnNames: ['name'],
        referencedTableName: 'auth_permissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'auth_user_permissions',
      'auth_user_permissions_users_fk1',
    );
    await queryRunner.dropForeignKey(
      'auth_user_permissions',
      'auth_user_permissions_auth_permissions_fk2',
    );
    await queryRunner.dropTable('auth_user_permissions', true);
  }
}
