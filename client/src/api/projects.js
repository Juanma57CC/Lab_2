const API = import.meta.env.VITE_API_URL;

// Get all projects
export async function listProjects() {
  const res = await fetch(`${API}/api/projects`);
  return res.json();
}

// Create new project (admin)
export async function createProject(project, token) {
  const res = await fetch(`${API}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(project),
  });
  return res.json();
}

// Update existing project (admin)
export async function updateProject(id, project, token) {
  const res = await fetch(`${API}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(project),
  });
  return res.json();
}

// Delete project (admin)
export async function deleteProject(id, token) {
  const res = await fetch(`${API}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.json();
}