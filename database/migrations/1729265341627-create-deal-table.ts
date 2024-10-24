import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createDealsTable1729265341627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deals',
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
            name: 'property_name',
            type: 'varchar',
          },
          {
            name: 'property_apartment',
            type: 'varchar',
          },
          {
            name: 'property_area',
            type: 'varchar',
          },
          {
            name: 'property_unit_sale_date',
            type: 'timestamp',
          },
          {
            name: 'developer_name',
            type: 'varchar',
          },
          {
            name: 'developer_commission',
            type: 'int',
          },
          {
            name: 'expected_commission_paydate',
            type: 'timestamp',
          },
          {
            name: 'deal',
            type: 'int4',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('deals', [
      new TableForeignKey({
        name: 'deals_wallets_fk1',
        columnNames: ['deal'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('deals', 'deals_wallets_fk1');
    await queryRunner.dropTable('deals', true);
  }
}
