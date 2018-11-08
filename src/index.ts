require("app-module-path").addPath(require("path").join(__dirname, "../"));
import "reflect-metadata";
import * as Koa from "koa";
import * as mount from "koa-mount";

const graphqlHTTP = require("koa-graphql");

const app = new Koa();

import { buildSchema } from "type-graphql";
import { PostResolver } from "src/features/posts/resolvers";

async function start() {
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

  app.listen(4000);
}

start();
