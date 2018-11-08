import { getPosts } from "./service";
import {
  GQLResolver,
  MutationToCreatePostArgs,
  GQLPost
} from "src/types/schema";

export const postResolvers: GQLResolver = {
  Query: {
    posts() {
      return getPosts();
    }
  },
  Mutation: {
    createPost(parent: any, args: MutationToCreatePostArgs): GQLPost {
      console.log(args);

      return getPosts()[0];
    }
  }
};
