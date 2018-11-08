import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
  @Field() id: string;

  @Field() text: string;
}
