import React from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import EXCO from './components/EXCO';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Navbar />
      <About />
      <EXCO />
      <Contact />
      <Membership />
      <Footer />
    </div>
  );
}

export default App;
