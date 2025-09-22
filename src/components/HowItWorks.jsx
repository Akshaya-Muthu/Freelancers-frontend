import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search, Send, CheckCircle, Award } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: <ClipboardList size={20} className="text-emerald-500" />,
      title: 'Sign Up',
      description: 'Create an account with your email and password.',
    },
    {
      icon: <Search size={20} className="text-emerald-500" />,
      title: 'Browse Jobs',
      description: 'Find listings that match your skills.',
    },
    {
      icon: <Send size={20} className="text-emerald-500" />,
      title: 'Bid on Jobs',
      description: 'Send proposals for jobs you like.',
    },
    {
      icon: <CheckCircle size={20} className="text-emerald-500" />,
      title: 'Get Work Done',
      description: 'Collaborate with clients and finish the project.',
    },
    {
      icon: <Award size={20} className="text-emerald-500" />,
      title: 'Receive Certificate',
      description: 'Get a certificate for completed projects.',
    },
  ];

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
       
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-12
                     bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
                     bg-clip-text text-transparent"
        >
          How It Works
        </motion.h2>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg 
                         px-5 py-6 flex flex-col items-center text-center
                         hover:scale-105 transition-transform duration-300"
            >
            
              <div className="p-3 bg-emerald-50 rounded-full mb-3">
                {step.icon}
              </div>
   
              <h3 className="text-base font-semibold text-gray-800">{step.title}</h3>
              
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
