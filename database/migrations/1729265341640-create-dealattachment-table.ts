import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createDealAttachmentsTable1729265341640
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deal_attachments',
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
            name: 'attachment',
            type: 'varchar',
          },
          {
            name: 'resource_id',
            type: 'varchar',
          },
          {
            name: 'deal',
            type: 'int4',
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('deal_attachments', [
      new TableForeignKey({
        name: 'deal_attachments_deals_fk1',
        columnNames: ['deal'],
        referencedColumnNames: ['id'],
        referencedTableName: 'deals',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'deal_attachments',
      'deal_attachments_deals_fk1',
    );
    await queryRunner.dropTable('deal_attachments', true);
  }
}
