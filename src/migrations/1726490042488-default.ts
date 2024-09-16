import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1726490042488 implements MigrationInterface {
    name = 'Default1726490042488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" ADD "code" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rooms" DROP COLUMN "code"`);
    }

}
