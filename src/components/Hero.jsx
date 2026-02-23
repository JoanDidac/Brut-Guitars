import './Hero.css';
import heroImg from '../assets/guitar-showcase.png';

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero__content container">
                <div className="hero__text">
                    <h1 className="hero__title">
                        Custom Guitars,<br />
                        Built by <em>Hand.</em>
                    </h1>
                    <p className="hero__subtitle">
                        Every instrument is a unique creation — shaped by hand, tuned by ear,
                        and built to inspire musicians who demand more from their craft.
                    </p>
                    <div className="hero__actions">
                        <button
                            className="btn-pill btn-pill--dark"
                            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Instruments
                        </button>
                        <button
                            className="btn-pill btn-pill--outline"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Commission a Build
                        </button>
                    </div>
                </div>

                <div className="hero__image-wrap">
                    <img src={heroImg} alt="Custom handcrafted guitar" className="hero__image gs-parallax" />
                </div>
            </div>
        </section>
    );
}
