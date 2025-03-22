import { Post } from './posts.data'

type Data = { [key: string]: Post[] };

export function initTags(posts: Post[]): Data {
  const data: Data = {};
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const tags = post.tags;
    if (Array.isArray(tags)) {
      tags.forEach(tag => {
        if (!data[tag]) {
          data[tag] = [];
        }
        data[tag].push(post);
      });
    }
  }
  
  return Object.fromEntries(Object.entries(data).sort());
} 