import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import social media icons

function Footer() {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="footer-info">
            <a href="./src/assets/images/logo.jpg" className="logo text-lg font-bold">
              SIF {/* Replace with your actual logo or text */}
            </a>
            <p className="mt-2 text-sm text-gray-400">
              The Student Interactive Forum (SIF), established in 2023, is a student-led platform dedicated to fostering critical thinking, open dialogue, and social impact. It offers forums, workshops, and community projects to empower students as thoughtful leaders. SIF continues to grow as a space for meaningful interaction and positive change.
            </p>
            <div className="social-links flex mt-4 space-x-4">
              <a href="https://x.com/sif_ng/status/1942116585407201377?s=46" className="text-gray-400 hover:text-blue-300">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.facebook.com/share/p/1GM3AE1fNh/?mibextid=wwXIfr" className="text-gray-400 hover:text-blue-600">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/p/DLzDHE-C0gp/?igsh=MXdzY2ZtcmY3ajYwdA==" className="text-gray-400 hover:text-pink-500">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/posts/student-interactive-forum-sif-abu-zaria-9ab969319_youthineconomy-policyandinnovation-leadership-activity-7347885137893691392-4nIR?utm_medium=ios_app&rcm=ACoAAEJhnI4BuFd4vUAPEmMba3sN_wu097wuv1s&utm_source=social_share_send&utm_campaign=copy_link" className="text-gray-400 hover:text-blue-500">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
            <ul className="list-none p-0 text-sm text-gray-400">
              <li className="mb-1"><a href="/" className="hover:text-white">Home</a></li>
              <li className="mb-1"><a href="/about" className="hover:text-white">About</a></li>
              <li className="mb-1"><a href="/services" className="hover:text-white">Services</a></li>
              <li className="mb-1"><a href="/team" className="hover:text-white">Team</a></li>
              <li className="mb-1"><a href="/exco" className="hover:text-white">EXCO</a></li>
            
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="text-lg font-semibold mb-2">Our Services</h4>
            <ul className="list-none p-0 text-sm text-gray-400">
              <li className="mb-1"><a href="#" className="hover:text-white">Community Impact Projects</a></li>
              <li className="mb-1"><a href="#" className="hover:text-white">Public Speaking</a></li>
              <li className="mb-1"><a href="#" className="hover:text-white">Skill-Building Workshops</a></li>
              <li><a href="#" className="hover:text-white">Interactive Discussion Forums</a></li>
            </ul>
          </div>

          <div className="footer-contact text-center md:text-left">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-400">
              Ahmadu bello university (ABU) <br />
              Zaria,Kaduna State <br />
              Nigeria <br /><br />
              <strong>Phone:</strong> +2348144733943<br />
              <strong>Email:</strong> studentsinteractiveforum@gmail.com<br />
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} SIF. All Rights Reserved.</p>
        
      </div>
    </footer>
  );
}

export default Footer;