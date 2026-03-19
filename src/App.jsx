import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage'; // Creating this component next
import useGsapAnimations from './hooks/useGsapAnimations';
import PickGraphic from './components/PickGraphic';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return sessionStorage.getItem('brut_currentPage') || 'home';
  });
  const [selectedService, setSelectedService] = useState(() => {
    return sessionStorage.getItem('brut_selectedService') || null;
  });
  const [pendingScroll, setPendingScroll] = useState(null);

  useGsapAnimations([currentPage]);

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    sessionStorage.setItem('brut_currentPage', page);

    if (page === 'services') {
      setSelectedService(data);
      if (data) {
        sessionStorage.setItem('brut_selectedService', data);
      } else {
        sessionStorage.removeItem('brut_selectedService');
      }
      window.scrollTo(0, 0);
    } else if (page === 'home') {
      if (data) {
        setPendingScroll(data);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  useEffect(() => {
    if (currentPage === 'home' && pendingScroll) {
      // Small timeout to allow DOM to attach first
      setTimeout(() => {
        document.getElementById(pendingScroll)?.scrollIntoView({ behavior: 'smooth' });
        setPendingScroll(null);
      }, 50);
    }
  }, [currentPage, pendingScroll]);

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <Marquee />
            <About />
            <Gallery />

            {/* Guitar Pick Transition Graphic (Animated) */}
            <PickGraphic />

            <Process />
            <Services onNavigate={navigateTo} />
            <Contact />
          </>
        )}
        {currentPage === 'services' && (
          <ServicesPage selectedCategory={selectedService} onNavigate={navigateTo} />
        )}
      </main>
      <Footer onNavigate={navigateTo} currentPage={currentPage} />
    </>
  );
}

export default App;
