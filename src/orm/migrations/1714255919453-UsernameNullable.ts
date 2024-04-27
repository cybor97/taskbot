import { MigrationInterface, QueryRunner } from "typeorm";

export class UsernameNullable1714255919453 implements MigrationInterface {
    name = 'UsernameNullable1714255919453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
    }

}
