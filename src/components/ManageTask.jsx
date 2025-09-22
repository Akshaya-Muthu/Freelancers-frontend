import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash2, X, Check } from "lucide-react";
import SubmittedTasks from "./SubmittedTasks"; // Ensure this file exists

function ManageTask() {
  const [view, setView] = useState("manage"); // "manage" or "submitted"
  const [jobs, setJobs] = useState([]);
  const [tasksByJob, setTasksByJob] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (view !== "manage") return;

    const fetchJobsWithTasks = async () => {
      try {
        setLoading(true);
        const jobsRes = await axios.get("https://freelancer-backend-qu3g.onrender.com/api/jobs/jobs", {
          withCredentials: true,
        });

        const jobsData = jobsRes.data?.jobs || [];
        const jobsWithTasks = [];
        const tasksMap = {};

        for (let job of jobsData) {
          try {
            const taskRes = await axios.get(
              `https://freelancer-backend-qu3g.onrender.com/api/admin/job/${job._id}/tasks`,
              { withCredentials: true }
            );
            const jobTasks = taskRes.data?.tasks || [];
            if (jobTasks.length > 0) {
              jobsWithTasks.push(job);
              tasksMap[job._id] = jobTasks;
            }
          } catch (err) {
            console.warn(`Failed to fetch tasks for job ${job._id}`, err);
          }
        }

        setJobs(jobsWithTasks);
        setTasksByJob(tasksMap);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobsWithTasks();
  }, [view]);

  const handleDelete = async (taskId, jobId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`https://freelancer-backend-qu3g.onrender.com/api/admin/delete-task/${taskId}`, {
        withCredentials: true,
      });
      toast.success("Task deleted successfully!");
      setTasksByJob((prev) => ({
        ...prev,
        [jobId]: prev[jobId]?.filter((task) => task._id !== taskId) || [],
      }));
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task?._id || null);
    setEditForm({ title: task?.title || "", description: task?.description || "" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditForm({ title: "", description: "" });
  };

  const handleSaveEdit = async (taskId, jobId) => {
    try {
      await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/admin/edit-task/${taskId}`,
        { title: editForm.title, description: editForm.description },
        { withCredentials: true }
      );
      toast.success("Task updated successfully!");
      setTasksByJob((prev) => ({
        ...prev,
        [jobId]: prev[jobId]?.map((t) =>
          t._id === taskId ? { ...t, ...editForm } : t
        ) || [],
      }));
      handleCancelEdit();
    } catch {
      toast.error("Failed to update task");
    }
  };

  if (loading && view === "manage") return <p className="p-6">Loading tasks...</p>;

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-emerald-50 min-h-screen">
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView("manage")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            view === "manage"
              ? "bg-emerald-500 text-white"
              : "bg-white text-emerald-700 border border-emerald-500"
          }`}
        >
          Manage Tasks
        </button>
        <button
          onClick={() => setView("submitted")}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            view === "submitted"
              ? "bg-emerald-500 text-white"
              : "bg-white text-emerald-700 border border-emerald-500"
          }`}
        >
          Submitted Tasks
        </button>
      </div>

      {view === "manage" ? (
        <>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-8">
            Manage Tasks
          </h2>

          {jobs.length === 0 ? (
            <p>No jobs with tasks found.</p>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="mb-8 sm:mb-10">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-700 mb-4">
                  {job?.title || "Untitled Job"}
                </h3>
                <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                  <table className="min-w-full text-xs sm:text-sm text-left">
                    <thead className="bg-emerald-100 text-emerald-900">
                      <tr>
                        <th className="px-2 sm:px-4 py-2">#</th>
                        <th className="px-2 sm:px-4 py-2">Task Title</th>
                        <th className="px-2 sm:px-4 py-2">Description</th>
                        <th className="px-2 sm:px-4 py-2">Assigned User</th>
                        <th className="px-2 sm:px-4 py-2 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasksByJob[job._id]?.map((task, index) => (
                        <tr
                          key={task?._id || index}
                          className="border-t hover:bg-gray-50 transition"
                        >
                          <td className="px-2 sm:px-4 py-2">{index + 1}</td>

                          {editingTask === task?._id ? (
                            <>
                              <td className="px-2 sm:px-4 py-2">
                                <input
                                  type="text"
                                  value={editForm.title}
                                  onChange={(e) =>
                                    setEditForm((f) => ({ ...f, title: e.target.value }))
                                  }
                                  className="border px-2 py-1 rounded w-full text-xs sm:text-sm"
                                />
                              </td>
                              <td className="px-2 sm:px-4 py-2">
                                <input
                                  type="text"
                                  value={editForm.description}
                                  onChange={(e) =>
                                    setEditForm((f) => ({ ...f, description: e.target.value }))
                                  }
                                  className="border px-2 py-1 rounded w-full text-xs sm:text-sm"
                                />
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-2 sm:px-4 py-2">{task?.title || "-"}</td>
                              <td className="px-2 sm:px-4 py-2">{task?.description || "-"}</td>
                            </>
                          )}

                          <td className="px-2 sm:px-4 py-2 whitespace-nowrap">
                            {task?.assigned_user_id
                              ? `${task.assigned_user_id.name} (${task.assigned_user_id.email})`
                              : "Unassigned"}
                          </td>

                          <td className="px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 justify-center">
                            {editingTask === task?._id ? (
                              <>
                                <button
                                  onClick={() => handleSaveEdit(task._id, job._id)}
                                  className="p-1 sm:p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="p-1 sm:p-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditClick(task)}
                                  className="p-1 sm:p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => handleDelete(task._id, job._id)}
                                  className="p-1 sm:p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      )) || <tr><td colSpan={5} className="text-center py-4">No tasks found</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </>
      ) : (
        <SubmittedTasks />
      )}
    </div>
  );
}

export default ManageTask;
