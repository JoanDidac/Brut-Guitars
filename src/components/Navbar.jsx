import { useState, useEffect } from 'react';
import brandLogo from '../assets/brut_logo.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__logo" href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={brandLogo} alt="Brut Guitars Logo" className="navbar__logo-img" />
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {['about', 'gallery', 'process', 'contact'].map((item) => (
            <li key={item}>
              <button className="navbar__link" onClick={() => handleNav(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
