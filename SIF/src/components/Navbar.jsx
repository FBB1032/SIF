import React from 'react';

 // Adjust the import path to correctly point to your logo.jpg file
 import SifLogo from '../assets/images/logo.jpg';

 function Navbar() {
  return (
  <nav className="bg-gray-800 text-white py-4">
  <div className="container mx-auto px-4 flex items-center justify-between">
  <a href="/" className="flex items-center">
  <img
  src={SifLogo}
  alt="SIF Logo"
  className="w-8 h-8 rounded-full mr-2"
  />
  <span className="text-lg font-bold">SIF</span>
  </a>
  <div className="space-x-4">
  <a href="#about" className="hover:text-gray-300">About</a>
  <a href="#services" className="hover:text-gray-300">Services</a>
  <a href="#exco" className="hover:text-gray-300">EXCO</a>
  <a href="#contact" className="hover:text-gray-300">Contact</a>
  <a href="#membership" className="hover:text-gray-300">Membership</a>
  </div>
  </div>
  </nav>
  );
 }

 export default Navbar;