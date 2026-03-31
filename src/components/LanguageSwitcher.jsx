import { useState } from 'react';
import { useLanguage } from '../hooks/LanguageContext.jsx';
import { LANGUAGES, LANG_NAMES } from '../i18n/index.js';
import './LanguageSwitcher.css';

// Inline SVG badge for each language code — same size, designed to morph via CSS
const LangBadge = ({ code }) => (
    <svg
        className="lang-switcher__svg"
        viewBox="0 0 36 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <text
            x="18"
            y="12.5"
            textAnchor="middle"
            dominantBaseline="auto"
            className="lang-switcher__svg-text"
        >
            {code.toUpperCase()}
        </text>
    </svg>
);

export default function LanguageSwitcher() {
    const { lang, setLang } = useLanguage();
    const [animKey, setAnimKey] = useState(0);
    const [tooltip, setTooltip] = useState(false);

    const handleClick = () => {
        const currentIdx = LANGUAGES.indexOf(lang);
        const nextLang = LANGUAGES[(currentIdx + 1) % LANGUAGES.length];
        setLang(nextLang);
        setAnimKey(k => k + 1); // re-trigger animation
    };

    return (
        <div className="lang-switcher" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
            <button
                className="lang-switcher__pill"
                onClick={handleClick}
                aria-label={`Current language: ${LANG_NAMES[lang]}. Click to switch.`}
                title={`Switch language (${LANG_NAMES[lang]})`}
            >
                <span key={animKey} className="lang-switcher__badge">
                    <LangBadge code={lang} />
                </span>
            </button>

            {/* Tooltip showing all 3 lang names */}
            <div className={`lang-switcher__tooltip ${tooltip ? 'lang-switcher__tooltip--visible' : ''}`}>
                {LANGUAGES.map((l) => (
                    <button
                        key={l}
                        className={`lang-switcher__option ${l === lang ? 'lang-switcher__option--active' : ''}`}
                        onClick={() => { setLang(l); setAnimKey(k => k + 1); setTooltip(false); }}
                    >
                        {LANG_NAMES[l]}
                    </button>
                ))}
            </div>
        </div>
    );
}
