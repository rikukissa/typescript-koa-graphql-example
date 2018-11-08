require("app-module-path").addPath(__dirname);
const { importSchema } = require("graphql-import");
const { generateTypeScriptTypes } = require("graphql-schema-typescript");

const { join } = require("path");

generateTypeScriptTypes(
  importSchema("src/schema.graphql"),
  join(__dirname, "./src/types/schema.d.ts")
)
  .then(() => {
    console.log("DONE");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
