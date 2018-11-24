import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("posts", table => {
    table.increments();
    table.timestamps();
    table.string("text");
  });

  await knex.schema.createTable("tags", table => {
    table.increments();
    table.timestamps();
    table.string("text");
    table.integer("post_id").unsigned();
    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("comments", table => {
    table.increments();
    table.timestamps();
    table.string("text");
    table.integer("post_id").unsigned();
    table
      .foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("posts");
  await knex.schema.dropTable("tags");
  await knex.schema.dropTable("comments");
}
