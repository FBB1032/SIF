import React, { useState } from 'react';
import SifLogo from '../assets/images/logo.jpg';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu (make sure lucide-react is installed)

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and SIF text */}
        <a href="/" className="flex items-center flex-shrink-0" onClick={closeMobileMenu}>
          <img
            src={SifLogo}
            alt="SIF Logo"
            className="w-9 h-9 rounded-full mr-2 object-cover" // Slightly larger, object-cover for better fit
          />
          <span className="text-xl font-bold tracking-wide">SIF</span> {/* Slightly larger font, letter spacing */}
        </a>

        {/* Mobile menu toggle button (hamburger icon) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none focus:ring-2 focus:ring-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium"> {/* Larger text, bolder */}
          <a href="#about" className="hover:text-gray-300 transition duration-200">About</a>
          <a href="#advisory-board" className="hover:text-gray-300 transition duration-200">Advisory Board</a> {/* Updated to match mobile menu style */}
          <a href="#patron" className="hover:text-gray-300 transition duration-200">Patron</a> {/* Added Patron */}
          <a href="#exco" className="hover:text-gray-300 transition duration-200">EXCO</a>
          <a href="#contact" className="hover:text-gray-300 transition duration-200">Contact</a>
          <a href="#membership" className="hover:text-gray-300 transition duration-200">Membership</a>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 mt-2 px-4 py-3 space-y-3 flex flex-col items-center">
          <a href="#about" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>About</a>
          <a href="#advisory-board" className="hover:text-gray-300 transition duration-200">Advisory Board</a>
          <a href="#patron" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>Patron</a>
          <a href="#exco" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>EXCO</a>
          <a href="#contact" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>Contact</a>
          <a href="#membership" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>Membership</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;