import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Gallery from './components/Gallery';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useGsapAnimations from './hooks/useGsapAnimations';

function App() {
  useGsapAnimations();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
