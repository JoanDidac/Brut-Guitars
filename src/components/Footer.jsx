import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import brandLogo from '../assets/devil-horns-svgrepo-com.svg';
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

                {/* SVG S-Curve overlapping the letters inside pre-footer */}
                <svg className="pre-footer__wave" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M 0 40 A 50 20 0 0 1 50 20 A 50 20 0 0 0 100 0 L 100 40 Z" />
                </svg>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer__top">
                        <div className="footer__brand">
                            <img src={brandLogo} alt="Devil Horns Logo" className="footer__logo-img" />
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
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                        <span className="social-text">Instagram</span>
                                        <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                        <span className="social-text">YouTube</span>
                                        <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                        <span className="social-text">Facebook</span>
                                        <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                </li>
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
