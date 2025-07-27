import React from 'react';

// Changed teamMembers to hold a single "Patron" object
const teamMembers = [ // Retaining the variable name teamMembers as requested
  {
    name: 'Mallam .A. ibrahim Waziri', // Example Patron Name
    title: 'Chief Patron, SIF',       // Example Patron Title
    image: '/assets/images/patron/mallam.jpg', // **UPDATE THIS PATH TO YOUR ACTUAL PATRON IMAGE**
    bio: 'Mallam ibrahim Waziri is a distinguished academic and a staunch advocate for youth development, providing invaluable guidance and support to the Student Interactive Forum (SIF). His vision aligns perfectly with SIF\'s mission to empower students through interactive learning and community engagement.'
  }
];

function Team() { // Retaining the function name Team as requested
  return (
    <section id="patron" className="py-16 bg-gray-50"> {/* Section ID changed to "patron" */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Patron</h2> {/* Changed title from "Our Mentors" */}
        <div className="flex justify-center"> {/* Flex container to center the single card */}
          {teamMembers.map((member, index) => ( // Looping through teamMembers (which now has one item)
            <div
              key={index}
              className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-40 h-40 mx-auto mb-6 object-cover border-4 border-sif-green-400 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-green-700 mb-2">{member.name}</h3>
              <p className="text-lg text-gray-700 mb-4 font-semibold">{member.title}</p>
              <p className="text-gray-600 text-md leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team; // Retaining the export name Team as requested