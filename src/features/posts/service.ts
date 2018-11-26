import { TagInput, Post } from "./model";
import { knex } from "src/database";

export function getPosts() {
  return knex.select("*").from("posts");
}
export function getTags(postId: number) {
  return knex
    .select("*")
    .from("tags")
    .where("post_id", postId);
}
export async function createPost(
  text: string,
  tags: TagInput[]
): Promise<Post> {
  const post = await knex.transaction<Post>(async trx => {
    const [postId] = await knex("posts")
      .transacting(trx)
      .insert({ text })
      .returning("id");

    const storedTags = await Promise.all(
      tags.map(tag =>
        knex("tags")
          .transacting(trx)
          .insert({ text: tag.text, post_id: postId })
          .returning("id")
          .then(([id]) => ({ ...tag, id }))
      )
    );

    return trx.commit({ id: postId, text, tags: storedTags, comments: [] });
  });

  return post;
}
