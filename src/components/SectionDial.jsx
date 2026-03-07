import { useState, useEffect, useRef } from 'react';
import './SectionDial.css';
import halfCircleSvg from '../assets/solid-circle-half.svg';

import iconBuilds from '../assets/electric-guitar-svgrepo-com.svg';
import iconSetups from '../assets/calipers-svgrepo-com.svg';
import iconWoodworking from '../assets/saw-svgrepo-com.svg';
import iconPaint from '../assets/paint-spray-graffiti-svgrepo-com.svg';
import iconFretwork from '../assets/set-square-svgrepo-com.svg';
import iconElectronics from '../assets/jack-svgrepo-com.svg';

export default function SectionDial() {
    const [activeSection, setActiveSection] = useState('v1');
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef(null);

    const resetIdleTimer = () => {
        setIsIdle(false);
        if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 2500); // 2.5 seconds idle time
    };

    useEffect(() => {
        // Init timer
        resetIdleTimer();

        // Listen for user interactions to wake up the dial
        window.addEventListener('scroll', resetIdleTimer, { passive: true });
        window.addEventListener('mousemove', resetIdleTimer, { passive: true });
        window.addEventListener('touchstart', resetIdleTimer, { passive: true });

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            window.removeEventListener('scroll', resetIdleTimer);
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('touchstart', resetIdleTimer);
        };
    }, []);

    const handleNavigate = (id, serviceId) => {
        setActiveSection(id);
        resetIdleTimer(); // Wake it up when clicked

        // Add a slight delay for the CSS dial animation to play out
        setTimeout(() => {
            const elm = document.getElementById(`service-${serviceId}`);
            if (elm) {
                // Approximate navbar offset
                const y = elm.getBoundingClientRect().top + window.scrollY - 120;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 150);
    };

    return (
        <div className={`section-dial-wrapper ${isIdle ? 'section-dial-wrapper--idle' : ''}`}>
            <div className="section-dial-bg">
                <img src={halfCircleSvg} alt="Half circle background" />
            </div>

            <div className="section-dial-container">
                <div className="clock-input">
                    <input type="radio" id="v1" name="radio" checked={activeSection === 'v1'} onChange={() => handleNavigate('v1', 'builds')} />
                    <input type="radio" id="v2" name="radio" checked={activeSection === 'v2'} onChange={() => handleNavigate('v2', 'setups')} />
                    <input type="radio" id="v3" name="radio" checked={activeSection === 'v3'} onChange={() => handleNavigate('v3', 'woodworking')} />
                    <input type="radio" id="v4" name="radio" checked={activeSection === 'v4'} onChange={() => handleNavigate('v4', 'paint')} />
                    <input type="radio" id="v5" name="radio" checked={activeSection === 'v5'} onChange={() => handleNavigate('v5', 'fretwork')} />
                    <input type="radio" id="v6" name="radio" checked={activeSection === 'v6'} onChange={() => handleNavigate('v6', 'electronics')} />

                    <label htmlFor="v1" id="l1"></label>
                    <label htmlFor="v2" id="l2"></label>
                    <label htmlFor="v3" id="l3"></label>
                    <label htmlFor="v4" id="l4"></label>
                    <label htmlFor="v5" id="l5"></label>
                    <label htmlFor="v6" id="l6"></label>

                    <div className="dial"></div>
                    <div className="notches">
                        <div className={`notch ${activeSection === 'v1' ? 'is-active' : ''}`} style={{ '--n': 1 }}></div>
                        <div className={`notch ${activeSection === 'v2' ? 'is-active' : ''}`} style={{ '--n': 2 }}></div>
                        <div className={`notch ${activeSection === 'v3' ? 'is-active' : ''}`} style={{ '--n': 3 }}></div>
                        <div className={`notch ${activeSection === 'v4' ? 'is-active' : ''}`} style={{ '--n': 4 }}></div>
                        <div className={`notch ${activeSection === 'v5' ? 'is-active' : ''}`} style={{ '--n': 5 }}></div>
                        <div className={`notch ${activeSection === 'v6' ? 'is-active' : ''}`} style={{ '--n': 6 }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
