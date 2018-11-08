require("app-module-path").addPath(require("path").join(__dirname, "../"));
import "reflect-metadata";
import * as Koa from "koa";
import * as mount from "koa-mount";

const graphqlHTTP = require("koa-graphql");

const app = new Koa();

import { buildSchema } from "type-graphql";
import { PostResolver } from "src/features/posts/resolvers";

export async function createApp() {
  const schema = await buildSchema({
    resolvers: [PostResolver]
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
