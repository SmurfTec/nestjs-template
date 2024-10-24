import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class changeDefaultCredentials1679659519425
  implements MigrationInterface

{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin', 10);
    queryRunner.query(
      `UPDATE users SET email='admin@tes.com.pk', "password"='${password}' WHERE id=1;`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`UPDATE users SET email='admin' WHERE id=1;`);
  }
}
