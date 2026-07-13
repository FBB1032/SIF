import React from 'react';

const moderators = [
  {
    name: 'Abdulmuhaimin Siyaka',
    year: '2025',
    image: '/assets/images/Excos/siyaka.jpg'
  },
  {
    name: 'Sani M. Lawal',
    year: '2023',
    image: '/assets/images/advisory/sani.jpg'
  },
  {
    name: 'Auwal Abdullahi',
    year: '2022',
    image: '/assets/images/advisory/Idris.jpg'
  },
  {
    name: 'Fatima A. Bello',
    year: '2017',
    image: '/assets/images/advisory/aisha.jpg'
  },
  {
    name: 'Mustafa A. Yusuf',
    year: '2020',
    image: '/assets/images/advisory/yahaya.jpg'
  }
];

function PastModerators() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Past Moderators
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {moderators.map((mod, index) => (
            <div key={index} className="text-center w-36 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-200 shadow-sm mb-3">
                <img
                  src={mod.image}
                  alt={mod.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/logo.jpg';
                  }}
                />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                {mod.name}
              </h4>
              <span className="text-xs text-green-600 font-bold mt-1">
                {mod.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PastModerators;
