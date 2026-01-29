import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStripeCustomerIdToUsers1710000000048
  implements MigrationInterface
{
  name = 'AddStripeCustomerIdToUsers1710000000048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN "stripe_customer_id" TEXT
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_users_stripe_customer_id"
      ON "users" ("stripe_customer_id")
      WHERE "stripe_customer_id" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "IDX_users_stripe_customer_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "stripe_customer_id"
    `);
  }
}
