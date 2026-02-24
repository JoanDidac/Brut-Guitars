import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const splitWord = (word, wordClass) => {
    return word.split('').map((char, index) => {
        const isDot = char === '.';
        return (
            <span
                key={index}
                className={`hero__char ${wordClass} ${isDot ? 'hero__dot' : ''}`}
                style={{ display: 'inline-block', transformOrigin: 'center center' }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        );
    });
};

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.2, // slight delay on mount
                onComplete: () => {
                    // Start levitation after initial animation completes
                    gsap.to(".hero__keyword-mono", {
                        y: -5,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                }
            });

            // 1. "Passion" falls from above
            tl.fromTo(
                ".word-passion",
                {
                    opacity: 0,
                    y: -150
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: "bounce.out" // Soothing fall into place
                }
            );

            // 2. "Precision" (excluding the dot) falls right after
            tl.fromTo(
                ".word-precision:not(.hero__dot)",
                {
                    opacity: 0,
                    y: -150
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.08,
                    ease: "bounce.out"
                },
                "-=0.4" // Overlap slightly with Passion finishing
            );

            // 3. The dot covers the screen and shrinks to normal size
            tl.fromTo(
                ".hero__dot",
                {
                    opacity: 1, // Render it solid initially to cover screen
                    scale: 200 // Massive scale to cover the viewport
                },
                {
                    scale: 1,
                    duration: 1.5,
                    ease: "power4.inOut"
                },
                "+=0.1" // Decreased delay for faster triggering
            );

            // 4. Buttons pop in with a modern elastic stagger
            tl.fromTo(
                ".hero__actions button",
                { opacity: 0, scale: 0.7, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 1.4, stagger: 0.15, ease: "elastic.out(1.2, 0.6)" },
                "-=0.6" // Trigger dynamically as the dot shrinks
            );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <div className="hero__content container">
                <div className="hero__text">
                    <h1 className="hero__title" style={{ perspective: '400px' }}>
                        <span className="hero__combining-text">where</span>{' '}
                        <span className="hero__keyword-mono gs-text-glow">{splitWord("Passion", "word-passion")}</span><br />
                        <span className="hero__combining-text">meets</span>{' '}
                        <span className="hero__keyword-mono gs-text-glow">{splitWord("Precision.", "word-precision")}</span>
                    </h1>
                    <p className="hero__subtitle">
                        Shaped by hand, tuned by ear and built to inspire musicians who demand more from their instrument.<br />
                        Every instrument has a unique soul.
                    </p>
                    <div className="hero__actions">
                        <button
                            className="btn-pill btn-pill--dark hero__btn-left"
                            style={{ opacity: 0 }}
                            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Instruments
                        </button>
                        <button
                            className="btn-pill btn-pill--outline hero__btn-right"
                            style={{ opacity: 0 }}
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Commission a Build
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
