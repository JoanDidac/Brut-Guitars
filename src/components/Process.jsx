import './Process.css';

const steps = [
    {
        number: '01',
        title: 'Consultation',
        description: 'We discuss your playing style, tonal preferences, and the music that moves you.',
    },
    {
        number: '02',
        title: 'Wood Selection',
        description: 'Hand-picked tonewoods chosen for their acoustic properties and grain character.',
    },
    {
        number: '03',
        title: 'Shaping & Carving',
        description: 'Each body and neck is hand-shaped using traditional tools and refined techniques.',
    },
    {
        number: '04',
        title: 'Finishing & Setup',
        description: 'Meticulous finishing, fretwork, electronics, and a professional setup.',
    },
];

export default function Process() {
    return (
        <section className="process section" id="process">
            <div className="container">
                <div className="process__header gs-reveal">
                    <span className="section-label">The Process</span>
                    <h2 className="section-title">From Vision to Voice</h2>
                    <p className="section-subtitle">
                        Building a custom guitar is a journey. Here&apos;s how we bring your dream instrument to life.
                    </p>
                </div>

                <div className="process__steps gs-stagger">
                    {steps.map((step) => (
                        <div className="process__step gs-stagger-child" key={step.number}>
                            <div className="process__step-number">{step.number}</div>
                            <h3 className="process__step-title">{step.title}</h3>
                            <p className="process__step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
