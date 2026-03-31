import { createContext, useContext, useState } from 'react';
import { translations, LANGUAGES } from '../i18n/index.js';

const LanguageContext = createContext(null);

// Detect browser language and map to supported language code
function detectLanguage() {
    const stored = localStorage.getItem('brut_lang');
    if (stored && LANGUAGES.includes(stored)) return stored;

    const browserLang = (navigator.language || 'en').split('-')[0].toLowerCase();
    if (browserLang === 'ca') return 'ca';
    if (browserLang === 'es') return 'es';
    return 'en';
}

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(detectLanguage);

    const setLang = (newLang) => {
        if (LANGUAGES.includes(newLang)) {
            localStorage.setItem('brut_lang', newLang);
            setLangState(newLang);
        }
    };

    // t('hero.cta1') → returns the translated string
    const t = (key) => {
        const parts = key.split('.');
        let value = translations[lang];
        for (const part of parts) {
            if (value == null) return key;
            value = value[part];
        }
        return value ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
    return ctx;
}
