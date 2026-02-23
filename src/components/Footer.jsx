import './Footer.css';
import brandLogo from '../assets/brut_logo.png';

export default function Footer({ onNavigate }) {
    const year = new Date().getFullYear();

    const handleNav = (e, id) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('home', id);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <img src={brandLogo} alt="Brut Guitars Logo" className="footer__logo-img" />
                        <p className="footer__tagline">
                            Handcrafted custom guitars, built with passion and precision in La Garriga, Catalonia.
                        </p>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Navigate</h4>
                        <ul className="footer__links">
                            <li><a href="#about" onClick={(e) => handleNav(e, 'about')}>About</a></li>
                            <li><a href="#gallery" onClick={(e) => handleNav(e, 'gallery')}>Gallery</a></li>
                            <li><a href="#process" onClick={(e) => handleNav(e, 'process')}>Process</a></li>
                            <li><a href="#contact" onClick={(e) => handleNav(e, 'contact')}>Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Follow</h4>
                        <ul className="footer__links">
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        </ul>
                    </div>
                </div>

                <hr className="dashed-divider" />

                <div className="footer__bottom">
                    <p>&copy; {year} Brut Guitars. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
