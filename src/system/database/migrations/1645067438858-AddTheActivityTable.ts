import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTheActivityTable1645067438858 implements MigrationInterface {
  name = 'AddTheActivityTable1645067438858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "activity_entity" ("active" boolean NOT NULL DEFAULT true, "inactivation_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_name" character varying NOT NULL, "created_by_email" character varying NOT NULL, "updated_by_name" character varying NOT NULL, "updated_by_email" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pet_id" uuid, "owner_id" uuid, "activity" character varying NOT NULL, "activity_date" character varying NOT NULL, "activity_hour" character varying NOT NULL, CONSTRAINT "PK_ae8895d1732201c8184c61a24e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "pets_entity" DROP COLUMN "activity"`);
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP COLUMN "activity_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP COLUMN "activity_hour"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_entity" ADD CONSTRAINT "FK_19c981988072f60e5a77af0c676" FOREIGN KEY ("pet_id") REFERENCES "pets_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_entity" ADD CONSTRAINT "FK_592e13c6e8fe8d8d3b0086726da" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_entity" DROP CONSTRAINT "FK_592e13c6e8fe8d8d3b0086726da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_entity" DROP CONSTRAINT "FK_19c981988072f60e5a77af0c676"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "activity_hour" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "activity_date" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "activity" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "activity_entity"`);
  }
}
