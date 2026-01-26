import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAuditEventsTable1710000000030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum type for event_type
    await queryRunner.query(`
      CREATE TYPE "audit_event_type_enum" AS ENUM (
        'LOGIN',
        'LOGOUT',
        'CREATE',
        'UPDATE',
        'DELETE',
        'ACCESS',
        'OTHER'
      );
    `);

    // Create audit_events table
    await queryRunner.createTable(
      new Table({
        name: 'audit_events',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int4',
            isNullable: false,
          },
          {
            name: 'event_type',
            type: '"audit_event_type_enum"',
            isNullable: false,
          },
          {
            name: 'event_data',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'ip_address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_agent',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'timestamp',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Add indexes
    await queryRunner.createIndex(
      'audit_events',
      new TableIndex({
        name: 'IDX_audit_events_user_id_timestamp',
        columnNames: ['user_id', 'timestamp'],
      }),
    );

    await queryRunner.createIndex(
      'audit_events',
      new TableIndex({
        name: 'IDX_audit_events_event_type_timestamp',
        columnNames: ['event_type', 'timestamp'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes first
    await queryRunner.dropIndex('audit_events', 'IDX_audit_events_user_id_timestamp');
    await queryRunner.dropIndex('audit_events', 'IDX_audit_events_event_type_timestamp');

    // Drop table
    await queryRunner.dropTable('audit_events');

    // Drop enum type
    await queryRunner.query(`DROP TYPE "audit_event_type_enum";`);
  }
}
