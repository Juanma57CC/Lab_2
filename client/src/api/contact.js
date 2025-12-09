const API = import.meta.env.VITE_API_URL;

export async function createContact(message) {
  const res = await fetch(`${API}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  return res.json();
}

export async function listContacts(token) {
  const res = await fetch(`${API}/api/contact`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res.json();
}

export async function deleteContact(id, token) {
  const res = await fetch(`${API}/api/contact/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res.json();
}