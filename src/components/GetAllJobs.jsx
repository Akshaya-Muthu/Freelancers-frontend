import React, { useEffect, useState } from "react";

function GetAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/jobs/jobs", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        setError(err.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-gray-500">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 lg:p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        All Jobs
      </h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-lg">No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-4">
                <h2 className="text-xl font-bold text-white">{job.title}</h2>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {job.description.length > 100
                    ? `${job.description.slice(0, 100)}...`
                    : job.description}
                </p>

                <div className="space-y-2 text-sm mt-auto">
                  <p>
                    <span className="font-semibold text-gray-700">Budget:</span>{" "}
                    <span className="text-emerald-600">${job.budget}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Deadline:</span>{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Category:</span>{" "}
                    {job.category}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Skills:</span>{" "}
                    {job.skills?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Status:</span>{" "}
                    {job.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetAllJobs;
