import './About.css';
import craftImg from '../assets/craftsmanship-detail.png';

export default function About() {
    return (
        <section className="about section" id="about">
            <div className="container about__grid">
                <div className="about__image-wrap gs-reveal-left">
                    <img src={craftImg} alt="Luthier at work" className="about__image" />
                </div>

                <div className="about__content gs-reveal-right">
                    <span className="section-label">The Craftsman</span>
                    <h2 className="section-title">Built by Hand,<br />Designed by Ear</h2>
                    <p className="about__text">
                        With over a decade of dedication to the craft, every Brut Guitar begins as a
                        carefully selected tonewood and transforms into a one-of-a-kind instrument
                        through hours of meticulous handwork.
                    </p>
                    <p className="about__text">
                        From the initial sketch to the final setup, each guitar reflects a deep
                        understanding of wood, acoustics, and the unique needs of every musician.
                        No two instruments are alike — because no two players are the same.
                    </p>

                    <hr className="dashed-divider" />

                    <div className="about__stats gs-stagger">
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">10+</span>
                            <span className="about__stat-label">Years of Craft</span>
                        </div>
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">100+</span>
                            <span className="about__stat-label">Guitars Built</span>
                        </div>
                        <div className="about__stat gs-stagger-child">
                            <span className="about__stat-number">100%</span>
                            <span className="about__stat-label">Handmade</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
