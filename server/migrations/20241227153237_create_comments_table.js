exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
        table.text('content').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments');
};
