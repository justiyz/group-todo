exports.up = function (knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
        table.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.integer('assigner_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.string('title').notNullable();
        table.text('description').nullable();
        table.enum('status', ['todo', 'in-progress', 'test', 'passed', 'failed']).notNullable().defaultTo('todo');
        table.enum('priority', ['low', 'medium', 'high']);
        table.integer('created_by').unsigned().references('id').inTable('users').onDelete('SET NULL');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tasks');
};
