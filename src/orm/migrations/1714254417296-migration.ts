import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTonWalletAndReferralCode1714254417296 implements MigrationInterface {
    name = 'AddTonWalletAndReferralCode1714254417296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "tonWalletId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "referralCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "referralCode"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tonWalletId"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "url"`);
    }

}
