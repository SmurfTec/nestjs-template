import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixInvoicesForeignKeys1710000000054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing foreign key constraints if they exist
    // Check if the constraint exists before trying to drop it
    const constraintExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'FK_c1241c6a1e1d92428d4b730c6c4' 
      AND table_name = 'invoices'
    `);

    if (constraintExists && constraintExists.length > 0) {
      await queryRunner.query(`
        ALTER TABLE "invoices" 
        DROP CONSTRAINT IF EXISTS "FK_c1241c6a1e1d92428d4b730c6c4"
      `);
    }

    // Also drop any other foreign keys on owner_id column
    const table = await queryRunner.getTable('invoices');
    if (table) {
      const foreignKeys = table.foreignKeys.filter((fk) =>
        fk.columnNames.includes('owner_id'),
      );
      for (const fk of foreignKeys) {
        try {
          await queryRunner.dropForeignKey('invoices', fk);
        } catch (error) {
          // Constraint might already be dropped, ignore error
          console.log(`Foreign key ${fk.name} might already be dropped:`, error.message);
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // This migration only removes constraints, so down is a no-op
    // Foreign keys are not recreated as this is a polymorphic relationship
  }
}

