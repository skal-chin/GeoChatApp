import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddChatRoom1647571223211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name : 'chat_room',
          columns : [
            {
              name : 'id',
              type : 'int',
              isPrimary : true,
              isGenerated : true,
            },
            {
              name : 'name',
              type : 'text',
            },
            {
              name : 'key',
              type : 'text',
            },
            {
              name : 'longitude',
              type : 'float',
            },
            {
              name : 'latitude',
              type : 'float',
            },
            {
              name : 'owner',
              type : 'text'
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('chat_room');
    }

}
