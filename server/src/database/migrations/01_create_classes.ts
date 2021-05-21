import Knex from 'knex';

//alteraçoes no banco de dados 
export async function up(knex: Knex){
    
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //salvar qual usuario daquela aula
         table.integer('user_id')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');         
         
    });
}

// se deu erro como volta 
export async function down(knex: Knex){
    return knex.schema.dropTable('classes');

}