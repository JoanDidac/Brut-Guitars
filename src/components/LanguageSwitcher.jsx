import { useState } from 'react';
import { useLanguage } from '../hooks/LanguageContext.jsx';
import { LANGUAGES } from '../i18n/index.js';
import flagCA from '../assets/Catalan-Flag.png';
import flagES from '../assets/Spanish-Flag.png';
import flagEN from '../assets/English-Flag.png';
import './LanguageSwitcher.css';

const FLAGS = { ca: flagCA, es: flagES, en: flagEN };
const LABELS = { ca: 'CAT', es: 'ESP', en: 'ENG' };
const FULL_NAMES = { ca: 'Català', es: 'Español', en: 'English' };

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const [animKey, setAnimKey] = useState(0); // key to re-trigger flag morph
    const [labelKey, setLabelKey] = useState(null); // null = hidden, number = show anim

    const [tooltip, setTooltip] = useState(false);

    const handleClick = () => {
        const currentIdx = LANGUAGES.indexOf(lang);
        const nextLang = LANGUAGES[(currentIdx + 1) % LANGUAGES.length];
        setLang(nextLang);
        setAnimKey(k => k + 1);       // re-trigger flag swap animation
        setLabelKey(k => (k ?? 0) + 1); // re-trigger label show-then-hide animation
    };

    return (
        <div className="lang-switcher" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
            <button
                className="lang-switcher__pill"
                onClick={handleClick}
                aria-label={`Current language: ${FULL_NAMES[lang]}. Click to switch.`}
                title={`Switch language (${FULL_NAMES[lang]})`}
            >
                {/* Flag fills the pill perfectly */}
                <img
                    key={`flag-${animKey}`}
                    src={FLAGS[lang]}
                    alt={FULL_NAMES[lang]}
                    className="lang-switcher__flag"
                />

                {/* Label appears on click then fades out automatically */}
                {labelKey !== null && (
                    <span key={`label-${labelKey}`} className="lang-switcher__label">
                        {LABELS[lang]}
                    </span>
                )}
            </button>

            {/* Tooltip dropdown */}
            <div className={`lang-switcher__tooltip ${tooltip ? 'lang-switcher__tooltip--visible' : ''}`}>
                {LANGUAGES.map((l) => (
                    <button
                        key={l}
                        className={`lang-switcher__option ${l === lang ? 'lang-switcher__option--active' : ''}`}
                        onClick={() => { setLang(l); setAnimKey(k => k + 1); setLabelKey(k => (k ?? 0) + 1); setTooltip(false); }}
                    >
                        <img src={FLAGS[l]} alt={FULL_NAMES[l]} className="lang-switcher__option-flag" />
                        {LABELS[l]} — {FULL_NAMES[l]}
                    </button>
                ))}
            </div>
        </div>
    );
}
