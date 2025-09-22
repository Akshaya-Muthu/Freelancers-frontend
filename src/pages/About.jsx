import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-gray-900 min-h-screen py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <img 
              src="/pic4.jpg" 
              alt="About Us Illustration" 
              className="w-full rounded-2xl shadow-2xl border border-white/50"
            />
          </motion.div>

         
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/40"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Empowering Freelancers & Clients Worldwide
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              We are a next-generation freelancing platform dedicated to connecting top talent with meaningful work. 
              Whether you're a freelancer looking to showcase your skills, or a business seeking expert help — you're in the right place.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to simplify project collaboration through secure, user-friendly tools and a trusted environment.
            </p>
            <button 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onClick={() => { navigate('/signup'); }}
            >
              Join Us Today
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

