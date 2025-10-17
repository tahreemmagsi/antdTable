export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  address: string;
  city: string;
  country: string;
  status: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  category: string;
  likes: number;
  comments: number;
  status: string;
  author: string;
  date: string;
  priority: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  tag: string;
  isImportant: string;
  replyCount: number;
  sentiment: string;
  source: string;
  language: string;
}
