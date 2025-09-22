import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircle, XCircle, ClipboardList, Mail, DollarSign, User } from "lucide-react";

function CreateTask() {
  const [jobs, setJobs] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: "", description: "", job_id: "" });
  const [showFormForJob, setShowFormForJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://freelancer-backend-qu3g.onrender.com/api/jobs/inprogressjobs", {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://freelancer-backend-qu3g.onrender.com/api/admin/create-task", taskForm, { withCredentials: true });
      toast.success("Task created successfully!");
      setTaskForm({ title: "", description: "", job_id: "" });
      setShowFormForJob(null);
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mb-6 sm:mb-8 tracking-tight">
        In-Progress Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="relative bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl p-5 sm:p-6 hover:shadow-2xl transition-all duration-300 border border-emerald-100"
          >
           
            <h3 className="text-lg sm:text-xl font-bold text-emerald-900 mb-1">{job.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-3">Status: {job.status}</p>

            
            {job.acceptedBid ? (
              <div className="bg-emerald-50 p-3 sm:p-4 rounded-lg space-y-1 text-emerald-900 text-xs sm:text-sm">
                <p className="flex items-center gap-2"><User size={16} /> {job.acceptedBid.user_id?.name}</p>
                <p className="flex items-center gap-2"><Mail size={16} /> {job.acceptedBid.user_id?.email}</p>
                <p className="flex items-center gap-2"><DollarSign size={16} /> {job.acceptedBid.bid_amount}</p>
              </div>
            ) : (
              <p className="text-red-500 mt-2 text-xs sm:text-sm">No accepted bid found</p>
            )}

            
            <button
              onClick={() =>
                setShowFormForJob(showFormForJob === job._id ? null : job._id)
              }
              className="mt-4 flex items-center justify-center gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base w-full"
            >
              {showFormForJob === job._id ? <XCircle size={18} /> : <PlusCircle size={18} />}
              {showFormForJob === job._id ? "Cancel" : "Create Task"}
            </button>

          
            {showFormForJob === job._id && (
              <form
                onSubmit={handleCreateTask}
                className="mt-4 bg-white p-3 sm:p-4 rounded-xl border border-emerald-100 shadow-inner space-y-3"
              >
                <input
                  type="text"
                  placeholder="Task Title"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={taskForm.job_id === job._id ? taskForm.title : ""}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value, job_id: job._id })
                  }
                  required
                />
                <textarea
                  placeholder="Task Description"
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  value={taskForm.job_id === job._id ? taskForm.description : ""}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value, job_id: job._id })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition text-sm sm:text-base"
                >
                  Save Task
                </button>
              </form>
            )}

           
            {job.tasks && job.tasks.length > 0 && (
              <div className="mt-4 border-t border-gray-200 pt-3">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <ClipboardList size={16} /> Tasks
                </h4>
                <ul className="space-y-1 text-xs sm:text-sm text-gray-600">
                  {job.tasks
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((task, idx) => (
                      <li key={task._id} className="pl-2 border-l-2 border-emerald-400">
                        Task {idx + 1}: {task.title}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTask;
