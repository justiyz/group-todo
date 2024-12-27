exports.up = function(knex) {
    return knex.schema.createTable('sprints', (table) => {
      table.increments('id').primary();
      table.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
      table.text('content').notNullable();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sprints');
  };
  