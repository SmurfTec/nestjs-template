import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOnboardingTable1710000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'onboarding',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['SELLER', 'AGENCY', 'ADMIN'], // Example values — replace with your OnboardingType enum values
          },
          {
            name: 'state',
            type: 'enum',
            enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], // Example values — replace with your OnboardingState enum values
            default: `'NOT_STARTED'`,
          },
          {
            name: 'personal_details',
            type: 'jsonb',
            isNullable: true,
          },
          {
            name: 'is_active',
            type: 'bool',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('onboarding');
  }
}
