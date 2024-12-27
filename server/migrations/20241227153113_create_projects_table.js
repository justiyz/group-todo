exports.up = function(knex) {
    return knex.schema.createTable('projects', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('organization_id').unsigned().references('id').inTable('organizations').onDelete('CASCADE');
      table.text('description').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
  };
  