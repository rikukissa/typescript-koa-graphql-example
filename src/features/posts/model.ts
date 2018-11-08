import { ObjectType, Field, InputType } from "type-graphql";
import { Comment } from "../comments/model";

@ObjectType()
export class Tag {
  @Field() id: number;
  @Field() text: string;
}

@ObjectType()
export class Post {
  @Field() id: number;

  @Field() text: string;

  @Field(type => [Comment])
  comments: Comment[];

  @Field(type => [Tag])
  tags: Tag[];
}

@InputType({ description: "New tag" })
export class TagInput implements Partial<Tag> {
  @Field() text: string;
}

@InputType({ description: "New post data" })
export class PostInput implements Partial<Post> {
  @Field() text: string;

  @Field(type => [TagInput])
  tags: Tag[];
}
