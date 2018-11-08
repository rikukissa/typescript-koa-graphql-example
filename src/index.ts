require("app-module-path").addPath(require("path").join(__dirname, "../"));

import * as Koa from "koa";
import * as mount from "koa-mount";

const graphqlHTTP = require("koa-graphql");

const app = new Koa();

import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { join } from "path";
import { postResolvers } from "src/features/posts/resolvers";

const typeDefs = importSchema(join(__dirname, "/schema.graphql"));
const resolvers = [postResolvers];

const schema = makeExecutableSchema({ typeDefs, resolvers });

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
