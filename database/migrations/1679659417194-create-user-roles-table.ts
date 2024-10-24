import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUserRolesTable1679659417194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_user_roles',
        columns: [
          {
            name: 'user_id',
            type: 'int8',
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
            isNullable: true,
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

    await queryRunner.createForeignKeys('auth_user_roles', [
      new TableForeignKey({
        name: 'auth_user_roles_users_fk1',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'auth_user_roles_auth_roles_fk2',
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
      'auth_user_roles',
      'auth_user_roles_users_fk1',
    );
    await queryRunner.dropForeignKey(
      'auth_user_roles',
      'auth_user_roles_auth_roles_fk2',
    );
    await queryRunner.dropTable('auth_user_roles', true);
  }
}
