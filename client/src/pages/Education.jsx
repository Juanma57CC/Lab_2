import { useEffect, useState } from 'react';
import auth from '../utils/auth';
import {
  listEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '../api/education';

function Education() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    school: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const jwt = auth.isAuthenticated();
  const isAdmin = jwt && jwt.user && jwt.user.role === 'admin';

  useEffect(() => {
    (async () => {
      const data = await listEducation();
      setItems(Array.isArray(data) ? data : []);
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      description: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAdmin || !jwt) {
      setError('Only admin can modify education.');
      return;
    }

    try {
      const token = jwt.token;
      let result;
      if (editingId) {
        result = await updateEducation(editingId, form, token);
      } else {
        result = await createEducation(form, token);
      }

      if (result.error) {
        setError(result.error);
      } else {
        const data = await listEducation();
        setItems(Array.isArray(data) ? data : []);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError('Failed to save education.');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      school: item.school || '',
      degree: item.degree || '',
      field: item.field || '',
      startYear: item.startYear || '',
      endYear: item.endYear || '',
      description: item.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !jwt) return;
    await deleteEducation(id, jwt.token);
    const data = await listEducation();
    setItems(Array.isArray(data) ? data : []);
  };

  return (
    <section className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Education</h1>

        {isAdmin && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Education' : 'Add Education'}
            </h2>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 md:grid-cols-2"
            >
              <input
                name="school"
                placeholder="School"
                value={form.school}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                name="degree"
                placeholder="Degree"
                value={form.degree}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                name="field"
                placeholder="Field of Study"
                value={form.field}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                name="startYear"
                placeholder="Start Year"
                value={form.startYear}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                name="endYear"
                placeholder="End Year"
                value={form.endYear}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-sm"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-sm md:col-span-2"
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  {editingId ? 'Update' : 'Add'}
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

        <div className="space-y-4">
          {items.map((edu) => (
            <div
              key={edu._id}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-sm text-gray-700">
                  {edu.school} {edu.field ? `· ${edu.field}` : ''}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.startYear} – {edu.endYear || 'Present'}
                </p>
                {edu.description && (
                  <p className="mt-2 text-sm text-gray-700">
                    {edu.description}
                  </p>
                )}
              </div>
              {isAdmin && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="text-xs px-2 py-1 rounded bg-yellow-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="text-xs px-2 py-1 rounded bg-red-100 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-sm text-gray-600">
              No education entries yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Education;