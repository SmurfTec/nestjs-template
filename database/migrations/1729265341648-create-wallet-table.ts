import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createWalletsTable1729265341626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallets',
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
            name: 'amount',
            type: 'int',
          },
          {
            name: 'bank_name',
            type: 'varchar',
          },
          {
            name: 'full_legal_name',
            type: 'varchar',
          },
          {
            name: 'account_number',
            type: 'varchar',
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallets', true);
  }
}
