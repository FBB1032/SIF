import React, { useState } from 'react';
import SifLogo from '../assets/images/logo.jpg';
import { Menu, X } from 'lucide-react';

function Navbar({ activeTab, setActiveTab }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Summit', id: 'summit' },
    /**{ label: 'Speakers', id: 'speakers' },**/
    { label: 'Advisory Board', id: 'advisory' },
    { label: 'Past Summits', id: 'past-summits' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="bg-white text-gray-800 py-3 shadow-sm border-b border-gray-100 sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo and SIF text */}
        <button
          onClick={() => { setActiveTab('home'); closeMobileMenu(); }}
          className="flex items-center flex-shrink-0 focus:outline-none"
        >
          <img
            src={SifLogo}
            alt="SIF Logo"
            className="w-10 h-10 rounded-full mr-2 p-0.5 bg-white object-contain border border-green-100 shadow-sm"
          />
          <div className="flex flex-col items-start leading-none">
            <span className="text-lg font-bold tracking-tight text-green-700">STUDENTS</span>
            <span className="text-[10px] tracking-widest text-gray-500 font-semibold uppercase">Interactive Forum</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); }}
              className={`py-2 px-1 border-b-2 transition duration-200 focus:outline-none ${
                activeTab === item.id
                  ? 'border-green-600 text-green-600 font-bold'
                  : 'border-transparent text-gray-600 hover:text-green-600 hover:border-green-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Register Now Button (Desktop) */}
        <div className="hidden lg:block">
          <button
            onClick={() => { setActiveTab('register'); }}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2 px-5 rounded transition duration-200 shadow-sm"
          >
            Register Now
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 focus:outline-none p-1 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-100 px-4 py-3 space-y-2 flex flex-col items-stretch animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); closeMobileMenu(); }}
              className={`w-full text-left py-2 px-3 rounded text-sm transition ${
                activeTab === item.id
                  ? 'bg-green-50 text-green-700 font-bold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-green-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { setActiveTab('register'); closeMobileMenu(); }}
            className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold text-sm py-2 rounded transition"
          >
            Register Now
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;