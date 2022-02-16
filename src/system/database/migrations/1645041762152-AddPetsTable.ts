import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetsTable1645041762152 implements MigrationInterface {
  name = 'AddPetsTable1645041762152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pets_entity" ("active" boolean NOT NULL DEFAULT true, "inactivation_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_name" character varying NOT NULL, "created_by_email" character varying NOT NULL, "updated_by_name" character varying NOT NULL, "updated_by_email" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pet_name" character varying NOT NULL, "owner_id" uuid, "user_id" uuid, "pet_code" character varying NOT NULL, "breed" character varying NOT NULL, "pet_type" character varying NOT NULL, "activity" character varying NOT NULL, "activity_date" character varying NOT NULL, CONSTRAINT "PK_241bfca4ab0da8bdceb82db747c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD CONSTRAINT "FK_07422043e9ce2e1181edc20ddda" FOREIGN KEY ("user_id") REFERENCES "users_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD CONSTRAINT "FK_cc83372b0147603a1b0efb020df" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP CONSTRAINT "FK_cc83372b0147603a1b0efb020df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" DROP CONSTRAINT "FK_07422043e9ce2e1181edc20ddda"`,
    );
    await queryRunner.query(`DROP TABLE "pets_entity"`);
  }
}
