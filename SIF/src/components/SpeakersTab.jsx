import React from 'react';

const speakers = [
  {
    name: 'Dr. Amina Bello',
    title: 'Education Specialist',
    image: '/assets/images/advisory/aisha.jpg'
  },
  {
    name: 'Prof. Musa Y. Sani',
    title: 'Public Policy Expert',
    image: '/assets/images/advisory/sani.jpg'
  },
  {
    name: 'Dr. Haruna I. Aliyu',
    title: 'Leadership Consultant',
    image: '/assets/images/advisory/Idris.jpg'
  },
  {
    name: 'Dr. Fatima M. Lawal',
    title: 'Social Entrepreneur',
    image: '/assets/images/advisory/halima.jpg'
  },
  {
    name: 'Engr. Zainab T. Umar',
    title: 'Tech Advocate',
    image: '/assets/images/advisory/humi.jpg'
  },
  {
    name: 'Mr. Ibrahim K. Sani',
    title: 'Youth Advocate',
    image: '/assets/images/Excos/siyaka.jpg'
  }
];

function SpeakersTab() {
  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-green-700 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Speakers</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Meet our distinguished speakers for this year's summit 2026.
          </p>
        </div>
      </div>

      {/* Speakers Grid */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 justify-items-center">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 w-full max-w-[260px]"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 border-4 border-green-100 shadow-inner">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/logo.jpg';
                  }}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {speaker.name}
              </h3>
              <p className="text-sm text-green-600 font-semibold mb-2">
                {speaker.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpeakersTab;
