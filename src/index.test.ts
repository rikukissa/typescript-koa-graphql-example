import * as supertest from "supertest";
import { createApp } from "./";
import { createPost } from "./features/posts/service";
import { knex } from "./database";

async function createClient() {
  const app = await createApp();
  return supertest(app.callback());
}

async function createTestData() {
  await knex("posts").delete();
  await knex("tags").delete();
  await knex("comments").delete();
  await knex.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE tags_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE comments_id_seq RESTART WITH 1");

  await createPost("My first blogpost", []);
  await createPost("Neat JavaScript tricks", [{ text: "javascript" }]);
}

describe("posts resource", () => {
  describe("when all posts are fetched", () => {
    let response: supertest.Response;
    beforeEach(async () => {
      const client = await createClient();
      await createTestData();
      response = await client.post("/graphql").send({
        query: `
          {
            posts {
              id
              text
              tags {
                id
                text
              }
              comments {
                id
                text
              }
            }
          }
        `
      });
    });
    it("lists responds with all existing posts", async () => {
      expect(response.body).toEqual({
        data: {
          posts: [
            { id: 1, comments: [], text: "My first blogpost", tags: [] },
            {
              id: 2,
              comments: [],
              text: "Neat JavaScript tricks",
              tags: [{ id: 1, text: "javascript" }]
            }
          ]
        }
      });
    });
  });

  describe("when a new post is created", () => {
    let response: supertest.Response;
    beforeEach(async () => {
      const client = await createClient();

      response = await client.post("/graphql").send({
        query: `
          mutation create {
            createPost(post: {
              text: "Hello world",
              tags: [
                {text:"foo"}
              ]
            }) {
              tags {
                text
              }
              text
            }
          }
        `
      });
    });
    it("returns created post", async () => {
      expect(response.body).toEqual({
        data: { createPost: { tags: [{ text: "foo" }], text: "Hello world" } }
      });
    });
  });
});
