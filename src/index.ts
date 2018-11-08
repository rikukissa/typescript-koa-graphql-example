// This line makes absolute imports work (see line 12)
require("app-module-path").addPath(require("path").join(__dirname, "../"));

// Allows type-graphql to do runtime reflection on types (needed for generating the schema)
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import * as Koa from "koa";
import * as mount from "koa-mount";
const graphqlHTTP = require("koa-graphql");

import { PostResolver } from "src/features/posts/resolvers";

const app = new Koa();

export async function createApp() {
  const schema = await buildSchema({
    resolvers: [PostResolver] // all GraphQL resolvers should be defined here
  });

  app.use(
    mount(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        graphiql: true
      })
    )
  );

  return app;
}

if (!module.parent) {
  (async () => {
    const app = await createApp();
    app.listen(4000);
  })();
}
