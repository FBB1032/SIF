import React from 'react';
import { Users, Share2, Wrench, Award, Calendar, MapPin } from 'lucide-react';

function SummitTab({ setActiveTab }) {
  const expectations = [
    {
      title: 'Engaging Panels',
      desc: 'Insightful discussions on relevant topics with subject-matter experts.',
      icon: Users,
    },
    {
      title: 'Networking',
      desc: 'Connect with outstanding peers, academic mentors, and leaders.',
      icon: Share2,
    },
    {
      title: 'Workshops',
      desc: 'Practical skill-building sessions to equip you for positive impact.',
      icon: Wrench,
    },
    {
      title: 'Certificates',
      desc: 'Earn recognized certificates for your participation and learning.',
      icon: Award,
    },
  ];

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-green-700 text-white py-16 text-center">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold">STUDENTS' INTERACTIVE SUMMIT</h1>
            <span className="bg-yellow-300 text-yellow-900 font-extrabold px-2 py-0.5 text-sm rounded shadow-sm transform rotate-12 inline-block">
              2.0
            </span>
          </div>
          <p className="text-lg text-green-100 max-w-3xl mx-auto font-semibold uppercase tracking-wide mt-2">
            Theme: Beyond the Narrative: Redefining the Nigerian Trajectory
          </p>
        </div>
      </div>

      {/* Intro section */}
      <div className="container mx-auto px-4 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="text-left space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Summit Overview</h2>
          <p className="text-gray-600 leading-relaxed">
            The Students' Interactive Summit is SIF's flagship event. It provides an energetic and stimulating space for students to step out of traditional classroom learning, dive into contemporary societal challenges, and formulate real-world solutions.
          </p>
          
          <div className="space-y-3 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="w-5 h-5 text-green-600" />
              <div>
                <span className="font-semibold block">Date & Time:</span>
                <span className="text-sm">Saturday 22nd August, 2026 — 9:00 AM</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <span className="font-semibold block">Venue:</span>
                <span className="text-sm">ABU, Zaria, Nigeria</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('register')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded shadow transition duration-200"
          >
            Register for Summit
          </button>
        </div>

        {/* Right Side Image */}
        <div className="relative">
          <div className="absolute -inset-1 bg-green-500 rounded-2xl blur opacity-10"></div>
          <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <img
              src="/assets/images/summit_flyer.jpg"
              alt="SIF Summit 2.0 Flyer"
              className="w-full h-[380px] object-cover rounded-xl shadow-md"
              onError={(e) => {
                e.target.src = '/assets/logo.jpg';
              }}
            />
          </div>
        </div>
      </div>

      {/* Expectation / Features Section */}
      <div className="bg-green-50/50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">What to Expect</h3>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
            Prepare to unlock new potentials and build long-lasting connections through our structured programs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expectations.map((exp, index) => {
              const IconComp = exp.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{exp.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummitTab;
