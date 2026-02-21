import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
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
