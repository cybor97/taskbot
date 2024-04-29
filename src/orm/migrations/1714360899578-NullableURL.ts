import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableURL1714360899578 implements MigrationInterface {
    name = 'NullableURL1714360899578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "url" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "url" SET NOT NULL`);
    }

}
