import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

import craftImg1 from '../assets/about-workshop.jpg';
import craftImg2 from '../assets/gallery-fretboard.jpg';
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

            // Entrance animation for the massive dot: drift slowly from the left side towards the right.
            gsap.fromTo(".about__shape--dot",
                { x: "-90vw" }, // Start far left, 10vw further to right than before
                {
                    x: "-17vw", // Final tweak to -17vw per user
                    duration: 4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom", // Starts as soon as the section enters the viewport
                        toggleActions: "play none none none"
                    }
                }
            );

            // Parallax movement on scroll for shapes to give depth
            // Dot: Moves on the Y axis, locked to scroll, while X drift happens independently
            gsap.to(".about__shape--dot", {
                y: 600, // Move it 600px down while scrolling past
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
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
                            <span className="about__stat-number">100+</span>
                            <span className="about__stat-label">Guitars Built</span>
                        </div>
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">100%</span>
                            <span className="about__stat-label">Handmade</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
