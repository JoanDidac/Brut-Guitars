import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <span className="footer__logo">Brut Guitars</span>
                        <p className="footer__tagline">
                            Handcrafted custom guitars, built with passion and precision in La Garriga, Catalonia.
                        </p>
                    </div>

                    <div className="footer__links-group">
                        <h4 className="footer__links-title">Navigate</h4>
                        <ul className="footer__links">
                            <li><a href="#about">About</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                            <li><a href="#process">Process</a></li>
                            <li><a href="#contact">Contact</a></li>
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
