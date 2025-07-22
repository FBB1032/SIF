import React, { useState, useEffect } from 'react';

 function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
  const interval = setInterval(() => {
  setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(interval);
  }, [targetDate]);

  function calculateTimeLeft() {
  const now = new Date();
  const difference = new Date(targetDate).getTime() - now.getTime();

  if (difference > 0) {
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
  } else {
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
  <div className="bg-gray-100 py-10">
  <div className="container mx-auto px-4 text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">
  Event Starting In:
  </h2>
  <div className="flex justify-center items-center space-x-4 md:space-x-8">
  <div className="bg-white rounded-lg shadow-md p-4">
  <span className="block text-4xl font-bold text-blue-500">{days}</span>
  <span className="block text-gray-600 text-sm mt-1">Days</span>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
  <span className="block text-4xl font-bold text-green-500">{hours}</span>
  <span className="block text-gray-600 text-sm mt-1">Hours</span>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
  <span className="block text-4xl font-bold text-yellow-500">{minutes}</span>
  <span className="block text-gray-600 text-sm mt-1">Minutes</span>
  </div>
  <div className="bg-white rounded-lg shadow-md p-4">
  <span className="block text-4xl font-bold text-red-500">{seconds}</span>
  <span className="block text-gray-600 text-sm mt-1">Seconds</span>
  </div>
  </div>
  {days === 0 && hours === 0 && minutes === 0 && seconds === 0 && (
  <p className="mt-8 text-lg text-green-600 font-semibold">The event has started!</p>
  )}
  </div>
  </div>
  );
 }

 export default Countdown;