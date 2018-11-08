import { getPosts, createPost } from "./service";
import { Post, PostInput } from "./model";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(Post)
export class PostResolver {
  @Query(returns => [Post])
  posts() {
    return getPosts();
  }

  @Mutation()
  createPost(@Arg("post", type => PostInput)
  {
    text,
    tags
  }: PostInput): Post {
    return createPost(text, tags);
  }
}
