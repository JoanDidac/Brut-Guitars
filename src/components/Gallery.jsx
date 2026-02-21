import './Gallery.css';
import guitarImg from '../assets/guitar-showcase.png';

const guitars = [
    { id: 1, name: 'The Sovereign', spec: 'Figured maple · Mahogany body', image: guitarImg },
    { id: 2, name: 'Blackwood Series', spec: 'African blackwood · Ebony fretboard', image: guitarImg },
    { id: 3, name: 'The Nomad', spec: 'Swamp ash · Vintage tones', image: guitarImg },
    { id: 4, name: 'Heritage Custom', spec: 'Reclaimed wood · One-of-a-kind', image: guitarImg },
];

export default function Gallery() {
    return (
        <section className="gallery section" id="gallery">
            <div className="container">
                <div className="gallery__header gs-reveal">
                    <span className="section-label">The Collection</span>
                    <h2 className="section-title">Recent Builds</h2>
                    <p className="section-subtitle">
                        Each guitar is a unique conversation between wood, wire, and the hands that shape them.
                    </p>
                </div>

                <div className="gallery__grid gs-stagger">
                    {guitars.map((guitar) => (
                        <div className="gallery__card gs-stagger-child" key={guitar.id}>
                            <div className="gallery__card-img-wrap">
                                <img src={guitar.image} alt={guitar.name} className="gallery__card-img" />
                            </div>
                            <div className="gallery__card-info">
                                <h3 className="gallery__card-name">{guitar.name}</h3>
                                <p className="gallery__card-spec">{guitar.spec}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
