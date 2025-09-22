import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left side */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6 border border-white/40"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent text-center">
              Contact Us
            </h1>
            <p className="text-center text-gray-600 mb-6">
              We'd love to hear from you! Whether you have a question or just want to say hello, our team is here to help.
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              ></textarea>
            </div>

            <div className="text-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full shadow-md hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                Send Message
              </motion.button>
            </div>
          </motion.form>

          {/* Right-side*/}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center md:items-start md:text-left space-y-6"
          >
            <img 
              src="/contactus.jpg"
              alt="Contact Illustration"
              className="w-full max-w-md rounded-2xl shadow-lg border border-white/50"
            />
            <div>
              <h2 className="text-2xl font-bold text-emerald-700">Get in Touch</h2>
              <p className="text-gray-700 mt-2">
                Email: <a href="mailto:support@freelancepro.com" className="text-emerald-600 hover:underline">support@freelancepro.com</a><br />
                Phone: <span className="text-gray-800">+1 (555) 123-4567</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Contact;
