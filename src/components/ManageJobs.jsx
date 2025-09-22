import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX } from "react-icons/fi";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: "",
    category: "",
    status: "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/jobs/jobs", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/jobs/job/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setJobs(jobs.filter((job) => job._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const startEditing = (job) => {
    setEditingJob(job._id);
    setFormData({
      title: job.title,
      description: job.description,
      budget: job.budget,
      deadline: job.deadline.split("T")[0],
      skills: job.skills?.join(", "),
      category: job.category,
      status: job.status,
    });
  };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/jobs/job/${editingJob}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(
          jobs.map((job) =>
            job._id === editingJob ? { ...job, ...data.job } : job
          )
        );
        setEditingJob(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading jobs...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="lg:p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Manage Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
            >
              {editingJob === job._id ? (
                <form onSubmit={updateJob} className="space-y-3">
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                    placeholder="Title"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="border rounded-md p-2 w-full"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                    placeholder="Budget"
                  />
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                  />
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                    placeholder="Skills (comma separated)"
                  />
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                    placeholder="Category"
                  />
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="border rounded-md p-2 w-full"
                  >
                    <option value="">Select status</option>
                    <option value="open">Open</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 text-white px-4 py-1 rounded-md shadow transition-all"
                    >
                      <FiSave /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingJob(null)}
                      className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-md"
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{job.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Budget:</span> ${job.budget}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Deadline:</span>{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Skills:</span>{" "}
                    {job.skills?.join(", ") || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Status:</span> {job.status}
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => startEditing(job)}
                      className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 text-white px-3 py-1 rounded-md shadow transition-all"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageJobs;
