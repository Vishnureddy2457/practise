import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="text-blue-500 hover:text-blue-700 text-lg underline"
      >
        Go back to the homepage
      </a>
    </div>
  );
};

export default NotFound;