import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/LanguageContext.jsx';
import './Services.css';
import imgBuilds from '../assets/Custom-Build-Brut.png';
import imgBuildsWebp from '../assets/Custom-Build-Brut.webp';
import imgSetups from '../assets/Adjustments-Brut.jpg';
import imgSetupsWebp from '../assets/Adjustments-Brut.webp';
import imgWoodworking from '../assets/workshop-1.jpg';
import imgWoodworkingWebp from '../assets/workshop-1.webp';
import imgPaint from '../assets/guitar-showcase.png';
import imgPaintWebp from '../assets/guitar-showcase.webp';
import imgFretwork from '../assets/gallery-fretboard.jpg';
import imgFretworkWebp from '../assets/gallery-fretboard.webp';
import imgElectronics from '../assets/Electronics-Brut.jpg';
import imgElectronicsWebp from '../assets/Electronics-Brut.webp';
import patternSvg from '../assets/vinyl-svgrepo-com.svg';
import iconBuilds from '../assets/electric-guitar-svgrepo-com.svg';
import iconSetups from '../assets/calipers-svgrepo-com.svg';
import iconWoodworking from '../assets/saw-svgrepo-com.svg';
import iconPaint from '../assets/paint-spray-graffiti-svgrepo-com.svg';
import iconFretwork from '../assets/set-square-svgrepo-com.svg';
import iconElectronics from '../assets/jack-svgrepo-com.svg';
import halfCircleIcon from '../assets/solid-circle-half.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ onNavigate }) {
    const sectionRef = useRef(null);
    const [activeFolder, setActiveFolder] = useState(null);
    const [hoveredFolderId, setHoveredFolderId] = useState(null);
    const { t } = useLanguage();

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

            // 2a. Desktop: Move entire header block down to meet folders
            const isMobileMatches = window.matchMedia("(max-width: 768px)").matches;

            if (!isMobileMatches) {
                // Desktop Behavior: Smoothly slide text down 40-43vh to meet ascending cabinet
                gsap.fromTo(headerElements,
                    { y: "0vh" },
                    {
                        y: (i, el) => el.classList.contains('section-label') ? "43vh" : "40vh",
                        ease: "none",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: ".services__cabinet",
                            start: "top 95%",
                            end: "top 45%",
                            scrub: 1
                        }
                    }
                );
            } else {
                // Mobile Behavior: "Lock and Push"
                // Pin the entire header container in place so it stays centered in the viewport
                // while the user scrolls down. Unpin it when the cabinet touches the bottom of the header.
                ScrollTrigger.create({
                    trigger: ".services__header",
                    start: "center center", // Lock when the header is exactly in the middle of the screen
                    endTrigger: ".services__cabinet",
                    end: "top center", // Unlock when the top of the cabinet reaches the center (colliding with the text)
                    pin: true,
                    pinSpacing: false, // Don't add artificial padding, let the cabinet slide up naturally over the background
                });
            }

            // 2b. Paragraph text animation OUT
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
                            // On mobile, fade out before the cabinet hits the pinned text. On desktop, standard fade.
                            start: isMobileMatches ? "top 80%" : "top 55%",
                            end: isMobileMatches ? "top 60%" : "top 45%",
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

                // 4. Subtle, continuous rotation for the vinyl record
                const vinylImg = bgSvg.querySelector('img');
                if (vinylImg) {
                    gsap.to(vinylImg, {
                        rotation: 360,
                        repeat: -1,
                        ease: "none",
                        duration: 15, // Slow 15-second rotation for a soothing background effect
                        transformOrigin: "center center"
                    });
                }
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

            // 5. Half-circle "emerging" animation from the ceiling
            gsap.fromTo('.services__top-arch',
                {
                    xPercent: -50,
                    yPercent: -75, // Start ~80% hidden above the overflow ceiling boundary
                    y: "30px", // Translate the entire path 30px lower globally
                    rotation: -90
                },
                {
                    xPercent: -50,
                    yPercent: -35, // Settle exactly at the flush 33rem resting plane
                    y: "30px", // Maintain 30px lower offset at the resting point
                    rotation: -90,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current, // Use the raw DOM node so gsap.context() doesn't fail finding itself
                        start: "top 95%", // Start dropping in as soon as the ceiling is visible
                        end: "top 49%",   // Settle exactly when 49% of the vh has been reached
                        scrub: 1
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useLayoutEffect(() => {
        if (!activeFolder) return;

        let ctx = gsap.context(() => {
            const isMobileMatches = window.matchMedia("(max-width: 768px)").matches;
            if (isMobileMatches) {
                gsap.fromTo('.modal-icon-wrapper',
                    {
                        x: 150, // Start 150px to the right of its original (clipped) position
                        opacity: 1, // Full dark color
                        scale: 1.1 // Zoomed in 10%
                    },
                    {
                        x: 0, // Return to original transform positioning
                        opacity: 0.15, // Final opacity
                        scale: 1, // Final scale
                        duration: 0.8,
                        ease: "power3.out"
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [activeFolder]);

    const icons = [iconBuilds, iconSetups, iconWoodworking, iconPaint, iconFretwork, iconElectronics];
    const imgs = [imgBuilds, imgSetups, imgWoodworking, imgPaint, imgFretwork, imgElectronics];
    const imgWebps = [imgBuildsWebp, imgSetupsWebp, imgWoodworkingWebp, imgPaintWebp, imgFretworkWebp, imgElectronicsWebp];

    const services = (t('services.items') || []).map((item, i) => ({
        ...item,
        icon: icons[i],
        img: imgs[i],
        imgWebp: imgWebps[i],
    }));

    return (
        <section className="services section" id="services" ref={sectionRef}>
            <img src={halfCircleIcon} alt="Decorative Half Circle" className="services__top-arch" />
            <div className="container">
                <div className="services__header">
                    <h2 className="section-label header-anim">{t('services.label')}</h2>
                    <h3 className="section-title header-anim">{t('services.title')}</h3>
                    <p className="section-subtitle header-anim">{t('services.subtitle')}</p>
                </div>

                <div className="services__cabinet" data-hovered-folder={hoveredFolderId || ''}>
                    <div className="grid-background-svg">
                        <img src={patternSvg} alt="Vinyl record graphic" />
                    </div>
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`file-folder ${activeFolder?.id === service.id ? 'active' : ''}`}
                            style={{
                                '--bg-img': `image-set(url(${service.imgWebp}) type('image/webp'), url(${service.img}) type('image/png'))`,
                                zIndex: index
                            }}
                            onClick={() => setActiveFolder(service)}
                            onMouseEnter={() => setHoveredFolderId(service.id)}
                            onMouseLeave={() => setHoveredFolderId(null)}
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
                                <span className="modal-icon-wrapper">
                                    <img src={activeFolder.icon} alt="" className={`modal-icon-img icon-${activeFolder.id}`} />
                                </span>
                                <span className="modal-title-text">
                                    {activeFolder.title.includes(' & ') ? (
                                        <>
                                            {activeFolder.title.split(' & ')[0]}
                                            <span className="ampersand"> &amp; </span>
                                            {activeFolder.title.split(' & ')[1]}
                                        </>
                                    ) : (
                                        activeFolder.title
                                    )}
                                </span>
                            </h3>
                            <button className="file-modal__close" onClick={() => setActiveFolder(null)}>&times;</button>
                        </div>
                        <div className="file-modal__content" style={{ '--modal-bg': `image-set(url(${activeFolder.imgWebp}) type('image/webp'), url(${activeFolder.img}) type('image/png'))` }}>
                            <div className="file-modal__desc">
                                <p>{activeFolder.desc}</p>
                                <button
                                    className="btn-pill btn-pill--dark mt-md"
                                    onClick={() => onNavigate && onNavigate('services', activeFolder.id)}
                                >
                                    {t('services.viewService')}
                                </button>
                            </div>
                            <picture>
                                <source type="image/webp" srcSet={activeFolder.imgWebp} />
                                <img src={activeFolder.img} alt={activeFolder.title} className="file-modal__image" />
                            </picture>
                        </div>
                    </div>
                </div>
            )
            }
        </section >
    );
}
