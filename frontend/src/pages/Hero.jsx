import React from 'react';

export default function HeroSection() {
    return (
      <div
        className="h-screen flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('data:image/png;base64,YOUR_BASE64_STRING_HERE')" }}
      >
        <div className="text-center p-6 bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg md:text-xl mb-6">Experience the best services with us</p>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold">
            Get Started
          </button>
        </div>
      </div>
    );
  }
  