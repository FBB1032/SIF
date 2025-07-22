import React, { useState, useEffect } from 'react';

const images = [
  '/assets/images/about/001.jpg',
  '/assets/images/about/002.jpg',
  '/assets/images/about/003.jpg',
  '/assets/images/about/004.jpg',
];

function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">About Us</h2>
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="relative rounded-lg overflow-hidden shadow-md">
              <img
                src={images[currentImageIndex]}
                alt={`About Us - Image ${currentImageIndex + 1}`}
                className="w-full h-auto"
              />
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
              >
                &lt;
              </button>
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="md:w-1/2 md:ml-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
            The Student Interactive Forum (SIF) was established in 2023 with a mission to cultivate a vibrant, inclusive community of students passionate about critical thinking, engaging dialogue, and positive change. SIF was founded on the belief that meaningful conversations and collaborative learning are essential for personal growth and societal progress.
SIF serves as a dynamic platform where students from diverse backgrounds come together to exchange ideas, challenge perspectives, and engage in constructive discussions on a wide range of topics—from academic interests to global issues. 


            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Through debates, discussion panels, reading circles, workshops, and community engagement programs, we strive to enhance intellectual curiosity, promote respectful dialogue, and empower students to become socially responsible leaders. Our activities are designed to sharpen analytical thinking, foster empathy, and encourage students to explore diverse perspectives on contemporary issues.
            
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
            Join us as we continue to grow as a hub for meaningful conversations, lifelong learning, and student-led impact, shaping a future where informed voices lead the way toward a better society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
