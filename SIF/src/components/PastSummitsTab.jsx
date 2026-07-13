import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const gallery2025 = [
  { src: '/assets/images/past_summits/001.jpeg', caption: 'SIF Summit Executive Committee and Organizing Team' },
  { src: '/assets/images/past_summits/002.jpeg', caption: 'Interactive Panel Session on Youth Leadership' },
  { src: '/assets/images/past_summits/003.jpeg', caption: 'Keynote Speaker articulating a point on stage' },
  { src: '/assets/images/past_summits/004.jpeg', caption: 'Summit Organizing Team members at the inaugural edition' },
  { src: '/assets/images/past_summits/005.jpeg', caption: 'Breakout Networking & Interactive Lunch Session' },
  { src: '/assets/images/past_summits/006.jpeg', caption: 'Summit Attendees and delegates seated in the auditorium' },
  { src: '/assets/images/past_summits/007.jpeg', caption: 'Facilitator Award of Excellence presented to Mr. Aliyu Mukhtar Usman' },
  { src: '/assets/images/past_summits/008.jpeg', caption: 'Roundtable Discussion and mentorship exchange' },
  { src: '/assets/images/past_summits/009.jpeg', caption: 'Summit team group photo with SIF Commemorative Tree Painting' },
  { src: '/assets/images/past_summits/010.jpeg', caption: 'Delegates following the key presentation details' },
  { src: '/assets/images/past_summits/011.jpeg', caption: 'Moderator Award of Excellence presented to Mr. Fareed Kamal Ibrahim' },
  { src: '/assets/images/past_summits/012.jpeg', caption: 'Summit delegates participating in the seminar sessions' },
];

function PastSummitsTab() {
  const [activeIdx, setActiveIdx] = useState(null);

  // Auto-playing slideshow states for the top hero banner
  const [heroIdx, setHeroIdx] = useState(0);
  const heroImages = gallery2025.slice(0, 5); // Use the first 5 images for the hero slides

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev + 1) % gallery2025.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev - 1 + gallery2025.length) % gallery2025.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-left">
      {/* Premium Hero Slider Banner */}
      <div className="relative h-[340px] md:h-[420px] bg-black overflow-hidden flex items-center justify-center">
        {/* Slides */}
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === heroIdx ? 'opacity-40' : 'opacity-0 pointer-events-none'
              }`}
          >
            <img
              src={img.src}
              alt={img.caption}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-[4500ms]"
              onError={(e) => { e.target.src = '/assets/logo.jpg'; }}
            />
          </div>
        ))}
        {/* Overlay content */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="bg-green-600/95 text-white text-[10px] md:text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest inline-block mb-4 shadow-md">
            Past Summits Gallery
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-sm">
            SIF 2025 Highlights
          </h1>
          <p className="text-sm md:text-base text-gray-200 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            A visual retrospective of the Ahmadu Bello University youth convergence. Relive our keynote sessions, student circles, and collaborative highlights.
          </p>
          {/* Slide Indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === heroIdx ? 'bg-green-500 w-5' : 'bg-white/40 hover:bg-white/60'
                  }`}
              ></button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Grid of all 12 pictures */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-200/80 pb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
              <ImageIcon className="w-5.5 h-5.5 text-green-600" />
              <span>Summit Photo Registry</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">Click on any image to open the full-screen slideshow browser.</p>
          </div>
          <span className="self-start md:self-auto text-xs bg-white border border-gray-200 text-gray-500 px-3 py-1.5 rounded-lg font-bold shadow-sm">
            12 Captured Moments
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery2025.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className="group bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden hover:shadow-md hover:border-green-300 transition duration-300 flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = '/assets/logo.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="bg-white/95 shadow text-[10px] font-bold text-gray-700 px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                    View Photo
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between border-t border-gray-50">
                <h4 className="text-xs font-bold text-gray-600 leading-snug line-clamp-2">
                  {img.caption}
                </h4>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                  <span className="text-[9px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                    SIS 2025
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    Photo {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slideshow Modal Overlay */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setActiveIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition z-50 shadow-md"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition z-50 shadow-md"
            title="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image display container */}
          <div className="relative max-w-4xl max-h-[75vh] w-full flex items-center justify-center animate-scaleIn">
            <img
              src={gallery2025[activeIdx].src}
              alt={gallery2025[activeIdx].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              onError={(e) => {
                e.target.src = '/assets/logo.jpg';
              }}
            />
          </div>

          {/* Caption and index info */}
          <div
            className="text-center mt-6 max-w-2xl px-4 select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-bold text-white tracking-wide">
              {gallery2025[activeIdx].caption}
            </p>
            <p className="text-xs text-green-500 font-semibold mt-1">
              Students Interactive Summit 2025
            </p>
            <div className="inline-block mt-4 bg-white/10 px-3 py-1 rounded-full text-[10px] text-gray-300 font-bold">
              {activeIdx + 1} of {gallery2025.length}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition z-50 shadow-md"
            title="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PastSummitsTab;
