exports.up = function(knex) {
  return knex.schema.createTable("Users", tbl => {
    tbl.increments();
    tbl
      .text("UserName", 128)
      .unique()
      .notNullable();
    tbl.text("Password", 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Users");
};
