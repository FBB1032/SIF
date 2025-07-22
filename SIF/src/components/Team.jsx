import React from 'react';

const teamMembers = [
  { name: 'John Doe', title: 'CEO', image: './src/assets/images/Excos/image1.jpg', bio: 'Brief bio of John Doe.' },
  { name: 'Jane Smith', title: 'Director', image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?Text=JS', bio: 'Brief bio of Jane Smith.' },
  { name: 'Peter Jones', title: 'Manager', image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?Text=PJ', bio: 'Brief bio of Peter Jones.' },
];

function Team() {
  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-md shadow-md p-6 text-center">
              <img src={member.image} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-gray-700 mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.title}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;