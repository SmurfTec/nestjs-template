import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUsersTable1679659383925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'signup_otp',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'forget_email_otp',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'signup_otp_expiry',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'forget_email_otp_expiry',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'agent_rera',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_social_login',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_rere_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'upcoming_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'upcoming_email_otp',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'upcoming_email_otp_expiry',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'allow_notifications',
            type: 'boolean',
            default: true,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'last_login',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'hashRefreshToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_banned',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKeys('profiles', [
      new TableForeignKey({
        name: 'profiles_users_fk1',
        columnNames: ['user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    ]);
    await queryRunner.query(`INSERT INTO users
                (id, email, "password", is_active, fullName,  created_on, updated_on)
                 VALUES(1, 'admin@test.com.pk', '$2b$10$.e64HNIXs9.h6VzcgcmNfOEICyUZhdF02r6Wt2AqIRWQruFfuYFQm', true, 'admin', now(),now())
		 `);
    await queryRunner.query(`INSERT INTO profiles
                (id,  "user")
                 VALUES(1, 1)`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('profiles', 'profiles_users_fk1');
    await queryRunner.dropTable('users', true);
  }
}