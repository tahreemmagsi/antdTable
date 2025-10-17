import axios from "axios";
import type { Post } from "../types";

const STORAGE_KEY = "posts_data";

export const fetchPosts = async (): Promise<Post[]> => {

  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts = data.slice(0, 10).map((p: any) => ({
    id: p.id,
    userId: p.userId,
    title: p.title,
    body: p.body,
    category: "Tech",
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 50),
    status: "Published",
    author: "John Doe",
    date: "2025-10-10",
    priority: "Medium",
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts;
};

export const updatePost = (updated: Post) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const posts: Post[] = JSON.parse(stored).map((p:any) =>
    p.id === updated.id ? updated : p
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};
