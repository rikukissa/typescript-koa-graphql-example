import { getPosts, createPost } from "./service";
import { Post } from "./model";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver(Post)
export class PostResolver {
  @Query(returns => [Post])
  posts() {
    return getPosts();
  }

  @Mutation()
  createPost(@Arg("text") text: string): Post {
    return createPost(text);
  }
}
