import { Column, MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsersTable1604847484101
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'username',
              type: 'varchar',
            },
            {
              name: 'full_name',
              type: 'varchar',
            },
            {
              name: 'age',
              type: 'int',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'UF',
              length: '2',
              type: 'varchar'
            },
            {
              name: 'city',
              type: 'varchar',
            },
            {
              name: 'cpf',
              type: 'varchar',
              isNullable: true,
              default: null,
            },
            {
              name: 'isInfluencer',
              type: 'bool',
              isNullable: true,
              default: null,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ]
        }
      )
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
