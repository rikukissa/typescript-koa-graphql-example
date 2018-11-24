module.exports = {
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    "postgres://ts-graphql:ts-graphql@localhost:5432/ts-graphql"
};
