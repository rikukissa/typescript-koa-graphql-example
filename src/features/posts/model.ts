import { ObjectType, Field } from "type-graphql";
import { Comment } from "../comments/model";

@ObjectType()
export class Tag {
  @Field() id: string;
  @Field() text: string;
}

@ObjectType()
export class Post {
  @Field() id: string;

  @Field() text: string;

  @Field(type => [Comment])
  comments: Comment[];

  @Field(type => [Tag])
  tags: Tag[];
}
