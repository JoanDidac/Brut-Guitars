import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';
import imgBuilds from '../assets/Custom-Build-Brut.png';
import imgSetups from '../assets/Adjustments-Brut.jpg';
import imgWoodworking from '../assets/workshop-1.jpg';
import imgPaint from '../assets/guitar-showcase.png';
import imgFretwork from '../assets/gallery-fretboard.jpg';
import imgElectronics from '../assets/Electronics-Brut.jpg';
import patternSvg from '../assets/circle-with-dots-pattern-svgrepo-com.svg';
import iconBuilds from '../assets/electric-guitar-svgrepo-com.svg';
import iconSetups from '../assets/calipers-svgrepo-com.svg';
import iconWoodworking from '../assets/saw-svgrepo-com.svg';
import iconPaint from '../assets/paint-brush-svgrepo-com.svg';
import iconFretwork from '../assets/set-square-svgrepo-com.svg';
import iconElectronics from '../assets/jack-svgrepo-com.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onNavigate }) {
    const sectionRef = useRef(null);
    const [activeFolder, setActiveFolder] = useState(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const headerElements = gsap.utils.toArray('.header-anim');
            const bgSvg = document.querySelector('.grid-background-svg');

            // 1. Header text animation IN: start high and wide, scrub into position
            gsap.fromTo(headerElements,
                {
                    y: "-50vh", // Exaggerated upward shift to bleed into previous section
                    letterSpacing: (i, el) => el.classList.contains('section-title') ? "15vw" : "0.75em", // Extremely wide at the start for the title
                    scale: (i, el) => el.classList.contains('section-title') ? 3 : 1,     // Make it 3x as big at the start
                    width: (i, el) => el.classList.contains('section-title') ? "200vw" : el.tagName.toLowerCase() === 'p' ? "66vw" : "auto", // Increase width drastically, p tag is 66vw
                    whiteSpace: (i, el) => el.classList.contains('section-title') ? "nowrap" : "normal", // Prevent wrapping
                    opacity: 0.2 // Make it visible sooner
                },
                {
                    y: "0vh",
                    letterSpacing: "0px", // Use 0px instead of normal to fix GSAP interpolation
                    scale: 1,
                    width: "auto",
                    whiteSpace: "normal",
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

            // 2a. Move entire header block down to meet folders
            gsap.fromTo(headerElements,
                { y: "0vh" }, // Explicitly start from 0vh so it doesn't jump back to -50vh
                {
                    y: "40vh", // Move down further to sit closer to folders
                    ease: "none",
                    immediateRender: false, // Wait until triggered to sample start values
                    scrollTrigger: {
                        trigger: ".services__cabinet",
                        start: "top 95%", // Start moving as the folders scroll up into view
                        end: "top 45%",   // Arrive exactly when folders reach final resting point
                        scrub: 1
                    }
                }
            );

            // 2b. Paragraph text animation OUT: only fade out the p element smoothly in the last 10%
            const pEl = document.querySelector('.services__header .section-subtitle');

            if (pEl) {
                gsap.fromTo(pEl,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        ease: "power2.inOut",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: ".services__cabinet",
                            start: "top 55%", // Wait to fade out until the very end
                            end: "top 45%",   // Fully transparent precisely when the h2/h3 arrive at final destination
                            scrub: 1
                        }
                    }
                );
            }

            // 3. Header replacement SVG animation IN: fade in behind cards as text fades out
            if (bgSvg) {
                gsap.fromTo(bgSvg,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        ease: "power1.inOut",
                        scrollTrigger: {
                            trigger: ".services__cabinet",
                            start: "top 80%", // Fade in starts after text has significantly disintegrated
                            end: "top 50%",   // Fully visible when cabinet reaches the center
                            scrub: 1
                        }
                    }
                );
            }

            // Simple stagger fade in for cards on all devices
            gsap.fromTo('.file-folder',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".services__cabinet",
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
            shortTitle: "Custom Build",
            desc: "Dreaming of a 7-string headless beast or a classic blues machine with a twist? I build instruments tailored to your exact sonic and ergonomic needs. If you can imagine it (and even if you can't), we can build it.",
            icon: iconBuilds,
            img: imgBuilds
        },
        {
            id: 'setups',
            title: "Pro Setups & Adjustments",
            shortTitle: "Adjustments",
            desc: "A guitar is only as good as its setup. From intonation to action, neck relief to pickup height—I'll make your instrument play like butter. Say goodbye to fret buzz and hello to effortless bending.",
            icon: iconSetups,
            img: imgSetups
        },
        {
            id: 'woodworking',
            title: "Structural Repairs & Woodworking",
            shortTitle: "Woodworking",
            desc: "Broken headstock? Cracks? Warped neck? Don't panic. Wood is alive, and sometimes it misbehaves. I specialize in bringing dead instruments back to life so they can shred another day.",
            icon: iconWoodworking,
            img: imgWoodworking
        },
        {
            id: 'paint',
            title: "Custom Paint & Re-finishing",
            shortTitle: "Painting",
            desc: "Whether you want a classy nitro burst, an eccentric modern art piece, or a relic job that looks like it survived a 70s stadium tour, I've got the paints, the patience, and the artistic eye to make it pop.",
            icon: iconPaint,
            img: imgPaint
        },
        {
            id: 'fretwork',
            title: "Fretwork & Refretting",
            shortTitle: "Fretwork",
            desc: "Leveling, crowning, polishing, or complete stainless steel refrets. I'll make sure every note rings true and clear across the entire board. Because dead notes are for amateurs.",
            icon: iconFretwork,
            img: imgFretwork
        },
        {
            id: 'electronics',
            title: "Electronics & Wizardry",
            shortTitle: "Electronics",
            desc: "Custom wiring schemes, pickup swaps, coil-splits, kill-switches, and fixing that mysterious hum that's been driving you crazy. I perform the dark arts of soldering.",
            icon: iconElectronics,
            img: imgElectronics
        }
    ];

    return (
        <section className="services section" id="services" ref={sectionRef}>
            <div className="container">
                <div className="services__header">
                    <h2 className="section-label header-anim">More Than Just Builds</h2>
                    <h3 className="section-title header-anim">The Full Service Treatment</h3>
                    <p className="section-subtitle header-anim">
                        Building guitars is an art, but maintaining, repairing, and upgrading them is a downright necessity.
                        As a gigging bluesman and prog-rocker, I know exactly what it takes to make an instrument stage-ready and bulletproof.
                        Whether it needs a simple tweak, a fresh coat of paint, or a full resurrection I've got you covered.
                    </p>
                </div>

                <div className="services__cabinet">
                    <div className="grid-background-svg">
                        <img src={patternSvg} alt="Decorative pattern" />
                    </div>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`file-folder ${activeFolder?.id === service.id ? 'active' : ''}`}
                            style={{ '--bg-img': `url(${service.img})`, zIndex: index }}
                            onClick={() => setActiveFolder(service)}
                        >
                            <div className="folder__tab">
                                <span className="folder__icon"><img src={service.icon} alt="" className={`folder-icon-img icon-${service.id}`} /></span>
                                <span className="folder__title">{service.shortTitle}</span>
                            </div>
                            <div className="folder__jacket">
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Folder Modal */}
            {activeFolder && (
                <div className="file-modal-backdrop" onClick={() => setActiveFolder(null)}>
                    <div className="file-modal" onClick={e => e.stopPropagation()}>
                        <div className="file-modal__header">
                            <h3 className="file-modal__title">
                                <span><img src={activeFolder.icon} alt="" className={`modal-icon-img icon-${activeFolder.id}`} /></span> {activeFolder.title}
                            </h3>
                            <button className="file-modal__close" onClick={() => setActiveFolder(null)}>&times;</button>
                        </div>
                        <div className="file-modal__content">
                            <div className="file-modal__desc">
                                <p>{activeFolder.desc}</p>
                                <button
                                    className="btn-pill btn-pill--dark mt-md"
                                    onClick={() => onNavigate && onNavigate('services', activeFolder.id)}
                                >
                                    View Service Page
                                </button>
                            </div>
                            <img src={activeFolder.img} alt={activeFolder.title} className="file-modal__image" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
