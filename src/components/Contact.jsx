import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import patternSvg from '../assets/vinyl-svgrepo-com.svg';
import turntableSvg from '../assets/turntable-svgrepo-com.svg';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ isModal = false, modalBgSvg = null, modalCategoryId = null, onCloseModal }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const vinylWrap = sectionRef.current.querySelector('.contact-vinyl-wrap');
            const contactForm = sectionRef.current.querySelector('.contact__form');

            if (isModal) {
                if (contactForm) {
                    gsap.set(contactForm, { opacity: 1, x: 0 });
                }
                if (vinylWrap) {
                    gsap.set(vinylWrap, { opacity: 0.15, scale: 0.61, xPercent: -50, yPercent: -50, y: 0 });
                    gsap.to(vinylWrap, { rotation: "+=360", repeat: -1, duration: 15, ease: "none" });
                }
                const modalBg = sectionRef.current.querySelector('.contact-modal-bg');
                if (modalBg) {
                    gsap.set(modalBg, { opacity: 0.1, scale: 1, xPercent: -50, yPercent: -50 });
                }
                return; // exit early
            }

            if (vinylWrap && contactForm) {
                // Normal Page Scroll Behavior
                // Emulate coming from the previous section
                // Initialize tracking securely with xPercent/yPercent and drop from an absolute pixel height
                gsap.set(vinylWrap, { xPercent: -50, yPercent: -50, y: -window.innerHeight * 0.7, scale: 0.61, opacity: 0, rotation: 0 });
                // Hide the form initially so it can fade in later
                gsap.set(contactForm, { opacity: 0, x: 50 });

                let spinTween;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 15%", // Starts later when the contact section is fully visible
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
                    scale: 0.61,
                    opacity: 0.15,
                    duration: 1.125,
                    ease: "power2.out"
                }, 0);

                // The falling part (takes the full 1.5s)
                tl.to(vinylWrap, {
                    y: 0, // Drops to the exact CSS anchor origin shared with the turntable
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

                // Phase 2: Form Reveal
                // Executes exactly when the vinyl concludes its 1.5s drop and starts spinning
                tl.to(contactForm, {
                    opacity: 1,
                    x: 0, // Slide into original place
                    duration: 0.9,
                    ease: "power3.out"
                }, 1.5);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const webhookUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

        try {
            const res = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    date: new Date().toLocaleString('en-GB', { timeZone: 'Europe/Madrid' }),
                }),
            });

            const text = await res.text();
            console.log('Raw response text:', text);
            console.log('Response status:', res.status, res.type, res.url);
            
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse JSON:', e);
                data = {};
            }

            if (data && data.result === 'success') {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('Apps Script returned an error data:', data);
                throw new Error('Apps Script returned an error');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const contactContent = (
        <section className={`contact section ${isModal ? 'contact--modal' : ''}`} id="contact" ref={sectionRef}>
            {isModal && modalBgSvg ? (
                <div className={`contact-modal-bg contact-modal-bg--${modalCategoryId || 'general'}`}>
                    <img src={modalBgSvg} alt="Service icon background" />
                </div>
            ) : (
                <>
                    <div className="contact-turntable-wrap">
                        <img src={turntableSvg} alt="Turntable background" />
                    </div>
                    <div className="contact-vinyl-wrap">
                        <img src={patternSvg} alt="Vinyl record dropping" />
                    </div>
                </>
            )}
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
                                <span className="contact__detail-value">info@brutguitars.com</span>
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

                    <form className="contact__form" onSubmit={handleSubmit}>
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

                        <button
                            className={`btn-pill btn-pill--dark contact__submit contact__submit--${status}`}
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading' && '⏳ Sending…'}
                            {status === 'success' && '✓ Message Received!'}
                            {status === 'error' && '✗ Something went wrong — try again'}
                            {status === 'idle' && 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );

    if (isModal) {
        return (
            <div className="file-modal-backdrop" onClick={onCloseModal}>
                <div className="file-modal file-modal--contact" onClick={(e) => e.stopPropagation()}>
                    <button className="file-modal__close" onClick={onCloseModal}>&times;</button>
                    {contactContent}
                </div>
            </div>
        );
    }

    return contactContent;
}
