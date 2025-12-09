// client/src/api/auth.js
const API = import.meta.env.VITE_API_URL;

export async function signup(user) {
  const res = await fetch(`${API}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function signin(credentials) {
  const res = await fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function signout() {
  const res = await fetch(`${API}/auth/signout`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}