import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTableRelations1645046453916 implements MigrationInterface {
  name = 'AddTableRelations1645046453916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP CONSTRAINT "FK_cc83372b0147603a1b0efb020df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" RENAME COLUMN "owner_id" TO "activity_hour"`,
    );
    await queryRunner.query(`ALTER TABLE "owners" ADD "pet_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP COLUMN "activity_hour"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "activity_hour" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "owners" ADD CONSTRAINT "FK_1c2ea69efba3960316c101eb140" FOREIGN KEY ("pet_id") REFERENCES "pets_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "owners" DROP CONSTRAINT "FK_1c2ea69efba3960316c101eb140"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP COLUMN "activity_hour"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "activity_hour" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "pet_id"`);
    await queryRunner.query(
      `ALTER TABLE "pets_entity" RENAME COLUMN "activity_hour" TO "owner_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD CONSTRAINT "FK_cc83372b0147603a1b0efb020df" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
