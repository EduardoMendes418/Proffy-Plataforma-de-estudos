import Knex from 'knex';

//alteraçoes no banco de dados 
export async function up(knex: Knex){
    
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        //horario das aulas 
        table.integer('week_day').notNullable();
        table.integer('from').notNullable;
        table.integer('to').notNullable();

        //realcionamento com outras tabelas
         table.integer('class_id')
         .notNullable()
         .references('id')
         .inTable('classes')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');         
        
    });
}

// se deu erro como volta 
export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');

}