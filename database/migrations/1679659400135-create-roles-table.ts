import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createRolesTable1679659400135 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth_roles',
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
            isNullable: true,
          },
          {
            name: 'parent_role',
            type: 'varchar',
            length: '50',
            isNullable: true,
            default: null,
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

    await queryRunner.createForeignKey(
      'auth_roles',
      new TableForeignKey({
        name: 'auth_role_user_fk1',
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('auth_roles', 'auth_role_user_fk1');
    await queryRunner.dropTable('auth_roles', true);
  }
}
