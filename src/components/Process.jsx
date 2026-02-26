import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';
import bassBlueprint from '../assets/bass-blueprint.jpg';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Consultation',
        description: 'We discuss your playing style, tonal preferences, and the music that moves you.',
    },
    {
        number: '02',
        title: 'Wood Selection',
        description: 'Hand-picked tonewoods chosen for their acoustic properties and grain character.',
    },
    {
        number: '03',
        title: 'Shaping & Carving',
        description: 'Each body and neck is hand-shaped using traditional tools and refined techniques.',
    },
    {
        number: '04',
        title: 'Finishing & Setup',
        description: 'Meticulous finishing, fretwork, electronics, and a professional setup.',
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

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="process section" id="process" ref={sectionRef}>
            <div className="container">
                <div className="process__header gs-reveal">
                    <span className="section-label">The Process</span>
                    <h2 className="section-title">From Vision to Voice</h2>
                    <p className="section-subtitle" style={{ whiteSpace: "nowrap", margin: 0 }}>
                        Building a custom guitar is a journey. Here&apos;s how we bring your dream instrument to life.
                    </p>
                </div>

                <div className="process__steps" style={{ position: 'relative' }}>
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
                            <div className="process__step-number">{step.number}</div>
                            <h3 className="process__step-title">{step.title}</h3>
                            <p className="process__step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
