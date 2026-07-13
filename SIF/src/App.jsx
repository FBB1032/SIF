import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import AdvisoryBoard from './components/AdvisoryBoard';
import EXCO from './components/EXCO';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Dedicated Tab Components
import AboutTab from './components/AboutTab';
import SummitTab from './components/SummitTab';
import SpeakersTab from './components/SpeakersTab';
import PastSummitsTab from './components/PastSummitsTab';
import RegisterTab from './components/RegisterTab';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero setActiveTab={setActiveTab} />
            <Countdown />
            <About onReadMore={() => setActiveTab('about')} />
            <Services />
            <Team />
            <EXCO />
          </>
        );
      case 'about':
        return <AboutTab />;
      case 'summit':
        return <SummitTab setActiveTab={setActiveTab} />;
      case 'speakers':
        return <SpeakersTab />;
      case 'advisory':
        return <AdvisoryBoard showBanner={true} />;
      case 'past-summits':
        return <PastSummitsTab />;
      case 'contact':
        return <Contact showBanner={true} />;
      case 'register':
        return <RegisterTab />;
      default:
        return <div className="py-24 text-center">Page Not Found</div>;
    }
  };

  return (
    <div className="bg-green-50 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>{renderContent()}</main>
      </div>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
