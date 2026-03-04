import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';
import img1 from '../assets/gallery-bass-body.jpg';
import img2 from '../assets/gallery-bass-closeup.jpg';
import img3 from '../assets/gallery-bass-angle.jpg';
import img4 from '../assets/gallery-headstock.jpg';
import img5 from '../assets/gallery-fretboard-new.jpg'; // Updated to use the new downloaded fretboard image
import img6 from '../assets/gallery-luthier-playing.jpg';
import musicNote1 from '../assets/music-note-filled.png';
import claveSol from '../assets/Clave-Sol.svg';
import claveBajo from '../assets/Clave-Bajo.svg';
import bgSvg from '../assets/background-eraser-svgrepo-com.svg';

gsap.registerPlugin(ScrollTrigger);

const guitars = [
    { id: 1, name: 'Walnut Burl 5-String', spec: 'Burl walnut top · Dual humbuckers', image: img1 },
    { id: 2, name: 'Maple Body Close-up', spec: 'Figured maple body · Custom pickups', image: img2 },
    { id: 3, name: 'Custom Bass Build', spec: 'Handcrafted body · Premium tonewoods', image: img3 },
    { id: 4, name: 'BRUT Headstock', spec: 'Hand-shaped headstock · Precision tuners', image: img4 },
    { id: 5, name: 'Fretboard Detail', spec: 'Rosewood fretboard · Hand-dressed frets', image: img5 },
    { id: 6, name: 'In the Hands', spec: 'Road-tested by the maker himself', image: img6 },
];

export default function Gallery() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Apply a subtle parallax on scroll: start the header elements 30vh higher 
            // and have them settle into their standard DOM position as we scroll
            gsap.fromTo(".gallery__header.gs-reveal",
                { y: "-30vh" }, // Changed to -30vh per user
                {
                    y: "0vh",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom", // Starts as soon as the Gallery section enters the viewport
                        end: "top 20%", // Finishes moving relatively quickly
                        scrub: 1.5 // Added a smoothing factor to the scrub
                    }
                }
            );

            // Music notes vertical scroll parallax
            const notes = gsap.utils.toArray('.gallery__floating-note');

            notes.forEach((note, index) => {
                // Base dynamic settings (used for Note 1 - Top right area)
                let startY = "120px";
                let endY = "-200px";
                let startX = "80px";
                let endX = "-40px";
                let startOpacity = 0;
                let endOpacity = 0.85;
                let startRot = -15;
                let endRot = 25;
                let scale = 1;

                // Refinements based on element type to create depth and varied trajectories
                if (note.alt === "Music Note 2") {
                    // Small note, high up, drifts inward slowly
                    startY = "60px";
                    endY = "-100px";
                    startX = "120px";
                    endX = "-60px";
                    startRot = 35;
                    endRot = -15;
                    scale = 0.7;
                } else if (note.alt === "Treble Clef") {
                    // Central feature, travels the furthest vertically and horizontally
                    startY = "350px";
                    endY = "-300px";
                    startX = "0px";
                    endX = "60px";
                    startRot = -30;
                    endRot = 10;
                    scale = 1.25;
                } else if (note.alt === "Bass Clef") {
                    // Far left, lower down, heavy slow drift
                    startY = "250px";
                    endY = "-200px";
                    startX = "-40px";
                    endX = "50px";
                    startOpacity = 0.1;
                    endOpacity = 0.95;
                    startRot = 15;
                    endRot = -25;
                    scale = 1.1;
                }

                gsap.fromTo(note,
                    {
                        y: startY,
                        x: startX,
                        opacity: startOpacity,
                        rotation: startRot,
                        scale: scale
                    },
                    {
                        y: endY,
                        x: endX,
                        opacity: endOpacity,
                        rotation: endRot,
                        scale: scale,
                        delay: index * 0.1, // Tighter stagger for a cohesive group feel
                        ease: "power2.out", // Smoother ease-out for floating effect
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 95%",
                            end: "bottom top",
                            scrub: 1.2 // Faster, more responsive scrub
                        }
                    }
                );
            });

            // Responsive background SVG animation
            let mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                // Desktop: Gentle rotation then dramatic scale
                gsap.set(".gallery__bg-svg", { xPercent: -50, yPercent: -50 });

                const bgTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".gallery__grid",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });

                // First half of scroll: gentle rotation
                bgTl.fromTo(".gallery__bg-svg",
                    { rotation: -5, scale: 1 },
                    { rotation: 15, scale: 1, ease: "none", duration: 1 }
                )
                    // Second half of scroll: dramatic rotation and scale increase
                    .to(".gallery__bg-svg",
                        { rotation: 90, scale: 1.8, ease: "power2.in", duration: 1 }
                    );
            });

            mm.add("(max-width: 768px)", () => {
                // Mobile: SVG starts at the top, pins to the viewport, and rotates/scales 
                // as the user scrolls down the very long vertical list of images.
                gsap.set(".gallery__bg-svg", { xPercent: -50, yPercent: 0 }); // Anchor to top center for pinning

                const bgTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".gallery__grid",
                        start: "top 35%", // Start pinning when grid reaches upper third
                        end: "bottom 65%", // Release pin before the end of the grid
                        scrub: 1.5,
                        pin: ".gallery__bg-svg", // Pin the SVG to chase the user down
                        pinSpacing: false // Prevent GSAP from injecting extra padding to the grid
                    }
                });

                // As it stays pinned on screen, it heavily rotates and scales up
                bgTl.fromTo(".gallery__bg-svg",
                    { rotation: 0, scale: 1 },
                    { rotation: 180, scale: 2.2, ease: "none" }
                );

                // Mobile: Add a toggle class to individual cards when they reach the center of the screen
                // This simulates the desktop "hover" state dynamically as the user scrolls
                const cards = gsap.utils.toArray('.gallery__card');
                cards.forEach((card) => {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 60%", // Activate when the top of the card reaches 60% down the screen
                        end: "bottom 40%", // Deactivate when the bottom of the card leaves the 40% threshold
                        toggleClass: "gallery__card--active", // Applies our CSS hover-replica class
                    });
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="gallery section" id="gallery" ref={sectionRef}>
            <div className="container">
                <div className="gallery__header gs-reveal" style={{ position: 'relative' }}>
                    <span className="section-label">The Collection</span>
                    <div className="gallery__title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Recent Works</h2>
                    </div>

                    {/* Floating musical notes positioned absolutely, spread across the space */}
                    <img
                        src={musicNote1}
                        alt="Music Note 1"
                        className="gallery__floating-note"
                        style={{
                            position: 'absolute',
                            right: '5%', // Top right perimeter
                            top: '40%',
                            width: '100px',
                            height: 'auto',
                            zIndex: 0,
                            opacity: 0 // handled by GSAP
                        }}
                    />
                    <img
                        src={musicNote1}
                        alt="Music Note 2"
                        className="gallery__floating-note"
                        style={{
                            position: 'absolute',
                            right: '28%', // Far upper left of the cluster
                            top: '25%',
                            width: '80px',
                            height: 'auto',
                            zIndex: 0,
                            opacity: 0
                        }}
                    />
                    <img
                        src={claveSol}
                        alt="Treble Clef"
                        className="gallery__floating-note"
                        style={{
                            position: 'absolute',
                            right: '15%', // Centered lower
                            top: '65%',
                            width: '130px',
                            height: 'auto',
                            zIndex: 0,
                            opacity: 0
                        }}
                    />
                    <img
                        src={claveBajo}
                        alt="Bass Clef"
                        className="gallery__floating-note"
                        style={{
                            position: 'absolute',
                            right: '42%', // Far lower left perimeter
                            top: '80%',
                            width: '100px',
                            height: 'auto',
                            zIndex: 0,
                            opacity: 0
                        }}
                    />

                    <p className="section-subtitle" style={{ marginTop: '1rem', position: 'relative', zIndex: 1 }}>
                        Each guitar is a unique conversation between wood, wire, and the hands that shape them.
                    </p>
                </div>

                <div className="gallery__grid gs-stagger" style={{ position: 'relative' }}>
                    {/* Deep background SVG that covers the cards' area */}
                    <img
                        src={bgSvg}
                        alt="Background Shape"
                        className="gallery__bg-svg"
                    />
                    {guitars.map((guitar) => (
                        <div className="gallery__card gs-stagger-child" key={guitar.id}>
                            <div className="gallery__card-img-wrap">
                                <img src={guitar.image} alt={guitar.name} className="gallery__card-img" />
                            </div>
                            <div className="gallery__card-info">
                                <h3 className="gallery__card-name">{guitar.name}</h3>
                                <p className="gallery__card-spec">{guitar.spec}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
