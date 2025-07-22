import React from 'react';
import Countdown from './Countdown'; // Adjust path if needed

function Hero() {
  // Set the target date for the next SIF event, competition, or deadline
  const eventDate = '2025-08-09T09:00:00'; // Example: May 15, 2025, 6:00 PM (WAT - your current timezone)

  const heroStyles = {
    backgroundColor: '#00BF63', // Forest Green
    paddingTop: '8rem',
    paddingBottom: '8rem',
    textAlign: 'center',
    color: 'white'
  };

  return (
    <div style={heroStyles}>
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to the Student Interactive Forum (SIF)
        </h1>
        <p className="text-xl mb-10">
          Join a vibrant community of students passionate about critical thinking, productive discussions, and making a difference.
        </p>

        <Countdown targetDate={eventDate} />

        <div className="mt-12 flex justify-center space-x-4">
          <a
            href="#membership" // Link to your membership page
            className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-full shadow-lg"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
