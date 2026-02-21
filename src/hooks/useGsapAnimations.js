import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations() {
  useEffect(() => {
    /* ── Reveal-on-scroll (fade-up) ── */
    const reveals = gsap.utils.toArray('.gs-reveal');
    reveals.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ── Reveal-left ── */
    const lefts = gsap.utils.toArray('.gs-reveal-left');
    lefts.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ── Reveal-right ── */
    const rights = gsap.utils.toArray('.gs-reveal-right');
    rights.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ── Reveal-scale ── */
    const scales = gsap.utils.toArray('.gs-reveal-scale');
    scales.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    /* ── Stagger children ── */
    const staggerGroups = gsap.utils.toArray('.gs-stagger');
    staggerGroups.forEach((group) => {
      const children = group.querySelectorAll('.gs-stagger-child');
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    /* ── Parallax images ── */
    const parallaxEls = gsap.utils.toArray('.gs-parallax');
    parallaxEls.forEach((el) => {
      gsap.to(el, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
