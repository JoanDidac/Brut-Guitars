import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import patternSvg from '../assets/vinyl-svgrepo-com.svg';
import turntableSvg from '../assets/turntable-svgrepo-com.svg';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const vinylWrap = sectionRef.current.querySelector('.contact-vinyl-wrap');
            if (vinylWrap) {
                // Emulate coming from the previous section
                gsap.set(vinylWrap, { y: "-60vh", scale: 0.2, opacity: 0, rotation: 0 });

                let spinTween;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%", // Starts when the contact section is somewhat visible
                        toggleActions: "play none none reverse", // Trigger once, reverse when scrolling back up
                        onReverseComplete: () => {
                            if (spinTween) spinTween.kill();
                        }
                    }
                });

                // Phase 1: drop in, scale up, fade in 
                // We split this so it finishes growing (75%) BEFORE it finishes falling (100%)

                // The growing and fading part (takes 1.125s, which is 75% of 1.5s)
                tl.to(vinylWrap, {
                    scale: 0.65,
                    opacity: 0.15,
                    duration: 1.125,
                    ease: "power2.out"
                }, 0);

                // The falling part (takes the full 1.5s)
                tl.to(vinylWrap, {
                    y: "-1.5%", // Drops to slightly above center
                    duration: 1.5,
                    ease: "power2.out", // Smoothly decelerates as it falls
                    onComplete: () => {
                        // Start endless true vinyl rotation matching the Services section speed (15s per rev)
                        spinTween = gsap.to(vinylWrap, {
                            rotation: "+=360",
                            repeat: -1,
                            duration: 15,
                            ease: "none"
                        });
                    }
                }, 0);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="contact section" id="contact" ref={sectionRef}>
            <div className="contact-turntable-wrap">
                <img src={turntableSvg} alt="Turntable background" />
            </div>
            <div className="contact-vinyl-wrap">
                <img src={patternSvg} alt="Vinyl record dropping" />
            </div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact__grid">
                    <div className="contact__info gs-reveal-left">
                        <span className="section-label">Get in Touch</span>
                        <h2 className="section-title">Let&apos;s Build Your<br />Dream Guitar</h2>
                        <p className="contact__text">
                            Ready to commission a custom instrument? Have questions about the process?
                            Every great guitar starts with a conversation.
                        </p>

                        <div className="contact__details">
                            <div className="contact__detail">
                                <span className="contact__detail-label">Email</span>
                                <span className="contact__detail-value">hello@brutguitars.com</span>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-label">Workshop</span>
                                <span className="contact__detail-value">La Garriga, Catalonia</span>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-label">Social</span>
                                <span className="contact__detail-value">@brutguitarworks</span>
                            </div>
                        </div>
                    </div>

                    <form className="contact__form gs-reveal-right" onSubmit={handleSubmit}>
                        <div className="contact__field">
                            <label className="contact__label" htmlFor="name">Full Name</label>
                            <input
                                className="contact__input"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="contact__field">
                            <label className="contact__label" htmlFor="email">Email Address</label>
                            <input
                                className="contact__input"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="contact__field">
                            <label className="contact__label" htmlFor="message">Tell me about your project</label>
                            <textarea
                                className="contact__input contact__textarea"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="I'm looking for a custom guitar with..."
                                rows="5"
                                required
                            />
                        </div>

                        <button className="btn-pill btn-pill--dark contact__submit" type="submit" disabled={submitted}>
                            {submitted ? '✓ Message Sent' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
