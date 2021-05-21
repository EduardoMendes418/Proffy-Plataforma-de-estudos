import Knex from 'knex';

//alteraçoes no banco de dados 
export async function up(knex: Knex){
    
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('cpf').notNullable();
        table.string('email').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// se deu erro como volta 
export async function down(knex: Knex){
    return knex.schema.dropTable('users');

}