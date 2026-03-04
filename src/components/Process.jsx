import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';
import bassBlueprint from '../assets/bass-blueprint.jpg';
import process1 from '../assets/process_1.png';
import process2 from '../assets/process_2.png';
import process3 from '../assets/workshop-1.jpg'; // Placeholder
import process4 from '../assets/process_4.png';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Consultation',
        description: 'We discuss your playing style, tonal preferences, and the music that moves you.',
        image: process1
    },
    {
        number: '02',
        title: 'Wood Selection',
        description: 'Hand-picked tonewoods chosen for their acoustic properties and grain character.',
        image: process2
    },
    {
        number: '03',
        title: 'Shaping & Carving',
        description: 'Each body and neck is hand-shaped using traditional tools and refined techniques.',
        image: process3
    },
    {
        number: '04',
        title: 'Finishing & Setup',
        description: 'Meticulous finishing, fretwork, electronics, and a professional setup.',
        image: process4
    },
];

export default function Process() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.process__step');

            // Set initial state: all cards stacked to the left, slightly rotated and hidden
            gsap.set(cards, {
                x: (index) => -200 - (index * 150), // Stack them further left based on index
                y: (index) => 50 + (index * 20),
                rotation: (index) => -15 + (index * 5),
                opacity: 0,
                scale: 0.8
            });

            // Create a timeline hooked to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process__steps",
                    start: "top 85%", // Starts when the container enters the viewport
                    end: "top 30%",   // Ends when the container is closer to the center
                    scrub: 1.5,       // Smooth scrubbing
                }
            });

            // Animate cards magically fanning out into their grid positions
            tl.to(cards, {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1, // Slight delay between each card's arrival
                ease: "power3.out",
                duration: 2
            });

            // Second timeline: Scatter the cards away when scrolling down to the next section
            const scatterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".process__steps", // Watch the specific container rather than the entire process section
                    start: "top 20%", // Triggers just after the previous fan animation ends (which is at top 30%)
                    end: "bottom top", // Ends when the bottom of the container hits the top of the viewport
                    scrub: 1.5,
                }
            });

            // Cards 0 and 1 (Left ones) go diagonal upper left
            scatterTl.to([cards[0], cards[1]], {
                x: (index) => -300 - (index * 150), // Move left
                y: -400, // Move up
                rotation: -45, // Spin out
                opacity: 0,
                scale: 0.6,
                ease: "power2.in"
            }, 0);

            // Cards 2 and 3 (Right ones) go diagonal upper right
            scatterTl.to([cards[2], cards[3]], {
                x: (index) => 300 + (index * 150), // Move right
                y: -400, // Move up // Note: index here is 0 and 1 for the selected array
                rotation: 45, // Spin out
                opacity: 0,
                scale: 0.6,
                ease: "power2.in"
            }, 0);

            // Responsive GSAP animations for text readability over the overlapping Gallery SVG
            let mm = gsap.matchMedia();
            mm.add("(max-width: 768px)", () => {
                // The massive dark Gallery background flows into this section on mobile.
                // Shift the paragraph text to cream so it's easily readable against the dark background.
                gsap.to(".process__subtitle", {
                    color: "var(--color-bg)",
                    scrollTrigger: {
                        trigger: ".process__header",
                        start: "top 55%", // When header hits middle of screen, start turning cream
                        end: "top 30%",   // Fully cream by the time it reaches upper third
                        scrub: true
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="process section" id="process" ref={sectionRef}>
            <div className="container" style={{ position: 'relative' }}>
                <div className="process__header gs-reveal">
                    <span className="section-label">The Process</span>
                    <h2 className="section-title">From Vision to Voice</h2>

                    {/* Second subtitle: animates to creamy color on mobile for contrast with overlapping background */}
                    <p className="section-subtitle process__subtitle" style={{ margin: 0, fontWeight: 400 }}>
                        Building a custom guitar is a journey. Here&apos;s how we bring your dream instrument to life.
                    </p>
                </div>

                <div className="process__steps" style={{ position: 'relative', zIndex: 4, marginTop: '4rem' }}>
                    {/* Background Blueprint Image */}
                    <img
                        src={bassBlueprint}
                        alt="Bass Blueprint Background"
                        style={{
                            position: 'absolute',
                            top: '60%', // Lowered by 10%
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(90deg)', // Rotated 90deg to the right
                            width: '246.4%', // Decreased by 20%
                            height: '246.4%',
                            objectFit: 'contain',
                            zIndex: 0,
                            opacity: 0.15, // Subtle background effect
                            pointerEvents: 'none'
                        }}
                    />
                    {steps.map((step) => (
                        <div className="process__step" key={step.number} style={{ position: 'relative', zIndex: 1 }}>
                            <div className="process__step-inner">
                                {/* Front of Card */}
                                <div className="process__step-front">
                                    <div className="process__step-number">{step.number}</div>
                                    <h3 className="process__step-title">{step.title}</h3>
                                    <p className="process__step-desc">{step.description}</p>
                                </div>
                                {/* Back of Card: Image */}
                                <div className="process__step-back">
                                    <img src={step.image} alt={step.title} className="process__step-back-img" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
