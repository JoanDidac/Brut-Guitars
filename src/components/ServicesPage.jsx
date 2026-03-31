import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../hooks/LanguageContext.jsx';
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
    const { t } = useLanguage();
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

    const icons = [iconBuilds, iconSetups, iconWoodworking, iconPaint, iconFretwork, iconElectronics];
    const imgs = [imgBuilds, imgSetups, imgWoodworking, imgPaint, imgFretwork, imgElectronics];

    // Pricing stays in English (numbers/prices don't translate)
    const pricing = [
        [
            { service: 'Base Custom Build', price: 'Starts at €1,500' },
            { service: 'Neck Carve Refinement', price: '€180' },
            { service: 'Full Hardware Swap', price: '€120 + Parts' },
        ],
        [
            { service: 'Standard 6-String Setup', price: '€65' },
            { service: 'Floyd Rose / Tremolo Setup', price: '€85' },
            { service: 'Acoustic Setup (inc. saddle shaving)', price: '€75' },
        ],
        [
            { service: 'Headstock Break Repair', price: '€150 - €300' },
            { service: 'Acoustic Bridge Re-glue', price: '€120' },
            { service: 'Crack Cleating & Sealing', price: '€80 per crack' },
        ],
        [
            { service: 'Full Body Nitro Refinish', price: '€450' },
            { service: 'Neck Refinish & Tinting', price: '€200' },
            { service: 'Heavy Relic Job', price: '€350' },
        ],
        [
            { service: 'Level, Crown & Polish', price: '€120' },
            { service: 'Full Refret (Nickel-Silver)', price: '€250' },
            { service: 'Full Refret (Stainless Steel)', price: '€350' },
        ],
        [
            { service: 'Complete Re-wire', price: '€100 + Parts' },
            { service: 'Pickup Swap (2 Pickups)', price: '€60' },
            { service: 'Custom Treble Bleed / Push-Pull Mods', price: '€45 per mod' },
        ],
    ];

    const serviceDetails = (t('servicesPage.items') || []).map((item, i) => ({
        ...item,
        icon: icons[i],
        img: imgs[i],
        pricing: pricing[i],
    }));

    return (
        <div className="services-page" ref={pageRef}>
            <header className="services-page__hero">
                <div className="container">
                    <button className="btn-back" onClick={() => onNavigate('home', 'services')}>
                        {t('servicesPage.backBtn')}
                    </button>
                    <h1 className="services-page__title gs-reveal">{t('servicesPage.pageTitle')}</h1>
                    <p className="services-page__subtitle gs-reveal">
                        {t('servicesPage.pageSubtitle')}
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
                                            {t('servicesPage.bookBtn')}
                                        </a>
                                        <button className="btn-pill btn-pill--outline" onClick={() => setContactModalService(service)}>
                                            {t('servicesPage.questionsBtn')}
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
                    <h2 className="section-title">{t('servicesPage.ctaTitle')}</h2>
                    <p className="section-subtitle mx-auto">
                        {t('servicesPage.ctaSubtitle')}
                    </p>
                    <button className="btn-pill btn-pill--dark mt-4" onClick={() => setContactModalService({ id: 'general', icon: null })}>
                        {t('servicesPage.ctaBtn')}
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
