import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from "type-graphql";
import { getPosts, createPost, getTags } from "./service";
import { Post, PostInput } from "./model";

@Resolver(Post)
export class PostResolver {
  @Query(returns => [Post])
  posts() {
    return getPosts();
  }

  @Mutation(returns => Post)
  createPost(@Arg("post", type => PostInput)
  {
    text,
    tags
  }: PostInput): Promise<Post> {
    return createPost(text, tags);
  }
  @FieldResolver()
  tags(@Root() post: Post) {
    return getTags(post.id);
  }
  @FieldResolver()
  comments(@Root() post: Post) {
    return [];
  }
}
