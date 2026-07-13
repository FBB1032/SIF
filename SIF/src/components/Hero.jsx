import React from 'react';
import heroImage from '../assets/images/logo.jpg'; // Using high-quality logo or a placeholder image

function Hero({ setActiveTab }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white py-16 lg:py-24">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side Content */}
        <div className="text-left space-y-6 max-w-xl">
          <div className="flex items-center space-x-3">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Students' Interactive Summit
            </span>
            <span className="bg-yellow-300 text-yellow-900 font-extrabold px-2 py-0.5 text-xs rounded shadow-sm transform rotate-12 inline-block">
              2.0
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Engage. Learn. <span className="text-green-600">Lead.</span>
          </h1>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-wider text-green-700 block">Summit Theme:</span>
            <p className="text-base font-bold text-gray-800 uppercase mt-0.5">
              Beyond the Narrative: Redefining the Nigerian Trajectory
            </p>
          </div>
          <p className="text-base text-gray-600 leading-relaxed">
            Join students, leaders, and thinkers from across disciplines to discuss issues, share perspectives, and inspire change.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setActiveTab('register')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded shadow-md transition duration-200"
            >
              Register for Summit
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded shadow-sm transition duration-200"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative">
          {/* Decorative Green Background Swirl Accent */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-300 rounded-2xl blur opacity-10"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <img
              src="/assets/images/summit_flyer.jpg"
              alt="SIF Summit Flyer"
              className="w-full h-[400px] object-cover rounded-xl shadow-md"
              onError={(e) => {
                // Fallback to logo if flyer is missing
                e.target.src = heroImage;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
