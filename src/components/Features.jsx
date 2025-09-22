
import React from 'react';
import { motion } from 'framer-motion';

function Features() {
  const features = [
    { img: '/check.png', title: 'Task Tracking & Management' },
    { img: '/review.png', title: 'Rating & Reviews System' },
    { img: '/document.png', title: 'Job Completion Certificate' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center 
                     bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 
                     bg-clip-text text-transparent tracking-wide mb-4">
        Features
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-14 text-lg md:text-xl">
        Explore the key features that make our platform reliable and easy to use.
      </p>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            viewport={{ once: false }}
            className="flex flex-col items-center bg-white p-8 rounded-2xl 
                       shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full 
                            bg-gradient-to-tr from-emerald-200 via-teal-200 to-cyan-200 mb-6 
                            shadow-md">
              <img src={feature.img} alt={feature.title} className="w-12 h-12" />
            </div>
            <p className="text-xl font-semibold text-[#284910] text-center">
              {feature.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Features;


