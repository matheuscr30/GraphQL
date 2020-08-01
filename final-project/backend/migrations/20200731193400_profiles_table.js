
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', table => {
    table.increments('id').primary()
    table.string('name').notNull().unique()
    table.string('tag').notNull()
  }).then(function () {
    return knex('profiles').insert([
      { name: 'user', tag: 'User' },
      { name: 'admin', tag: 'Administrator' },
    ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles')
};
