import React from 'react';

// Define the advisory board members with title added back
const advisoryBoardMembers = [
  {
    id: 1,
    name: 'Sani Musa Ibrahim',
    title: 'CHAIRMAN', // Title re-added
    image: './src/assets/images/AdvisoryBoard/aisha_bello.jpg', // **Update path**
  },
  {
    id: 2,
    name: 'Mallam Ibrahim A. Waziri',
    title: 'PATRON', // Title re-added
    image: './assets/images/patron/mallam.jpg', // **Update path**
  },
  {
    id: 3,
    name: 'IDIS ISAH ABUBAKAR',
    title: 'MEMBER', // Title re-added
    image: '/assets/images/advisory/Idris.jpg', // **Update path**
  },
  {
    id: 4,
    name: 'NAZEER BABA ABDULLAHI',
    title: 'MEMBER', // Title re-added
    image: 'assets/images/advisory/Nazeer.jpg', // **Update path**
  },
  {
    id: 5,
    name: 'AISHA MUHAMMAD BELLO',
    title: 'MEMBER', // Title re-added
    image: 'assets/images/advisory/aisha.jpg', // **Update path**
  },
  {
    id: 6,
    name: 'ABUBAKAR MUHAMMAD YAHAYA',
    title: 'MEMBER',
    image: 'assets/images/advisory/yahaya.jpg', // Placeholder image
  },
  {
    id: 7,
    name: 'ABDULMUTALLAB SHEHU OTHMAN',
    title: 'MEMBER', // Title updated
    image: 'assets/images/advisory/shehu.jpg', // Placeholder image
  },
  {
    id: 8,
    name: 'ABDULMALIK HALIMA MUSA',
    title: 'MEMBER', // Title updated
    image: 'https://via.placeholder.com/150/C0C0C0/FFFFFF?text=YB', // Placeholder image
  },
  {
    id: 9,
    name: 'FAREED IBRAHIM',
    title: 'MEMBER', // Title updated
    image: 'assets/images/advisory/fareed.jpg', // Placeholder image
  },
  {
    id: 10,
    name: 'AISHA HUMAIRAH BASHIR',
    title: 'MEMBER', // Title updated
    image: 'https://via.placeholder.com/150/E0E0E0/FFFFFF?text=TG', // Placeholder image
  },
];

function AdvisoryBoard() {
  return (
    <section id="advisory-board" className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Our Advisory Board
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {advisoryBoardMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-5 object-cover border-4 border-sif-green-400 shadow-md"
              />
              <h3 className="text-xl font-semibold text-green-700 mb-2">{member.name}</h3>
              {/* Re-added: Displaying the member's title */}
              <p className="text-gray-700 text-md font-medium mb-3">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdvisoryBoard;