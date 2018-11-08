import * as supertest from "supertest";
import { createApp } from "./";

describe("posts resource", () => {
  describe("when all posts are fetched", () => {
    let response: supertest.Response;
    beforeEach(async () => {
      const app = await createApp();
      const request = supertest(app.callback());

      response = await request.post("/graphql").send({
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
            { id: "1", comments: [], text: "moi", tags: [] },
            { id: "2", comments: [], text: "moi", tags: [] }
          ]
        }
      });
    });
  });
  describe("when a new post is created", () => {
    let response: supertest.Response;
    beforeEach(async () => {
      const app = await createApp();
      const request = supertest(app.callback());

      response = await request.post("/graphql").send({
        query: `
          mutation create {
            createPost(text: "moi") { id }
          }
        `
      });
    });
    it("lists responds with all existing posts", async () => {
      expect(response.body).toEqual({ data: { createPost: { id: "1" } } });
    });
  });
});
