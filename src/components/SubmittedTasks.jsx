import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function SubmittedTasks() {
  const [jobs, setJobs] = useState([]);
  const [tasksByJob, setTasksByJob] = useState({});
  const [loading, setLoading] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  const [ratings, setRatings] = useState(0);
  
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
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
            const relevantTasks = taskRes.data?.tasks?.filter(
              (t) => t.status !== "pending"
            ) || [];
            if (relevantTasks.length > 0) {
              jobsWithTasks.push(job);
              tasksMap[job._id] = relevantTasks;
            }
          } catch (err) {
            console.warn(`Failed to fetch tasks for job ${job._id}:`, err);
          }
        }

        setJobs(jobsWithTasks);
        setTasksByJob(tasksMap);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleApprove = async (taskId, jobId) => {
    try {
      await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/admin/approve-task/${taskId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Task approved successfully!");
      setTasksByJob((prev) => ({
        ...prev,
        [jobId]: prev[jobId]?.map((t) =>
          t._id === taskId ? { ...t, status: "approved" } : t
        ) || [],
      }));
    } catch {
      toast.error("Failed to approve task");
    }
  };

  const handleReject = async (taskId, jobId) => {
    try {
      await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/admin/reject-task/${taskId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Task rejected successfully!");
      setTasksByJob((prev) => ({
        ...prev,
        [jobId]: prev[jobId]?.map((t) =>
          t._id === taskId ? { ...t, status: "rejected" } : t
        ) || [],
      }));
    } catch {
      toast.error("Failed to reject task");
    }
  };

  const handleMarkComplete = (job) => {
    console.log(job);
    setSelectedJob(job);
    setRatings(0);
    setComment("");
  };


  const handleSubmitReview = async () => {
    if (!ratings || ratings < 1 || ratings > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setReviewLoading(true);

    try {
      
       const jobsRes =  await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/jobs/job/${selectedJob}/complete`,
        {},
        { withCredentials: true }
      );
      console.log(jobsRes.data.job);
      const amounts=jobsRes.data.job.budget;
      console.log(amounts);
      const names=jobsRes.data.job.assignedFreelancer.name;
      console.log(names);
    const emails=jobsRes.data.job.assignedFreelancer.email;
    console.log(emails);

    
      await axios.post(
        `https://freelancer-backend-qu3g.onrender.com/api/review/admin/${selectedJob}`,
        { ratings, comment },
        { withCredentials: true }
      );

      try {
    
      const orderRes = await axios.post(
        "https://freelancer-backend-qu3g.onrender.com/api/payment/create-order",
        { amount: amounts, receipt: "Receipt" } 
      );

      const { id: order_id, amount, currency } = orderRes.data;

    
      const options = {
        key: "rzp_test_TOPobtZmNgp0Bt", 
        amount,
        currency,
        name: names,
        description: "Test Transaction",
        order_id,
        handler: async function (response) {
        
          const verifyRes = await axios.post(
            "https://freelancer-backend-qu3g.onrender.com/api/payment/verify-payment",
            response
          );
          if (verifyRes.data.status === "success") {
            alert("Payment Successful!");
          } else {
            alert("Payment Failed!");
          }
        },
        prefill: {
          name: names,
          email: emails,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Error in payment");
    } 

      toast.success("Job marked complete and review added!");
      setJobs((prev) =>
        prev.map((j) =>
          j._id === selectedJob ? { ...j, status: "completed" } : j
        )
      );

      
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete job or submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <p className="lg:p-6">Loading tasks...</p>;

  return (
  <div className="lg:p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-emerald-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-8">
        Submitted / In-Progress Tasks
      </h2>

      {jobs.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        jobs.map((job) => {
          const allApproved = tasksByJob[job._id]?.every((t) => t.status === "approved");
          return (
            <div key={job._id} className="mb-8 sm:mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-emerald-700">
                  {job?.title} {job.status && `- ${job.status}`}
                </h3>
                {allApproved && job.status !== "completed" && (
                  <button
                    onClick={() => handleMarkComplete(job._id)}
                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>

             
              <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
                <table className="min-w-full text-xs sm:text-sm text-left hidden sm:table">
                  <thead className="bg-emerald-100 text-emerald-900">
                    <tr>
                      <th className="px-2 sm:px-4 py-2">#</th>
                      <th className="px-2 sm:px-4 py-2">Task Title</th>
                      <th className="px-2 sm:px-4 py-2">Description</th>
                      <th className="px-2 sm:px-4 py-2">Status</th>
                      <th className="px-2 sm:px-4 py-2">Submitted Note</th>
                      <th className="px-2 sm:px-4 py-2">Submitted Link</th>
                      <th className="px-2 sm:px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasksByJob[job._id]?.map((task, index) => (
                      <tr key={task._id} className="border-t hover:bg-gray-50 transition">
                        <td className="px-2 sm:px-4 py-2">{index + 1}</td>
                        <td className="px-2 sm:px-4 py-2">{task?.title || "-"}</td>
                        <td className="px-2 sm:px-4 py-2">{task?.description || "-"}</td>
                        <td className="px-2 sm:px-4 py-2">{task?.status || "-"}</td>
                        <td className="px-2 sm:px-4 py-2">{task?.submission_note || "-"}</td>
                      
                        <td className="px-2 sm:px-4 py-2">
                          {task?.submitted_external_link ? (
                            <a
                              href={task.submitted_external_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Visit Link
                            </a>
                          ) : "-"}
                        </td>
                        <td className="px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 justify-center flex-wrap">
                          {task?.status !== "approved" && task?.status !== "rejected" && (
                            <>
                              <button
                                onClick={() => handleApprove(task._id, job._id)}
                                className="p-1 sm:p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(task._id, job._id)}
                                className="p-1 sm:p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    )) || <tr><td colSpan={8} className="text-center py-4">No tasks found</td></tr>}
                  </tbody>
                </table>

                <div className="sm:hidden flex flex-col gap-4 p-2">
                  {tasksByJob[job._id]?.map((task, index) => (
                    <div key={task._id} className="border rounded-lg p-3 shadow-sm bg-gray-50">
                      <p><strong>#{index + 1}</strong></p>
                      <p><strong>Title:</strong> {task?.title || "-"}</p>
                      <p><strong>Description:</strong> {task?.description || "-"}</p>
                      <p><strong>Status:</strong> {task?.status || "-"}</p>
                      <p><strong>Note:</strong> {task?.submission_note || "-"}</p>
                      
                      <p>
                        <strong>Link:</strong>{" "}
                        {task?.submitted_external_link ? (
                          <a
                            href={task.submitted_external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Visit Link
                          </a>
                        ) : "-"}
                      </p>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {task?.status !== "approved" && task?.status !== "rejected" && (
                          <>
                            <button
                              onClick={() => handleApprove(task._id, job._id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(task._id, job._id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )) || <p className="text-center py-2">No tasks found</p>}
                </div>
              </div>
            </div>
          );
        })
      )}
   


    
      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/40"
           
          ></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 z-10"
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Review Freelancer and Send Payment
            </h3>

            <div className="flex flex-col gap-3">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                value={ratings}
                onChange={(e) => setRatings(Number(e.target.value))}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              
              <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <div className="flex justify-end gap-2 mt-2">
                <button
    onClick={() => setSelectedJob(null)} 
    className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
  >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default SubmittedTasks;

  