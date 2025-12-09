import { useEffect, useState } from "react";
import projectsStatic from "../content/projects";
import Card from "../components/Card";
import auth from "../utils/auth";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const jwt = auth.isAuthenticated();
  const isAdmin = jwt && jwt.user && jwt.user.role === "admin";

  // Load projects from backend
  useEffect(() => {
    (async () => {
      const data = await listProjects();
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Error loading projects:", data);
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({ title: "", image: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAdmin || !jwt) {
      setError("Only admin can modify projects.");
      return;
    }

    try {
      const token = jwt.token;
      let result;

      if (editingId) {
        result = await updateProject(editingId, form, token);
      } else {
        result = await createProject(form, token);
      }

      if (result.error) {
        setError(result.error);
      } else {
        // Reload list
        const data = await listProjects();
        setProjects(Array.isArray(data) ? data : []);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save project.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setForm({
      title: project.title || "",
      image: project.image || "",
      description: project.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !jwt) return;
    try {
      await deleteProject(id, jwt.token);
      const data = await listProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // Combined list: static + dynamic from DB
  const allProjects = [...projectsStatic, ...projects];

  return (
    <section className="min-h-screen bg-blue-50 px-6 py-12 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        My Projects
      </h1>

      {/* Admin form */}
      {isAdmin && (
        <div className="max-w-3xl mx-auto mb-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Project" : "Add Project"}
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL or Path
                </label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="/project4.jpg or https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 text-sm h-24"
                placeholder="Short description of the project"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700"
              >
                {editingId ? "Update Project" : "Add Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 rounded text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Project cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {allProjects.map((project, index) => (
          <div key={project._id || index} className="relative group">
            <Card
              title={project.title}
              image={project.image}
              description={project.description}
            />
            {isAdmin && project._id && (
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-2 py-1 text-xs rounded bg-yellow-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="px-2 py-1 text-xs rounded bg-red-200 text-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        {allProjects.length === 0 && (
          <p className="text-center text-gray-600 col-span-full">
            No projects yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default Projects;