import React, { useState, useEffect } from 'react';

// Define the target date and time for the event
// August 23rd, 2025, 9:00 AM WAT (GMT+0100)
const EVENT_TARGET_DATE = "August 23, 2025 09:00:00 GMT+0100";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    // Initial calculation when component mounts
    const initialTimeLeft = calculateTimeLeft();
    if (initialTimeLeft.total <= 0) {
      setEventStarted(true);
    } else {
      setTimeLeft(initialTimeLeft);
    }

    // Set up interval for countdown
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft.total <= 0) {
        setEventStarted(true);
        clearInterval(interval); // Stop the interval once the event starts
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs once on mount

  function calculateTimeLeft() {
    const now = new Date();
    const target = new Date(EVENT_TARGET_DATE);
    const difference = target.getTime() - now.getTime(); // Difference in milliseconds

    if (difference <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { total: difference, days, hours, minutes, seconds };
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="bg-gray-100 py-10"> {/* You can adjust this background if it's not fitting your theme */}
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {eventStarted ? "The Student Interactive Summit is LIVE!" : "Student Interactive Summit Starting In:"}
        </h2>
        {eventStarted ? (
          <p className="mt-8 text-2xl text-sif-green font-semibold animate-pulse">
            Join us now!
          </p>
        ) : (
          <div className="flex justify-center items-center space-x-4 md:space-x-8 flex-wrap"> {/* flex-wrap for mobile */}
            {/* Days */}
            <div className="bg-white rounded-lg shadow-md p-4 m-2 min-w-[100px]">
              <span className="block text-4xl font-bold text-blue-500">{days}</span> {/* Blue */}
              <span className="block text-gray-600 text-sm mt-1">Days</span>
            </div>
            {/* Hours */}
            <div className="bg-white rounded-lg shadow-md p-4 m-2 min-w-[100px]">
              <span className="block text-4xl font-bold text-green-500">{hours}</span> {/* Green */}
              <span className="block text-gray-600 text-sm mt-1">Hours</span>
            </div>
            {/* Minutes */}
            <div className="bg-white rounded-lg shadow-md p-4 m-2 min-w-[100px]">
              <span className="block text-4xl font-bold text-yellow-500">{minutes}</span> {/* Yellow */}
              <span className="block text-gray-600 text-sm mt-1">Minutes</span>
            </div>
            {/* Seconds */}
            <div className="bg-white rounded-lg shadow-md p-4 m-2 min-w-[100px]">
              <span className="block text-4xl font-bold text-red-500">{seconds}</span> {/* Red */}
              <span className="block text-gray-600 text-sm mt-1">Seconds</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;