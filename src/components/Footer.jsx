import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import brandLogo from '../assets/brut_logo.png';
import brandLogoLarge from '../assets/Brut logo.PNG';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onNavigate }) {
    const year = new Date().getFullYear();
    const footerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const slices = gsap.utils.toArray('.pre-footer__logo-slice');

            if (slices.length) {
                // Start the logo pieces pushed down initially
                gsap.fromTo(slices,
                    {
                        y: 350 // Start much lower, looking 50% submerged into the footer area
                    },
                    {
                        y: 0, // End exactly in the center of the pre-footer container, preventing overlap with the contact section
                        ease: "power2.out", // Smooth easing at the end
                        stagger: 0.15, // Delay each letter slightly for the staggered rise!
                        scrollTrigger: {
                            trigger: ".pre-footer",
                            start: "top 90%", // Start when the pre-footer enters the very bottom of the screen
                            end: "top 30%", // Finish before the pre-footer hits the top of the screen
                            scrub: 1.5 // Tie animation proportionally to scroll position with slight smoothing
                        }
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleNav = (e, id) => {
        e.preventDefault();
        if (onNavigate) {
            onNavigate('home', id);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div ref={footerRef}>
            <section className="pre-footer">
                <div className="container pre-footer__container gs-reveal">
                    {/* The 4 staggered slices of the single image */}
                    <img src={brandLogoLarge} alt="Letter B" className="pre-footer__logo-slice slice-b" />
                    <img src={brandLogoLarge} alt="Letter R" className="pre-footer__logo-slice slice-r" />
                    <img src={brandLogoLarge} alt="Letter U" className="pre-footer__logo-slice slice-u" />
                    <img src={brandLogoLarge} alt="Letter T" className="pre-footer__logo-slice slice-t" />
                </div>
            </section>

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
        </div>
    );
}
