import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import AdvisoryBoard from './components/AdvisoryBoard';
import EXCO from './components/EXCO';
import Contact from './components/Contact';
import Membership from './components/Membership';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-green-50 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Team />
      <AdvisoryBoard />
      <EXCO />
      <Contact />
     <Membership />
      <Footer />
    </div>
  );
}

export default App;
