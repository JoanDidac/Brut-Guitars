import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';
import imgBuilds from '../assets/workshop-1.jpg';
import imgSetups from '../assets/gallery-headstock.jpg';
import imgWoodworking from '../assets/craftsmanship-detail.png';
import imgPaint from '../assets/guitar-showcase.png';
import imgFretwork from '../assets/gallery-fretboard.jpg';
import imgElectronics from '../assets/hero-workshop.png';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onNavigate }) {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const headerElements = gsap.utils.toArray('.services__header > *');

            // Header text animation: start high and wide, scrub into position
            gsap.fromTo(headerElements,
                {
                    y: "-30vh", // Exaggerated upward shift to bleed into previous section
                    letterSpacing: "0.75em", // 3x wider letter spacing at the start
                    opacity: 0
                },
                {
                    y: "0vh",
                    letterSpacing: "normal",
                    opacity: 1,
                    stagger: 0.1, // Slight stagger so they don't move as one solid block
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ".services__header",
                        start: "top 85%", // Triggers slightly before the section comes into view
                        end: "top 35%",   // Settles near the upper middle 
                        scrub: 1 // Smooth scrub matched tight to user scroll
                    }
                }
            );

            // Simple stagger fade in for cards on all devices
            gsap.fromTo('.services__card',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".services__grid",
                        start: "top 80%"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        // ... (services data array remains unmodified)
        {
            id: 'builds',
            title: "Custom Builds & Personalizations",
            desc: "Dreaming of a 7-string headless beast or a classic blues machine with a twist? I build instruments tailored to your exact sonic and ergonomic needs. If you can imagine it (and even if you can't), we can build it.",
            icon: "🎸",
            img: imgBuilds
        },
        {
            id: 'setups',
            title: "Pro Setups & Adjustments",
            desc: "A guitar is only as good as its setup. From intonation to action, neck relief to pickup height—I'll make your instrument play like butter. Say goodbye to fret buzz and hello to effortless bending.",
            icon: "🔧",
            img: imgSetups
        },
        {
            id: 'woodworking',
            title: "Structural Repairs & Woodworking",
            desc: "Broken headstock? Cracks? Warped neck? Don't panic. Wood is alive, and sometimes it misbehaves. I specialize in bringing dead instruments back to life so they can shred another day.",
            icon: "🪚",
            img: imgWoodworking
        },
        {
            id: 'paint',
            title: "Custom Paint & Re-finishing",
            desc: "Whether you want a classy nitro burst, an eccentric modern art piece, or a relic job that looks like it survived a 70s stadium tour, I've got the paints, the patience, and the artistic eye to make it pop.",
            icon: "🎨",
            img: imgPaint
        },
        {
            id: 'fretwork',
            title: "Fretwork & Refretting",
            desc: "Leveling, crowning, polishing, or complete stainless steel refrets. I'll make sure every note rings true and clear across the entire board. Because dead notes are for amateurs.",
            icon: "📏",
            img: imgFretwork
        },
        {
            id: 'electronics',
            title: "Electronics & Wizardry",
            desc: "Custom wiring schemes, pickup swaps, coil-splits, kill-switches, and fixing that mysterious hum that's been driving you crazy. I perform the dark arts of soldering.",
            icon: "⚡",
            img: imgElectronics
        }
    ];

    return (
        <section className="services section" id="services" ref={sectionRef}>
            <div className="container">
                <div className="services__header">
                    <h2 className="section-label">More Than Just Builds</h2>
                    <h3 className="section-title">The Full Service Treatment</h3>
                    <p className="section-subtitle">
                        Building guitars is an art, but maintaining, repairing, and upgrading them is a downright necessity.
                        As a gigging bluesman and prog-rocker, I know exactly what it takes to make an instrument stage-ready and bulletproof.
                        Whether it needs a simple tweak, a fresh coat of paint, or a full resurrection—I've got you covered.
                    </p>
                </div>

                <div className="services__grid">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="services__card"
                            style={{ '--bg-img': `url(${service.img})` }}
                            onClick={() => onNavigate && onNavigate('services', service.id)}
                        >
                            <div className="services__icon">{service.icon}</div>
                            <h4 className="services__card-title">{service.title}</h4>
                            <p className="services__card-desc">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
