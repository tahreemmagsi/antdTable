import axios from "axios";
import type { Comment } from "../types";

const STORAGE_KEY = "comments_data";

export const fetchComments = async (): Promise<Comment[]> => {

  const { data } = await axios.get("https://jsonplaceholder.typicode.com/comments");
  const comments = data.slice(0, 10).map((c: any) => ({
    id: c.id,
    postId: c.postId,
    name: c.name,
    email: c.email,
    body: c.body,
    tag: "General",
    isImportant: "No",
    replyCount: Math.floor(Math.random() * 10),
    sentiment: "Positive",
    source: "Web",
    language: "English",
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  return comments;
};

export const updateComment = (updated: Comment) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  const comments: Comment[] = JSON.parse(stored).map((c:any) =>
    c.id === updated.id ? updated : c
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};
