const API = import.meta.env.VITE_API_URL;

export async function listEducation() {
  const res = await fetch(`${API}/api/education`);
  return res.json();
}

export async function createEducation(education, token) {
  const res = await fetch(`${API}/api/education`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(education),
  });
  return res.json();
}

export async function updateEducation(id, education, token) {
  const res = await fetch(`${API}/api/education/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(education),
  });
  return res.json();
}

export async function deleteEducation(id, token) {
  const res = await fetch(`${API}/api/education/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res.json();
}
