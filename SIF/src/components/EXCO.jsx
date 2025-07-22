import React from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

 const excoMembers = [
  {
  id: 1,
  name: 'John Doe',
  title: 'President',
  image: './src/assets/images/Excos/image1.jpg', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 2,
  name: 'Jane Smith',
  title: 'Vice President',
  image: './src/assets/images/Excos/image 3.jpg', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 3,
  name: 'David Lee',
  title: 'Secretary',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 4,
  name: 'Sarah Johnson',
  title: 'Treasurer',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 5,
  name: 'Michael Brown',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 6,
  name: 'Emily Wilson',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 7,
  name: 'Christopher Garcia',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 8,
  name: 'Jessica Rodriguez',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 9,
  name: 'Kevin Williams',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 10,
  name: 'Ashley Martinez',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 11,
  name: 'Brandon Anderson',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 12,
  name: 'Stephanie Thomas',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 13,
  name: 'Andrew Jackson',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 14,
  name: 'Melissa White',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 15,
  name: 'Joseph Harris',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 16,
  name: 'Amanda Martin',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 17,
  name: 'Ryan Thompson',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 18,
  name: 'Nicole Perez',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 19,
  name: 'Brian Clark',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
  {
  id: 20,
  name: 'Heather Lewis',
  title: 'Member',
  image: 'https://via.placeholder.com/150', // Replace with actual image URL
  twitter: '#',
  facebook: '#',
  linkedin: '#',
  },
 ];

 function EXCO() {
  return (
  <div className="bg-white py-12">
  <div className="container mx-auto px-4">
  <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
  Our EXCO
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {excoMembers.map((member) => (
  <div key={member.id} className="text-center">
  <img
  src={member.image}
  alt={member.name}
  className="w-32 h-32 rounded-full mx-auto mb-4" // Added rounded-full class
  />
  <h3 className="text-xl font-semibold text-gray-800">
  {member.name}
  </h3>
  <p className="text-gray-600">{member.title}</p>
  <div className="flex justify-center mt-4 space-x-4">
  <a href={member.twitter} className="text-gray-500 hover:text-blue-500">
  <FontAwesomeIcon icon={faTwitter} size="lg" />
  </a>
  <a href={member.facebook} className="text-gray-500 hover:text-blue-600">
  <FontAwesomeIcon icon={faFacebook} size="lg" />
  </a>
  <a href={member.linkedin} className="text-gray-500 hover:text-blue-700">
  <FontAwesomeIcon icon={faLinkedin} size="lg" />
  </a>
  </div>
  </div>
  ))}
  </div>
  </div>
  </div>
  );
 }

 export default EXCO;