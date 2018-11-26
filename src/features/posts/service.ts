import { TagInput, Post } from "./model";
import { knex } from "src/database";

export function getPosts() {
  return knex.select("*").from("posts");
}

export async function getPostTagsUsingPostIds(postIds: number[]) {
  const tags = await knex
    .select("*")
    .from("tags")
    .whereIn("post_id", postIds);

  return postIds.map(postId =>
    tags.filter(({ post_id }: { post_id: number }) => post_id === postId)
  );
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
