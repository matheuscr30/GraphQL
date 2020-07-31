
exports.up = function(knex) {
  return knex.schema.createTable('profiles', table => {
    table.increments('id').primary();
    table.string('name').notNull().unique();
    table.string('tag').notNull();
  }).then(function() {
    return knex('profiles').insert([
      { name: 'user', tag: 'USER' },
      { name: 'admin', tag: 'ADMINISTRATOR' },
      { name: 'master', tag: 'MASTER' }
    ]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profiles');
};
