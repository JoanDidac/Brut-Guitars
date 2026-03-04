import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

import craftImg1 from '../assets/about-workshop.jpg';
import craftImg2 from '../assets/gallery-fretboard-new.jpg'; // Updated to use the new downloaded fretboard image
import craftImg3 from '../assets/gallery-luthier-playing.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Image Carousel Crossfade
            const images = gsap.utils.toArray('.about__carousel-img');
            gsap.set(images[0], { opacity: 1 }); // Start with first image visible

            const carouselTl = gsap.timeline({ repeat: -1 });

            images.forEach((img, index) => {
                const nextImg = images[(index + 1) % images.length];

                carouselTl
                    // Wait for the viewing period
                    .to({}, { duration: 3 })
                    // Crossfade
                    .to(img, { opacity: 0, duration: 1.5, ease: "power2.inOut" }, `fade${index}`)
                    .to(nextImg, { opacity: 1, duration: 1.5, ease: "power2.inOut" }, `fade${index}`);
            });

            // 2. Continuous Background Shapes Animation

            // Set initial position of the dot so its center is aligned with the container edge
            gsap.set(".about__shape--dot", { xPercent: -50, yPercent: -50 });

            let mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                // Desktop: Dot starts covering the text, then scrubs exactly to the edge of the 'D'
                // The left edge of the text is exactly at clientWidth / 2 + 64px.
                // Circle radius is 625px. Target target distance is clientWidth / 2 - 570 to barely touch the text.
                gsap.fromTo(".about__shape--dot",
                    { x: () => document.documentElement.clientWidth / 2 - 300 }, // Start covering the text
                    {
                        x: () => document.documentElement.clientWidth / 2 - 570, // Exact landing spot to make H1 readable, colliding with 'D' without overlapping
                        ease: "ease", // Smooth movement tied to scroll
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 0.5,
                            invalidateOnRefresh: true // Forces GSAP to recalculate functions on resize
                        }
                    }
                );
            });

            mm.add("(max-width: 768px)", () => {
                // Mobile: Dot sits slightly behind the carousel at the top, subtly translating horizontally
                gsap.fromTo(".about__shape--dot",
                    { x: () => -500 }, // Started far left
                    {
                        x: () => -200, // Move into center view, filling background behind image
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 0.5,
                            invalidateOnRefresh: true
                        }
                    }
                );
            });

            // Subtle horizontal parallax for the Stat Numbers
            // They start further left and slowly drift right until they hit the end of their box based on scroll
            gsap.fromTo(".about__stat-number",
                { x: "-20px" }, // Start 20px to the left per user
                {
                    x: "37.5px", // Increased rightward drift per user request
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".about__stats",
                        start: "top bottom", // Start moving when the stats enter the screen
                        end: "top 20%", // Finish when they are near the top
                        scrub: 1 // Smooth movement tied to scroll
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="about section" id="about" ref={sectionRef}>
            <div className="about__shapes-container">
                {/* Shapes positioned via CSS to stay left/bottom avoiding right-side text */}
                <div className="about__shape about__shape--dot"></div>
            </div>

            <div className="container about__grid">
                <div className="about__image-wrap gs-reveal-left">
                    <img src={craftImg1} alt="Luthier working on a guitar contour" className="about__image about__carousel-img" />
                    <img src={craftImg2} alt="Luthier precision work measuring" className="about__image about__carousel-img" />
                    <img src={craftImg3} alt="Luthier fitting components" className="about__image about__carousel-img" />
                </div>

                <div className="about__content gs-reveal-right">
                    <span className="section-label">The Craftsman</span>
                    <h2 className="section-title">Built by Hand,<br />Designed by Ear</h2>
                    <p className="about__text">
                        With over a decade of dedication to the craft, every Brut Guitar begins as a
                        carefully selected tonewood and transforms into a one-of-a-kind instrument
                        through hours of meticulous handwork.
                    </p>
                    <p className="about__text">
                        From the initial sketch to the final setup, each guitar reflects a deep
                        understanding of wood, acoustics, and the unique needs of every musician.
                        No two instruments are alike — because no two players are the same.
                    </p>

                    <hr className="dashed-divider" />

                    <div className="about__stats gs-stagger">
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">10+</span>
                            <span className="about__stat-label">Years of Craft</span>
                        </div>
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">1000+</span>
                            <span className="about__stat-label">Guitars Serviced</span>
                        </div>
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">100%</span>
                            <span className="about__stat-label">Customer Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
