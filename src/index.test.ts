import * as supertest from "supertest";
import { createApp } from "./";

async function createClient() {
  const app = await createApp();
  return supertest(app.callback());
}

describe("posts resource", () => {
  describe("when all posts are fetched", () => {
    let response: supertest.Response;
    beforeEach(async () => {
      const client = await createClient();
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
            { id: 1, comments: [], text: "moi", tags: [] },
            { id: 2, comments: [], text: "moi", tags: [] }
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
    it("lists responds with all existing posts", async () => {
      expect(response.body).toEqual({
        data: { createPost: { tags: [{ text: "foo" }], text: "Hello world" } }
      });
    });
  });
});
