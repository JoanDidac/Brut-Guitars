import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import guitarPick from '../assets/Brut-Guitars_Pick_soundhole.png';

gsap.registerPlugin(ScrollTrigger);

export default function PickGraphic() {
    const pickRef = useRef(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Mobile-only animation sequence
            ScrollTrigger.matchMedia({
                // Base mobile rules
                "(max-width: 768px)": () => {
                    gsap.fromTo(pickRef.current,
                        {
                            rotation: -90, // Start horizontal (pointing right, as drawn in the user's mockup Point A)
                            yPercent: -50, // Start centerline exactly on the juncture
                        },
                        {
                            rotation: 0, // End completely vertical
                            yPercent: -47, // Land perfectly at the -47% position (matching the original first trial state)
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top bottom", // Animation starts when the top of the container hits the bottom of the viewport
                                end: "top center", // Animation finishes when the container reaches the center of the viewport
                                scrub: 0.5, // Smooth scrubbing
                            }
                        }
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="section-transition-pick" ref={containerRef}>
            <img
                src={guitarPick}
                alt="Brut Guitars Highlight"
                className="section-transition-pick__img"
                ref={pickRef}
            />
        </div>
    );
}
