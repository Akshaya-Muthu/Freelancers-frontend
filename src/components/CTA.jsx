import React from 'react';
import { useNavigate } from 'react-router-dom';

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-6 text-center">
     
      <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Ready to Get Started?
      </h2>

     
      <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
        Join our platform today and start bidding on projects that match your skills.
      </p>

      
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={() => navigate('/signup')}
          className="px-7 py-3 rounded-full text-white font-semibold
                     bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg 
                     hover:shadow-xl hover:scale-105 active:scale-95 
                     transition-all duration-300 w-full sm:w-auto cursor-pointer"
        >
          Sign Up
        </button>

        <button
          onClick={() => navigate('/jobs')}
          className="px-7 py-3 rounded-full font-semibold border-2 border-emerald-500 text-emerald-600 
                     hover:bg-emerald-500 hover:text-white transition-all duration-300 
                     w-full sm:w-auto cursor-pointer"
        >
          Browse Jobs
        </button>
      </div>
    </section>
  );
}

export default CTA;

