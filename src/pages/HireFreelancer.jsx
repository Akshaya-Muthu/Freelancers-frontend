import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import FreelancerSearch from "../components/FreelancerSearch";


function HireFreelancer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <FreelancerSearch />
      </div>
      <Footer />
    </div>
  );
}

export default HireFreelancer;
