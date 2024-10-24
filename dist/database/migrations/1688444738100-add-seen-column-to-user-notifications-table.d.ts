import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class addSeenColumnToUserNotificationsTable1688444738100 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
