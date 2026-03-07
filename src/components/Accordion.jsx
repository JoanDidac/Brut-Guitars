import { useState } from 'react';
import './Accordion.css';

export default function Accordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion-container gs-reveal">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}
                    >
                        <button
                            className="accordion-header"
                            onClick={() => toggleItem(index)}
                            aria-expanded={isOpen}
                        >
                            <span className="accordion-title">{item.service}</span>
                            <span className="accordion-icon">
                                {isOpen ? '−' : '+'}
                            </span>
                        </button>
                        <div
                            className="accordion-content"
                            style={{
                                height: isOpen ? 'auto' : 0,
                                opacity: isOpen ? 1 : 0
                            }}
                        >
                            <div className="accordion-inner">
                                <p className="accordion-price">{item.price}</p>
                                {item.desc && <p className="accordion-desc">{item.desc}</p>}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
