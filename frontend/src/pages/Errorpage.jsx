import React from 'react';
import { motion } from 'framer-motion';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-6">
      {/* Animated Container */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        {/* Heading */}
        <motion.h1 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="text-6xl font-extrabold text-gray-900 mb-4"
        >
          404 - Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-gray-700 text-center mb-6 max-w-lg leading-relaxed"
        >
          Oops! The page you're looking for doesn’t exist. It might have been moved or deleted.
        </motion.p>
      </motion.div>

      {/* Button Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.5, duration: 0.6, ease: 'backOut' }}
      >
        {/* Go Back Home Button */}
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
        >
          Go Back Home
        </motion.a>
      </motion.div>

      {/* Additional Links */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-6 flex space-x-4 text-sm"
      >
        <motion.a
          whileHover={{ scale: 1.1, color: '#4F46E5' }}
          href="/contact"
          className="text-gray-700 transition duration-300"
        >
          Contact Support
        </motion.a>
        <span className="text-gray-500">|</span>
        <motion.a
          whileHover={{ scale: 1.1, color: '#2563EB' }}
          href="/faq"
          className="text-gray-700 transition duration-300"
        >
          Visit FAQ
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Error;
