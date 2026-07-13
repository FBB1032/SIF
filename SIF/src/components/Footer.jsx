import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

function Footer({ setActiveTab }) {
  const handleLink = (tab) => (e) => {
    e.preventDefault();
    if (setActiveTab) {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="footer-info text-left">
            <button onClick={handleLink('home')} className="logo text-lg font-bold text-green-500 focus:outline-none mb-3 block">
              STUDENTS INTERACTIVE FORUM
            </button>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              The Student Interactive Forum (SIF), established in 2023, is a student-led platform dedicated to fostering critical thinking, open dialogue, and social impact. SIF continues to grow as a space for meaningful interaction and positive change.
            </p>
            <div className="social-links flex mt-6 space-x-4">
              <a href="https://x.com/sif_ng/status/1942116585407201377?s=46" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.facebook.com/share/p/1GM3AE1fNh/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/p/DLzDHE-C0gp/?igsh=MXdzY2ZtcmY3ajYwdA==" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/posts/student-interactive-forum-sif-abu-zaria-9ab969319_youthineconomy-policyandinnovation-leadership-activity-7347885137893691392-4nIR?utm_medium=ios_app&rcm=ACoAAEJhnI4BuFd4vUAPEmMba3sN_wu097wuv1s&utm_source=social_share_send&utm_campaign=copy_link" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links text-left">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-green-500">Quick Links</h4>
            <ul className="list-none p-0 text-sm text-gray-400 space-y-2.5">
              <li><a href="#" onClick={handleLink('home')} className="hover:text-white transition">Home</a></li>
              <li><a href="#" onClick={handleLink('about')} className="hover:text-white transition">About SIF</a></li>
              <li><a href="#" onClick={handleLink('summit')} className="hover:text-white transition">SIF Summit</a></li>
              <li><a href="#" onClick={handleLink('speakers')} className="hover:text-white transition">Summit Speakers</a></li>
              <li><a href="#" onClick={handleLink('advisory')} className="hover:text-white transition">Advisory Board</a></li>
              <li><a href="#" onClick={handleLink('past-summits')} className="hover:text-white transition">Past Summits</a></li>
              <li><a href="#" onClick={handleLink('contact')} className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-links text-left">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-green-500">Core Summit Pillars</h4>
            <ul className="list-none p-0 text-sm text-gray-400 space-y-2.5">
              <li>Interactive Forums</li>
              <li>Skill-Building Workshops</li>
              <li>Networking & Dialogue</li>
              <li>Community Impact Projects</li>
            </ul>
          </div>

          <div className="footer-contact text-left">
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-800 pb-2 text-green-500">Get in Touch</h4>
            <p className="text-sm text-gray-400 space-y-2">
              <strong>Location:</strong><br />
              Ahmadu Bello University (ABU), Zaria<br />
              Kaduna State, Nigeria <br /><br />
              <strong>Email:</strong> studentsinteractiveforum@gmail.com<br />
              <strong>Phone:</strong> 08160489887<br />
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Students Interactive Forum (SIF). All Rights Reserved.</p>
          <p className="text-xs">
            Design by <span className="font-semibold text-green-500">Fahd Badamasi</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;