import { MigrationInterface, QueryRunner } from 'typeorm';

export class TotalTables1640118367656 implements MigrationInterface {
  name = 'TotalTables1640118367656';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_entity" ("active" boolean NOT NULL DEFAULT true, "inactivation_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_name" character varying NOT NULL, "created_by_email" character varying NOT NULL, "updated_by_name" character varying NOT NULL, "updated_by_email" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_d9b0d3777428b67f460cf8a9b14" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "owners" ("active" boolean NOT NULL DEFAULT true, "inactivation_date" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_name" character varying NOT NULL, "created_by_email" character varying NOT NULL, "updated_by_name" character varying NOT NULL, "updated_by_email" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid, "owner_name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "owners" ADD CONSTRAINT "FK_f6bd589d3b8a701bf4e96ea9323" FOREIGN KEY ("user_id") REFERENCES "users_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "owners" DROP CONSTRAINT "FK_f6bd589d3b8a701bf4e96ea9323"`,
    );
    await queryRunner.query(`DROP TABLE "owners"`);
    await queryRunner.query(`DROP TABLE "users_entity"`);
  }
}
