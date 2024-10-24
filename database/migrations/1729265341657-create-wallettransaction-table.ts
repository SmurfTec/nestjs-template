import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createWalletTransactionsTable1729265341657
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallet_transactions',
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
            name: 'wallet',
            type: 'int4',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('wallet_transactions', [
      new TableForeignKey({
        name: 'wallet_transactions_wallets_fk1',
        columnNames: ['wallet'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'wallet_transactions',
      'wallet_transactions_wallets_fk1',
    );
    await queryRunner.dropTable('wallet_transactions', true);
  }
}
