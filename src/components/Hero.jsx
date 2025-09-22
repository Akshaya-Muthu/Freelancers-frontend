import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleBrowseJobs = () => {
    navigate('/jobs');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white w-full flex flex-col-reverse lg:flex-row items-center py-16 lg:py-12">
      
      
      <div className="p-6 md:p-12 lg:p-20 w-full lg:w-1/2 text-center lg:text-left">
        
       
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight 
                     bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
                     bg-clip-text text-transparent"
        >
          Empower Your Workflow
        </motion.h1>

       
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-700 font-medium"
        >
          Deliver quality, get rated, and receive official certificates for every completed job.
        </motion.h2>

    
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <button
            onClick={handleBrowseJobs}
            className="mt-8 px-6 py-3 md:px-7 md:py-4 rounded-full text-white font-semibold
                       bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                       hover:shadow-2xl hover:scale-105 active:scale-95 
                       transition-all duration-300 cursor-pointer"
          >
            Browse Jobs
          </button>
        </motion.div>
      </div>

    
      
      <div className="w-full lg:w-1/2 flex justify-center p-6 md:p-10">
        <motion.img
          src="/herosection.png"
          alt="Hero Illustration"
          className="w-64 md:w-80 lg:w-[26rem] drop-shadow-lg transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        />
      </div>
    </div>
  );
}

export default Hero;



