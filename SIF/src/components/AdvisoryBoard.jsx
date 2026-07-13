import React from 'react';

// Define the advisory board members with title added back
// Define the advisory board members with title added back
const advisoryBoardMembers = [
  {
    id: 1,
    name: 'Sani Musa Ibrahim',
    title: 'CHAIRMAN',
    image: '/assets/images/advisory/sani.jpg',
  },
  {
    id: 2,
    name: 'Mallam Ibrahim A. Waziri',
    title: 'PATRON',
    image: '/assets/images/patron/mallam.jpg',
  },
  {
    id: 3,
    name: 'IDIS ISAH ABUBAKAR',
    title: 'MEMBER',
    image: '/assets/images/advisory/Idris.jpg',
  },
  {
    id: 4,
    name: 'NAZEER BABA ABDULLAHI',
    title: 'MEMBER',
    image: '/assets/images/advisory/Nazeer.jpg',
  },
  {
    id: 5,
    name: 'AISHA MUHAMMAD BELLO',
    title: 'MEMBER',
    image: '/assets/images/advisory/aisha.jpg',
  },
  {
    id: 6,
    name: 'ABUBAKAR MUHAMMAD YAHAYA',
    title: 'MEMBER',
    image: '/assets/images/advisory/yahaya.jpg',
  },
  {
    id: 7,
    name: 'ABDULMUTALLAB SHEHU OTHMAN',
    title: 'MEMBER',
    image: '/assets/images/advisory/shehu.jpg',
  },
  {
    id: 8,
    name: 'ABDULMALIK HALIMA MUSA',
    title: 'MEMBER',
    image: '/assets/images/advisory/halima.jpg',
  },
  {
    id: 9,
    name: 'FAREED IBRAHIM',
    title: 'MEMBER',
    image: '/assets/images/advisory/fareed.jpg',
  },
  {
    id: 10,
    name: 'AISHA HUMAIRAH BASHIR',
    title: 'MEMBER',
    image: '/assets/images/advisory/humi.jpg',
  },
  {
    id: 11,
    name: 'Abubakar Muhammad ABBA',
    title: 'MEMBER',
    image: '/assets/images/Excos/lead.jpg',
  },
];

function AdvisoryBoard({ showBanner = false }) {
  return (
    <section id="advisory-board" className="bg-gradient-to-br from-green-50 to-white pb-16">
      {showBanner ? (
        <div className="bg-green-700 text-white py-16 text-center mb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Our Advisory Board</h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Guiding SIF with experience, wisdom, and commitment.
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 pt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Our Advisory Board
          </h2>
        </div>
      )}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {advisoryBoardMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-[220px]"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-5 object-cover border-4 border-sif-green-400 shadow-md"
                onError={(e) => {
                  e.target.src = '/assets/logo.jpg';
                }}
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">{member.name}</h3>
              <p className="text-gray-700 text-sm font-medium mb-3">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvisoryBoard;