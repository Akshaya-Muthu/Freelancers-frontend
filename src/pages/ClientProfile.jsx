import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileList from "../components/ProfileList";
import ExperienceSection from "../components/ExperienceSection";
import QualificationSection from "../components/QualificationSection";
import EducationSection from "../components/EducationSection";
import PortfolioSection from "../components/PortfolioSection";
import ServiceManagement from "../components/ServiceManagement";
import BusinessDetails from "../components/BusinessDetails";


function ClientProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        

        <BusinessDetails />
        
        
      </div>
      <Footer />
    </div>
  );
}

export default ClientProfile;
