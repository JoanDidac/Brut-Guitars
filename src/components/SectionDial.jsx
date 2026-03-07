import { useState } from 'react';
import './SectionDial.css';
import halfCircleSvg from '../assets/solid-circle-half.svg';

export default function SectionDial({ onNavigate }) {
    const [activeSection, setActiveSection] = useState('v5'); // Default to services since we are on the Services page

    const handleNavigate = (id, section) => {
        setActiveSection(id);

        // Add a slight delay for the CSS dial animation to play out (150ms) before jumping
        setTimeout(() => {
            onNavigate('home', section);
        }, 150);
    };

    return (
        <div className="section-dial-wrapper">
            <div className="section-dial-bg">
                <img src={halfCircleSvg} alt="Half circle background" />
            </div>

            <div className="section-dial-container">
                <div className="clock-input">
                    <input type="radio" id="v1" name="radio" checked={activeSection === 'v1'} onChange={() => handleNavigate('v1', 'hero')} />
                    <input type="radio" id="v2" name="radio" checked={activeSection === 'v2'} onChange={() => handleNavigate('v2', 'about')} />
                    <input type="radio" id="v3" name="radio" checked={activeSection === 'v3'} onChange={() => handleNavigate('v3', 'gallery')} />
                    <input type="radio" id="v4" name="radio" checked={activeSection === 'v4'} onChange={() => handleNavigate('v4', 'process')} />
                    <input type="radio" id="v5" name="radio" checked={activeSection === 'v5'} onChange={() => handleNavigate('v5', 'services')} />
                    <input type="radio" id="v6" name="radio" checked={activeSection === 'v6'} onChange={() => handleNavigate('v6', 'contact')} />

                    <label htmlFor="v1" id="l1"></label>
                    <label htmlFor="v2" id="l2"></label>
                    <label htmlFor="v3" id="l3"></label>
                    <label htmlFor="v4" id="l4"></label>
                    <label htmlFor="v5" id="l5"></label>
                    <label htmlFor="v6" id="l6"></label>

                    <div className="dial"></div>
                    <div className="notches">
                        <div className="notch" style={{ '--n': 1 }}></div>
                        <div className="notch" style={{ '--n': 2 }}></div>
                        <div className="notch" style={{ '--n': 3 }}></div>
                        <div className="notch" style={{ '--n': 4 }}></div>
                        <div className="notch" style={{ '--n': 5 }}></div>
                        <div className="notch" style={{ '--n': 6 }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
