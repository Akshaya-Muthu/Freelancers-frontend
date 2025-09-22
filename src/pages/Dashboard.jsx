// DashboardLayout.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import CreateJob from "../components/CreateJob";
import GetAllJobs from "../components/GetAllJobs";
import ManageJobs from "../components/ManageJobs";
import BidsOnJobs from "../components/BidsOnJobs";
import DashboardMain from "../components/DashboardMain";
import CreateTask from "../components/CreateTask";
import ManageTasks from "../components/ManageTask";
function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardMain />;
      case "createJob":
        return <CreateJob />;
      case "getAllJobs":
        return <GetAllJobs />;
      case "manageJobs":
        return <ManageJobs />;
      case "bidsOnJobs":
        return <BidsOnJobs />;
      case "createTask":
        return <CreateTask />;
      case "manageTasks":
        return <ManageTasks />;
      default:
        return <CreateJob />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Dashboard;
