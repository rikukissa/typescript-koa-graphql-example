const DATABASE = {
  posts: [
    { id: "1", comments: [], text: "moi", tags: [] },
    { id: "2", comments: [], text: "moi", tags: [] }
  ]
};

export function getPosts() {
  return DATABASE.posts;
}
export function createPost(text: string) {
  return getPosts()[0];
}
