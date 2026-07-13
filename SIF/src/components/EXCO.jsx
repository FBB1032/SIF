import React from 'react';
// Removed FontAwesomeIcon and brand icon imports as they are no longer needed

const excoMembers = [
  {
    id: 1,
    name: 'Muhammad Bello Anka',
    title: 'Team Lead',
    image: '/assets/images/Excos/Anka.jpeg', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Abdulmuhamin Siyaka',
    title: 'Admin Lead',
    image: '/assets/images/Excos/siyaka.jpg', // Replace with actual image URL
  },
  {
    id: 3,
    name: 'Rahmatullah Abdullahi Omehi',
    title: 'Communications Lead',
    image: '/assets/images/Excos/Ramatu.jpeg', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Fahd Badamasi',
    title: 'Technical Lead',
    image: '/assets/images/Excos/Fahd.jpeg', // Replace with actual image URL
  },
  {
    id: 5,
    name: 'Hauwa Abdulmumin',
    title: 'Treasurer',
    image: '/assets/images/Excos/Hauwa.jpeg', // Replace with actual image URL
  },
  {
    id: 6,
    name: 'Muhammad Junaid',
    title: 'Financial Secretary', // Example of changing a title
    image: '/assets/images/Excos/junaid.jpg', // Replace with actual image URL
  },
  // Removed members from id 6 to 20
];

function EXCO() {
  return (
    <div id="exco" className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our EXCOS
        </h2>
        {/* Adjusted grid to better suit 5 members, or kept flexible if more are added later */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center">
          {excoMembers.map((member) => (
            <div key={member.id} className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-300" // Added object-cover and border for better appearance
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600 text-sm">{member.title}</p>
              {/* Removed social media links section */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EXCO;