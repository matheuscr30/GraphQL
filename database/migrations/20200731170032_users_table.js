
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull().unique();
    table.string('email').notNull().unique();
    table.string('password', 60).notNull();
    table.boolean('active').notNull().defaultTo(true);
    table.timestamp('creation_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
