
export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

type Phase = "phase1" | "phase2";

const BASE_URLS: Record<Phase, string> = {
  phase1: "https://jsonplaceholder.typicode.com/users",
  phase2: "http://localhost:3000/users",
};


export const fetchUsers = async (phase: Phase): Promise<User[]> => {
    const res = await fetch(BASE_URLS[phase]);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const addUser = async (phase: Phase,user: Omit<User, "id">) => {
  const res = await fetch(BASE_URLS[phase], {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

export const updateUser = async (phase: Phase,id: number, user: Omit<User, "id">) => {
  const res = await fetch(`${BASE_URLS[phase]}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (phase: Phase,id: number) => {
  const res = await fetch(`${BASE_URLS[phase]}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};
