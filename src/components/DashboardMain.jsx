import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Clock, ClipboardList, FileText } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function DashboardMain() {
  const { user } = useAuth();
 
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeProjects: 0,
    pendingBids: 0,
    tasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, bidsRes, tasksRes] = await Promise.all([
          axios.get("https://freelancer-backend-qu3g.onrender.com/api/jobs/totaljobs", { withCredentials: true }),
          axios.get("https://freelancer-backend-qu3g.onrender.com/api/bids/bids", { withCredentials: true }),
          axios.get("https://freelancer-backend-qu3g.onrender.com/api/admin/tasks", { withCredentials: true }),
        ]);

        const totalJobs = jobsRes.data.length;
        const activeProjects = bidsRes.data.filter(bid => bid.status === "accepted").length;
        const pendingBids = bidsRes.data.filter(bid => bid.status === "pending").length;
        const totalTasks = tasksRes.data.length;

        setStats({
          totalJobs,
          activeProjects,
          pendingBids,
          tasks: totalTasks,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const cardData = [
    { id: 1, label: "Total Jobs", value: stats.totalJobs, icon: <Briefcase size={28} />, color: "bg-blue-500" },
    { id: 2, label: "Active Projects", value: stats.activeProjects, icon: <Clock size={28} />, color: "bg-green-500" },
    { id: 3, label: "Pending Bids", value: stats.pendingBids, icon: <FileText size={28} />, color: "bg-yellow-500" },
    { id: 4, label: "Tasks", value: stats.tasks, icon: <ClipboardList size={28} />, color: "bg-purple-500" },
  ];

  return (
    <div className="lg:p-6">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back 
      </h1>

    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cardData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-full text-white ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="bg-white shadow-md rounded-xl p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          <li className="flex justify-between text-sm text-gray-600">
            <span>New bid submitted on "Website Design"</span>
            <span className="text-gray-400">2 hours ago</span>
          </li>
          <li className="flex justify-between text-sm text-gray-600">
            <span>Job "Mobile App Development" assigned</span>
            <span className="text-gray-400">Yesterday</span>
          </li>
          <li className="flex justify-between text-sm text-gray-600">
            <span>3 new tasks created for "E-commerce Platform"</span>
            <span className="text-gray-400">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardMain;
