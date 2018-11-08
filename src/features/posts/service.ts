import { Tag, Post } from "./model";

const DATABASE: { posts: Post[] } = {
  posts: [
    { id: 1, comments: [], text: "moi", tags: [] },
    { id: 2, comments: [], text: "moi", tags: [] }
  ]
};

export function getPosts() {
  return DATABASE.posts;
}
export function createPost(text: string, tags: Tag[]) {
  const post = { id: Date.now(), comments: [], text, tags };
  DATABASE.posts.push(post);
  return post;
}
