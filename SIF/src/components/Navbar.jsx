import React, { useState } from 'react';
import SifLogo from '../assets/images/logo.jpg';
import { Menu, X } from 'lucide-react'; // Import icons for mobile menu

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Add sticky, top-0, and z-50 to the nav element
    <nav className="bg-gray-800 text-white py-4 shadow-md sticky top-0 z-50 w-full"> {/* ADDED CLASSES HERE */}
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and SIF text */}
        <a href="/" className="flex items-center flex-shrink-0" onClick={closeMobileMenu}>
          <img
            src={SifLogo}
            alt="SIF Logo"
            className="w-9 h-9 rounded-full mr-2 object-cover"
          />
          <span className="text-xl font-bold tracking-wide">SIF</span>
        </a>

        {/* Mobile menu toggle button (hamburger icon) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none focus:ring-2 focus:ring-white">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          <a href="#about" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>About</a>
          <a href="#advisory-board" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>Advisory Board</a>
          <a href="#patron" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>Patron</a>
          <a href="#exco" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>EXCO</a>
          <a href="#contact" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>Contact</a>
          <a href="#membership" className="hover:text-gray-300 transition duration-200" onClick={closeMobileMenu}>Membership</a>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 mt-2 px-4 py-3 space-y-3 flex flex-col items-center">
          <a href="#about" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>About</a>
          <a href="#advisory-board" className="block w-full text-center py-2 text-white hover:bg-gray-600 rounded" onClick={closeMobileMenu}>Advisory Board</a>
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