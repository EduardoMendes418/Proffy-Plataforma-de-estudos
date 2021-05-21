import Knex from 'knex';

//alteraçoes no banco de dados 
export async function up(knex: Knex){
    
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        //ouve uma connection com qual professor
         table.integer('user_id')
         .notNullable()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE');         
         
        //quanto conexao foi criada
        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();

    });
}

// se deu erro como volta 
export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}