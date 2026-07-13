import React from 'react';

function AboutTab() {
  const checkPoints = [
    'Student-driven initiative',
    'Promoting critical thinking',
    'Encouraging inclusive dialogue',
    'Building future leaders'
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-green-700 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About SIF</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Learn more about who we are, what we do, and why we exist.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <div className="text-left space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
          <p className="text-gray-600 leading-relaxed text-base">
            The Student Interactive Forum (SIF) was established in 2023 with a mission to cultivate a vibrant, inclusive community of students passionate about critical thinking, engaging dialogue, and positive change. SIF was founded on the belief that meaningful conversations and collaborative learning are essential for personal growth and societal progress.
          </p>
          <p className="text-gray-600 leading-relaxed text-base">
            SIF serves as a dynamic platform where students from diverse backgrounds come together to exchange ideas, challenge perspectives, and engage in constructive discussions on a wide range of topics from academic interests to global issues.
          </p>

          <ul className="space-y-3 pt-2">
            {checkPoints.map((point, index) => (
              <li key={index} className="flex items-center space-x-3 text-gray-700 font-medium">
                {/* SVG Checkmark */}
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute -inset-1 bg-green-500 rounded-2xl blur opacity-10"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <img
              src="/assets/images/about/002.jpg"
              alt="Students Interactive Forum Circle Session"
              className="w-full h-[380px] object-cover rounded-xl"
              onError={(e) => {
                e.target.src = '/assets/logo2.jpg';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutTab;
