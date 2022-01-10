import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1641455432493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" VARCHAR(50) NOT NULL, "email" VARCHAR(355) NOT NULL, "password" VARCHAR(50) NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), PRIMARY KEY ("id")) `);
      await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "title" VARCHAR(50) NOT NULL, "description" VARCHAR(255), "creator" integer NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "uq_username" UNIQUE("username"), CONSTRAINT "uq_email" UNIQUE("email"), CONSTRAINT "pk_id" PRIMARY KEY ("id"))`);
      await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "fk_user" FOREIGN KEY("creator") REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "fk_user"`);
      await queryRunner.query(`DROP TABLE "todos"`);
      await queryRunner.query(`DROP TABLE "users"`);
    }

}
