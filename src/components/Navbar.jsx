import { useState, useEffect } from 'react';
import brandLogo from '../assets/brut_logo.png';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMobileOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home', id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__logo" href="/" onClick={(e) => { 
          if (currentPage !== 'home') {
            e.preventDefault();
            sessionStorage.removeItem('brut_currentPage');
            sessionStorage.removeItem('brut_selectedService');
            window.location.href = '/';
          } else {
            e.preventDefault();
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <img src={brandLogo} alt="Brut Guitars Logo" className={`navbar__logo-img ${mobileOpen ? 'hidden-opacity' : ''}`} />

          {/* Animated Mobile Logo Slices */}
          <div className={`navbar__animated-logo ${mobileOpen ? 'navbar__animated-logo--open' : ''}`}>
            <img src={brandLogo} className="nav-slice slice-b" alt="" />
            <img src={brandLogo} className="nav-slice slice-r" alt="" />
            <img src={brandLogo} className="nav-slice slice-u" alt="" />
            <img src={brandLogo} className="nav-slice slice-t" alt="" />
          </div>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {['about', 'gallery', 'process', 'services', 'contact'].map((item) => (
            <li key={item}>
              <button className="navbar__link" onClick={() => handleNav(item)}>
                {item}
              </button>
            </li>
          ))}
          {/* Dark mode toggle — visible only inside mobile menu */}
          <li className="navbar__theme-toggle--mobile">
            <ThemeToggle />
          </li>
        </ul>

        {/* Dark mode toggle — visible only on desktop, at the far right */}
        <div className="navbar__actions">
          <ThemeToggle />
        </div>

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
