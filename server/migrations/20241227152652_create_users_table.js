exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Primary key
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true); // created_at and updated_at with default `now()`
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  