import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ANIM_CONFIG = {
  ease: 'power3.out',
  duration: 0.9,
  start: 'top 88%',
  variants: {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -48 },
    right: { x: 48 },
    scale: { scale: 0.94 },
    fade: {}
  }
};

/**
 * Universal scroll reveal hook directly reproducing the reference website's
 * GSAP matchMedia & ScrollTrigger configuration.
 */
export function useScrollReveals(containerRef, deps = []) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 768px)'
      },
      (context) => {
        const { motion } = context.conditions;
        if (!motion) return;

        // 1. [data-reveal]
        const revealEls = gsap.utils.toArray('[data-reveal]', el);
        revealEls.forEach((target) => {
          const variantKey = target.dataset.reveal || 'up';
          const variant = ANIM_CONFIG.variants[variantKey] || ANIM_CONFIG.variants.up;
          const delay = parseFloat(target.dataset.revealDelay) || 0;

          gsap.from(target, {
            ...variant,
            opacity: 0,
            duration: ANIM_CONFIG.duration,
            delay,
            ease: ANIM_CONFIG.ease,
            scrollTrigger: {
              trigger: target,
              start: ANIM_CONFIG.start,
              once: true
            }
          });
        });

        // 2. [data-reveal-group]
        const revealGroups = gsap.utils.toArray('[data-reveal-group]', el);
        revealGroups.forEach((group) => {
          const children = gsap.utils.toArray(':scope > *', group);
          if (children.length) {
            const stagger = parseFloat(group.dataset.revealGroup) || 0.08;
            gsap.from(children, {
              y: 32,
              opacity: 0,
              duration: ANIM_CONFIG.duration,
              ease: ANIM_CONFIG.ease,
              stagger,
              scrollTrigger: {
                trigger: group,
                start: ANIM_CONFIG.start,
                once: true
              }
            });
          }
        });

        // 3. [data-parallax]
        const parallaxEls = gsap.utils.toArray('[data-parallax]', el);
        parallaxEls.forEach((target) => {
          const factor = parseFloat(target.dataset.parallax) || 40;
          gsap.fromTo(
            target,
            { yPercent: -factor / 10 },
            {
              yPercent: factor / 10,
              ease: 'none',
              scrollTrigger: {
                trigger: target.closest('[data-parallax-frame]') || target,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        });

        // 4. [data-magnetic]
        if (window.matchMedia('(pointer: fine)').matches) {
          const magneticEls = gsap.utils.toArray('[data-magnetic]', el);
          magneticEls.forEach((target) => {
            const pull = parseFloat(target.dataset.magnetic) || 0.3;
            const xTo = gsap.quickTo(target, 'x', { duration: 0.55, ease: 'power3.out' });
            const yTo = gsap.quickTo(target, 'y', { duration: 0.55, ease: 'power3.out' });

            const onMove = (e) => {
              const rect = target.getBoundingClientRect();
              xTo((e.clientX - (rect.left + rect.width / 2)) * pull);
              yTo((e.clientY - (rect.top + rect.height / 2)) * pull);
            };

            const onLeave = () => {
              xTo(0);
              yTo(0);
            };

            target.addEventListener('pointermove', onMove);
            target.addEventListener('pointerleave', onLeave);
            target.addEventListener('blur', onLeave);

            context.add(() => {
              target.removeEventListener('pointermove', onMove);
              target.removeEventListener('pointerleave', onLeave);
              target.removeEventListener('blur', onLeave);
            });
          });
        }
      }
    );

    return () => mm.revert();
  }, [containerRef, ...deps]);
}

export { gsap, ScrollTrigger };
