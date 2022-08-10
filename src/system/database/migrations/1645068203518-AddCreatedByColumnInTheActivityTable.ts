import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedByColumnInTheActivityTable1645068203518 implements MigrationInterface {
    name = 'AddCreatedByColumnInTheActivityTable1645068203518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_entity" ADD "created_by" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_entity" DROP COLUMN "created_by"`);
    }

}
