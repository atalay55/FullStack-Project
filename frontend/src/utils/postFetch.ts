// src/services/postService.ts
export interface Post {
  id: number;
  userId: number;
  title: string;
}

type Phase = "phase1" | "phase2";

const BASE_URLS: Record<Phase, string> = {
  phase1:"https://jsonplaceholder.typicode.com/posts",
  phase2: "http://localhost:3000/posts",
};

export const fetchPosts = async (phase: Phase): Promise<Post[]> => {
  const res = await fetch(BASE_URLS[phase]);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const addPost = async (phase: Phase,post: Omit<Post, "id">) => {
  const res = await fetch(BASE_URLS[phase], {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
};

export const updatePost = async (phase: Phase,id: number, post: Omit<Post, "id">) => {
  const res = await fetch(`${BASE_URLS[phase]}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
};

export const deletePost = async (phase: Phase,id: number) => {
  const res = await fetch(`${BASE_URLS[phase]}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};
