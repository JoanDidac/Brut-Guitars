import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './ServicesPage.css';
import Contact from './Contact';
import Accordion from './Accordion';
import SectionDial from './SectionDial';

import imgBuilds from '../assets/workshop-1.jpg';
import imgSetups from '../assets/gallery-headstock.jpg';
import imgWoodworking from '../assets/craftsmanship-detail.png';
import imgPaint from '../assets/guitar-showcase.png';
import imgFretwork from '../assets/gallery-fretboard.jpg';
import imgElectronics from '../assets/Electronics-Brut.jpg';

import iconBuilds from '../assets/electric-guitar-svgrepo-com.svg';
import iconSetups from '../assets/calipers-svgrepo-com.svg';
import iconWoodworking from '../assets/saw-svgrepo-com.svg';
import iconPaint from '../assets/paint-spray-graffiti-svgrepo-com.svg';
import iconFretwork from '../assets/set-square-svgrepo-com.svg';
import iconElectronics from '../assets/jack-svgrepo-com.svg';

export default function ServicesPage({ selectedCategory, onNavigate }) {
    const pageRef = useRef(null);
    const [contactModalService, setContactModalService] = useState(() => {
        const stored = sessionStorage.getItem('brut_contactModalService');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (contactModalService) {
            sessionStorage.setItem('brut_contactModalService', JSON.stringify(contactModalService));
        } else {
            sessionStorage.removeItem('brut_contactModalService');
        }
    }, [contactModalService]);

    useEffect(() => {
        if (selectedCategory) {
            // Small timeout to ensure DOM is ready and GSAP hasn't shifted things yet
            setTimeout(() => {
                const element = document.getElementById(`service-${selectedCategory}`);
                if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 120; // 120px offset for navbar
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [selectedCategory]);

    const serviceDetails = [
        {
            id: 'builds',
            title: "Custom Builds & Personalizations",
            subtitle: "Dreams turned into wood and wire.",
            desc: "Whether you're dreaming of a 7-string headless beast, a classic blues machine with a modern twist, or something completely outlandish, I build instruments tailored to your exact sonic and ergonomic needs. We'll consult on tonewoods, neck profiles, fret sizes, and electronics to ensure the final product is an extension of your hands. If you can imagine it (and even if you can't), we can build it.",
            img: imgBuilds,
            icon: iconBuilds,
            pricing: [
                { service: 'Base Custom Build', price: 'Starts at €1,500' },
                { service: 'Neck Carve Refinement', price: '€180' },
                { service: 'Full Hardware Swap', price: '€120 + Parts' }
            ]
        },
        {
            id: 'setups',
            title: "Pro Setups & Adjustments",
            subtitle: "Make it play like butter.",
            desc: "A guitar is only as good as its setup. From intonation to action, neck relief to pickup height—I'll make your instrument perform at its absolute peak. Say goodbye to fret buzz, stiff strings, and dead spots. I don't just 'set it to factory specs'; I set it to YOUR specs based on how hard you pick, what tuning you use, and what style you play.",
            img: imgSetups,
            icon: iconSetups,
            pricing: [
                { service: 'Standard 6-String Setup', price: '€65' },
                { service: 'Floyd Rose / Tremolo Setup', price: '€85' },
                { service: 'Acoustic Setup (inc. saddle shaving)', price: '€75' }
            ]
        },
        {
            id: 'woodworking',
            title: "Structural Repairs & Woodworking",
            subtitle: "Bringing dead instruments back to life.",
            desc: "Broken headstock? Body cracks? Warped neck? Loose bracing on your favorite acoustic? Don't panic. Wood is alive, and sometimes it misbehaves (or gets dropped on stage). I specialize in complex structural repairs, using hide glues, splines, and modern clamping techniques to ensure the repair is often stronger than the original wood.",
            img: imgWoodworking,
            icon: iconWoodworking,
            pricing: [
                { service: 'Headstock Break Repair', price: '€150 - €300' },
                { service: 'Acoustic Bridge Re-glue', price: '€120' },
                { service: 'Crack Cleating & Sealing', price: '€80 per crack' }
            ]
        },
        {
            id: 'paint',
            title: "Custom Paint & Re-finishing",
            subtitle: "Classy bursts, modern art, or heavy relics.",
            desc: "The finish of a guitar dramatically alters its vibe. Whether you want a breathing, classy nitrocellulose sunburst, an eccentric swirl, or a heavy relic job that looks like it barely survived a 70s stadium tour, I've got the paints, the patience, and the artistic eye to make it pop. We also handle minor finish touch-ups and drop-fills.",
            img: imgPaint,
            icon: iconPaint,
            pricing: [
                { service: 'Full Body Nitro Refinish', price: '€450' },
                { service: 'Neck Refinish & Tinting', price: '€200' },
                { service: 'Heavy Relic Job', price: '€350' }
            ]
        },
        {
            id: 'fretwork',
            title: "Fretwork & Refretting",
            subtitle: "Because dead notes are for amateurs.",
            desc: "Your frets are the interface between you and the wood. I offer precise fret leveling, crowning, and polishing to cure buzz and ensure perfect intonation. If your frets are completely worn out, we'll do a complete refret. Go vintage wire, jumbo, or upgrade to stainless steel so you never have to refret again.",
            img: imgFretwork,
            icon: iconFretwork,
            pricing: [
                { service: 'Level, Crown & Polish', price: '€120' },
                { service: 'Full Refret (Nickel-Silver)', price: '€250' },
                { service: 'Full Refret (Stainless Steel)', price: '€350' }
            ]
        },
        {
            id: 'electronics',
            title: "Electronics & Wizardry",
            subtitle: "Performing the dark arts of soldering.",
            desc: "Custom wiring schemes, pickup swaps, coil-splits, kill-switches, out-of-phase switches, and fixing that mysterious hum that's been driving you crazy. I use premium pots, caps, and switches to ensure your signal path is pure. Want to add an onboard preamp or completely rewire a vintage mess? Let's hook it up.",
            img: imgElectronics,
            icon: iconElectronics,
            pricing: [
                { service: 'Complete Re-wire', price: '€100 + Parts' },
                { service: 'Pickup Swap (2 Pickups)', price: '€60' },
                { service: 'Custom Treble Bleed / Push-Pull Mods', price: '€45 per mod' }
            ]
        }
    ];

    return (
        <div className="services-page" ref={pageRef}>
            <header className="services-page__hero">
                <div className="container">
                    <button className="btn-back" onClick={() => onNavigate('home', 'services')}>
                        ← Back to Home
                    </button>
                    <h1 className="services-page__title gs-reveal">Luthier Services</h1>
                    <p className="services-page__subtitle gs-reveal">
                        From basic setups to complete structural resurrections, your instrument is in expert hands.
                    </p>
                </div>
            </header>

            <div className="services-page__content">
                {serviceDetails.map((service, index) => (
                    <div key={service.id}>
                        <section
                            id={`service-${service.id}`}
                            className={`services-page__section ${index % 2 !== 0 ? 'services-page__section--alt' : ''}`}
                        >
                            <div className="container services-page__row gs-reveal">
                                <div className="services-page__text">
                                    <h2 className="services-page__item-title">{service.title}</h2>
                                    <h3 className="services-page__item-subtitle">{service.subtitle}</h3>
                                    <p className="services-page__item-desc">{service.desc}</p>
                                    <div className="services-page__actions">
                                        <a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--dark">
                                            Book a Date!
                                        </a>
                                        <button className="btn-pill btn-pill--outline" onClick={() => setContactModalService(service)}>
                                            Questions? Book a call!
                                        </button>
                                    </div>
                                </div>
                                <div className="services-page__image-wrap gs-reveal-scale">
                                    <img src={service.img} alt={service.title} className="services-page__image services-page__image--desktop" />
                                    <div className="services-page__accordion services-page__accordion--mobile">
                                        <Accordion items={service.pricing} />
                                    </div>
                                </div>
                            </div>
                        </section>
                        {index < serviceDetails.length - 1 && (
                            <hr className="dashed-divider" />
                        )}
                    </div>
                ))}
            </div>

            <section className="services-page__cta">
                <div className="container text-center gs-reveal">
                    <h2 className="section-title">Ready to bring the noise?</h2>
                    <p className="section-subtitle mx-auto">
                        Whether it's a routine setup or a wild custom build, get in touch and let's discuss your project.
                    </p>
                    <button className="btn-pill btn-pill--dark mt-4" onClick={() => setContactModalService({ id: 'general', icon: null })}>
                        Contact the Workshop
                    </button>
                </div>
            </section>

            {contactModalService && (
                <Contact isModal={true} modalBgSvg={contactModalService.icon} modalCategoryId={contactModalService.id} onCloseModal={() => setContactModalService(null)} />
            )}

            <SectionDial onNavigate={onNavigate} />
        </div>
    );
}
