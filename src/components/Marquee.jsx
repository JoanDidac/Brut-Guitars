import './Marquee.css';

export default function Marquee() {
    const items = [
        'Handcrafted in La Garriga',
        'Custom Builds',
        'Luthier del Vallès',
        'Premium Tonewoods',
        'Built by Hand',
        'Since Day One',
    ];

    /* Duplicate for seamless loop */
    const track = [...items, ...items];

    return (
        <section className="marquee">
            <div className="marquee__track">
                {track.map((text, i) => (
                    <span className="marquee__item" key={i}>
                        {text} <span className="marquee__dot">·</span>
                    </span>
                ))}
            </div>
        </section>
    );
}
