import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  List,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Home,
  ClipboardPlus,
  ClipboardList,
} from "lucide-react";

function Sidebar({ setActiveComponent }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { logout } = useAuth();
const [userName, setUserName] = useState("");
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "createJob", label: "Create Job", icon: <Briefcase size={20} /> },
    { id: "getAllJobs", label: "Job Listings", icon: <List size={20} /> },
    { id: "manageJobs", label: "Manage Jobs", icon: <Settings size={20} /> },
    { id: "bidsOnJobs", label: "Job Bids", icon: <FileText size={20} /> },
    { id: "createTask", label: "Create Task", icon: <ClipboardPlus size={20} /> },
    { id: "manageTasks", label: "Manage Tasks", icon: <ClipboardList size={20} /> },
  ];


  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.name); // adjust based on your object structure
    }
  }, []);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setActiveComponent(id);
  };

  const handleLogout = async () => {
    try {
      await axios.get("https://freelancer-backend-qu3g.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside
      className={`
        bg-emerald-700 text-white flex flex-col transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}
        h-screen
      `}
    >
     
      <div className="flex items-center justify-between p-4 border-b border-green-600">
        {isOpen ? (
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <LayoutDashboard size={24} />
            <span>FreelancePro</span>
          </h1>
        ) : (
          <div className="w-6 h-6 flex items-center justify-center">
            <LayoutDashboard size={24} />
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-md hover:bg-emerald-600 transition-colors"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="flex-1 mt-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`
              flex items-center w-full p-3 rounded-lg transition-all
              ${activeTab === item.id
                ? "bg-white text-emerald-700 shadow-md"
                : "hover:bg-emerald-500 hover:shadow-sm"}
              ${isOpen ? "justify-start gap-3" : "justify-center"}
            `}
          >
            <span
              className={`${
                activeTab === item.id ? "text-emerald-600" : "text-white"
              }`}
            >
              {item.icon}
            </span>
            {isOpen && (
              <span className="font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className={`px-4 pb-3 flex gap-2 ${!isOpen && "flex-col items-center"}`}>
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors"
          aria-label="Home"
        >
          <Home size={20} />
        </button>
        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>

      <div className={`p-4 border-t border-green-600 ${!isOpen && "hidden"}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
            FP
          </div>
          {isOpen && (
            <div>
              <p className="font-medium">FreelancePro</p>
              <p className="text-xs text-indigo-200">{userName || "Admin"}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
