
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BidsOnJobs() {
  const [jobsWithBids, setJobsWithBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [bids, setBids] = useState({});
  const [loadingBids, setLoadingBids] = useState(false);

  
  const fetchJobsWithBids = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/bids/jobs/with-bids", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setJobsWithBids(data.jobs);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const fetchBidsForJob = async (jobId) => {
    try {
      setLoadingBids(true);
      const res = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/bids/job/${jobId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setBids((prev) => ({ ...prev, [jobId]: data.bids }));
      } else {
        setBids((prev) => ({ ...prev, [jobId]: [] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBids(false);
    }
  };


  const acceptBid = async (bidId, jobId) => {
    try {
      const res = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/bids/${bidId}/accept`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Bid accepted successfully!");
        fetchBidsForJob(jobId); // Refresh bids
      } else {
        toast.error(data.message || "Failed to accept bid");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error accepting bid");
    }
  };

  const toggleJobBids = (jobId) => {
    if (expandedJobId === jobId) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(jobId);
      if (!bids[jobId]) {
        fetchBidsForJob(jobId);
      }
    }
  };

  useEffect(() => {
    fetchJobsWithBids();
  }, []);

  if (loading) return <p className="p-4">Loading jobs with bids...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="lg:p-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Jobs with Bids
      </h1>

      {jobsWithBids.length === 0 ? (
        <p className="text-gray-500">No jobs have bids yet.</p>
      ) : (
        <div className="space-y-4">
          {jobsWithBids.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-sm text-gray-500">
                Budget: ${job.budget} | Deadline:{" "}
                {new Date(job.deadline).toLocaleDateString()}
              </p>

              <button
                onClick={() => toggleJobBids(job._id)}
                className="mt-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 text-white px-4 py-2 rounded-lg shadow transition-all"
              >
                {expandedJobId === job._id ? "Hide Bids" : "View Bids"}
              </button>

              {expandedJobId === job._id && (
                <div className="mt-4 border-t pt-4">
                  {loadingBids && !bids[job._id] ? (
                    <p>Loading bids...</p>
                  ) : bids[job._id]?.length > 0 ? (
                    <div className="space-y-3">
                      {bids[job._id].map((bid) => (
                        <div
                          key={bid._id}
                          className={`p-4 rounded-lg border transition ${
                            bid.status === "accepted"
                              ? "border-green-500 bg-green-50"
                              : bid.status === "rejected"
                              ? "border-red-500 bg-red-50"
                              : "border-yellow-500 bg-yellow-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-lg text-gray-800">
                                {bid.user_id?.name} - ${bid.bid_amount}
                              </p>
                              <p className="text-sm text-gray-600">
                                {bid.user_id?.email}
                              </p>
                              <p className="text-gray-700 mt-1">
                                Timeline: {bid.timeline}
                              </p>
                              <p className="text-gray-700 mt-1">{bid.message}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Status:{" "}
                                <span className="font-semibold capitalize">
                                  {bid.status}
                                </span>
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(bid.createdAt).toLocaleDateString()}{" "}
                                {new Date(bid.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>

                            {bid.status === "pending" && (
                              <button
                                onClick={() => acceptBid(bid._id, job._id)}
                                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:scale-105 text-white px-4 py-2 rounded-lg shadow transition-all"
                              >
                                Accept
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No bids found for this job.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BidsOnJobs;
