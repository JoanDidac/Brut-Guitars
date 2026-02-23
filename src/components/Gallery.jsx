import './Gallery.css';
import img1 from '../assets/gallery-bass-body.jpg';
import img2 from '../assets/gallery-bass-closeup.jpg';
import img3 from '../assets/gallery-bass-angle.jpg';
import img4 from '../assets/gallery-headstock.jpg';
import img5 from '../assets/gallery-fretboard.jpg';
import img6 from '../assets/gallery-luthier-playing.jpg';

const guitars = [
    { id: 1, name: 'Walnut Burl 5-String', spec: 'Burl walnut top · Dual humbuckers', image: img1 },
    { id: 2, name: 'Maple Body Close-up', spec: 'Figured maple body · Custom pickups', image: img2 },
    { id: 3, name: 'Custom Bass Build', spec: 'Handcrafted body · Premium tonewoods', image: img3 },
    { id: 4, name: 'BRUT Headstock', spec: 'Hand-shaped headstock · Precision tuners', image: img4 },
    { id: 5, name: 'Fretboard Detail', spec: 'Rosewood fretboard · Hand-dressed frets', image: img5 },
    { id: 6, name: 'In the Hands', spec: 'Road-tested by the maker himself', image: img6 },
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
