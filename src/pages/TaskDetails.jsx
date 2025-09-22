
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function TaskDetails() {
  const { id } = useParams(); // task id
  const [task, setTask] = useState(null);

  const [externalLink, setExternalLink] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`https://freelancer-backend-qu3g.onrender.com/api/tasks/${id}`, {
          withCredentials: true,
        });
        setTask(res.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
    fetchTask();
  }, [id]);

  const startTask = async () => {
    try {
      await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/tasks/${id}/start`,
        {},
        { withCredentials: true }
      );
      toast.success("Task started successfully!");
   
      const res = await axios.get(`https://freelancer-backend-qu3g.onrender.com/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTask(res.data);
    } catch (err) {
      toast.error("Failed to start task");
      console.error(err);
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("submitted_external_link", externalLink);
      formData.append("submission_note", note);
      if (file) {
        formData.append("file", file);
      }
      

      await axios.put(
        `https://freelancer-backend-qu3g.onrender.com/api/tasks/submit/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Task submitted successfully!");

     
      const res = await axios.get(`https://freelancer-backend-qu3g.onrender.com/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTask(res.data);
    } catch (err) {
      toast.error("Failed to submit task");
      console.error(err);
    }
  };

  if (!task) return <p className="text-center mt-10">Loading task...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-emerald-600 mb-4">
          {task.job_id?.title || "Job Deleted"}
        </h1>
        <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
        <p className="text-gray-700 mb-4">{task.description}</p>
        <p className="text-gray-500 mb-4">
          Status: <span className="font-semibold">{task.status}</span>
        </p>

        
        {task.status === "todo" && (
          <button
            onClick={startTask}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-md
                       hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Start Task
          </button>
        )}

       
        {task.status === "in-progress" && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Submit Task</h3>
            <form onSubmit={submitTask} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">
                  External Link (optional)
                </label>
                <input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Note</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full border p-2 rounded-md"
                  placeholder="Write something..."
                />
              </div>
             
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-md
                           hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Submit Task
              </button>
            </form>
          </div>
        )}

        <Link
          to="/my-bids"
          className="inline-block mt-4 px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default TaskDetails;
