import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveEagerTrueInTheTables1660179971066
  implements MigrationInterface
{
  name = 'RemoveEagerTrueInTheTables1660179971066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pets_entity" DROP COLUMN "pet_code"`);
    await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "code"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "owners" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pets_entity" ADD "pet_code" character varying NOT NULL`,
    );
  }
}
