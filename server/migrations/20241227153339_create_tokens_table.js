exports.up = function (knex) {
    return knex.schema.createTable('tokens', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.integer('otp').notNullable();
        table.string('otp_expiration').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tokens');
};
