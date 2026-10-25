import React, { useRef, useState, useMemo, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';

const Ri = 63;

const measureLetterMetrics = (char, element, elementHeight) => {
  try {
    if (!measureLetterMetrics.canvas) {
      measureLetterMetrics.canvas = document.createElement('canvas');
    }
    const ctx = measureLetterMetrics.canvas.getContext('2d');
    if (!ctx) return null;
    const computed = getComputedStyle(element);
    ctx.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    const metrics = ctx.measureText(char);
    if (!Number.isFinite(metrics.actualBoundingBoxLeft)) return null;

    const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent ?? elementHeight * 0.78;
    const descent = metrics.fontBoundingBoxDescent ?? metrics.actualBoundingBoxDescent ?? elementHeight * 0.22;
    const baseline = (elementHeight - (ascent + descent)) / 2 + ascent;

    return {
      cx: (metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft) / 2,
      bottom: baseline + descent,
      height: ascent + descent,
    };
  } catch (_) {
    return null;
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function LetterFlingIntro({
  word,
  pivotIndex,
  className = '',
  letterClassName = '',
  dotClassName = 'bg-gray-200',
  loop = false,
  speed = 1.15,
  onComplete,
}) {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const dotRef = useRef(null);
  const rippleRef = useRef(null);
  const letterRefs = useRef([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const [resizeKey, setResizeKey] = useState(0);
  const letters = useMemo(() => Array.from(word), [word]);
  const pivot = useMemo(() => {
    if (Number.isInteger(pivotIndex) && letters[pivotIndex]?.trim()) return pivotIndex;
    const idx = letters.findIndex((char) => 'Iil1'.includes(char));
    return idx === -1 ? 0 : idx;
  }, [letters, pivotIndex]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const heading = headingRef.current;
    const dot = dotRef.current;
    const ripple = rippleRef.current;
    const letterEls = letterRefs.current.slice(0, letters.length);
    const pivotEl = letterEls[pivot];

    if (!container || !heading || !dot || !pivotEl) return;

    const otherIndices = letterEls
      .map((el, idx) => (el && idx !== pivot && letters[idx].trim() ? idx : -1))
      .filter((idx) => idx !== -1);

    let ctx;
    let isCancelled = false;
    let cleanup = () => {};

    if (prefersReducedMotion()) {
      gsap.set([...letterEls.filter(Boolean)], { opacity: 1 });
      gsap.set(dot, { opacity: 0 });
      const timer = setTimeout(() => onCompleteRef.current?.(), 250);
      return () => clearTimeout(timer);
    }

    gsap.set(letterEls.filter(Boolean), { opacity: 0 });
    gsap.set(dot, { opacity: 0 });

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (isCancelled) return;

      ctx = gsap.context(() => {
        gsap.set([...letterEls.filter(Boolean), dot], { clearProps: 'transform' });

        const containerRect = container.getBoundingClientRect();
        const fontSize = parseFloat(getComputedStyle(heading).fontSize) || 16;
        const letterRects = letterEls.map((el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            w: rect.width,
            h: rect.height,
            cx: rect.left - containerRect.left + rect.width / 2,
            cy: rect.top - containerRect.top + rect.height / 2,
          };
        });

        const pivotRect = letterRects[pivot];
        const fontMetrics = measureLetterMetrics(letters[pivot], pivotEl, pivotRect.h) ?? {
          cx: pivotRect.w / 2,
          bottom: pivotRect.h,
          height: pivotRect.h * 0.78,
        };

        const pivotBase = {
          x: pivotRect.left + fontMetrics.cx,
          y: pivotRect.top + fontMetrics.bottom,
        };
        const pivotHeight = fontMetrics.height;
        const dotSize = fontSize * 0.24;

        gsap.set(pivotEl, {
          transformOrigin: `${(fontMetrics.cx / pivotRect.w) * 100}% ${(fontMetrics.bottom / pivotRect.h) * 100}%`,
        });

        gsap.set(dot, {
          width: dotSize,
          height: dotSize,
          left: pivotBase.x - dotSize / 2,
          top: pivotBase.y + fontSize * 0.1,
        });

        const getTipPos = (angleDeg) => {
          const rad = (angleDeg * Math.PI) / 180;
          return {
            x: pivotBase.x + Math.sin(rad) * pivotHeight,
            y: pivotBase.y - Math.cos(rad) * pivotHeight,
          };
        };

        const dropStartY = -(containerRect.top + pivotBase.y) - fontSize;
        const rippleSize = fontSize * 2.6;

        const addRipple = (tl, pos, opacity, atTime) => {
          tl.set(
            ripple,
            {
              width: rippleSize,
              height: rippleSize,
              left: pos.x - rippleSize / 2,
              top: pos.y - rippleSize / 2,
            },
            atTime
          )
            .to(ripple, { opacity, duration: 0.05, ease: 'none' }, atTime)
            .to(ripple, { opacity: 0, duration: 0.34, ease: 'power2.out' }, atTime + 0.05);
        };

        const flingLetter = (tl, letterIndex, originPos, atTime) => {
          const el = letterEls[letterIndex];
          const rect = letterRects[letterIndex];
          const dx = originPos.x - rect.cx;
          const dy = originPos.y - rect.cy;
          const dur = 0.5 + Math.min(Math.abs(dx) / 900, 0.32);
          const arcHeight = -(Math.abs(dx) * 0.3 + fontSize * 0.25);
          const rot = (dx > 0 ? -1 : 1) * gsap.utils.random(170, 300);

          tl.set(
            el,
            {
              x: dx,
              y: dy,
              rotation: rot,
              scale: 0.3,
              opacity: 0,
              transformOrigin: '50% 50%',
            },
            atTime
          )
            .to(el, { opacity: 1, scale: 1, duration: dur * 0.45 }, atTime)
            .to(el, { x: 0, duration: dur, ease: 'power1.out' }, atTime)
            .to(el, { y: Math.min(dy, 0) + arcHeight, duration: dur * 0.45, ease: 'power2.out' }, atTime)
            .to(el, { y: 0, duration: dur * 0.55, ease: 'power2.in' }, atTime + dur * 0.45)
            .to(el, { rotation: 0, duration: dur, ease: 'power2.out' }, atTime)
            .to(el, { y: -fontSize * 0.05, duration: 0.09, ease: 'power2.out' }, atTime + dur)
            .to(el, { y: 0, duration: 0.16, ease: 'power2.in' }, atTime + dur + 0.09);

          return atTime + dur;
        };

        const flingSide = (tl, tiltAngle, indices, atTime) => {
          if (!indices.length) return atTime;
          const tip = getTipPos(tiltAngle);

          tl.to(pivotEl, { rotation: tiltAngle, duration: 0.4, ease: 'back.out(1.4)' }, atTime);
          tl.to(
            pivotEl,
            { rotation: tiltAngle + (tiltAngle < 0 ? 6 : -6), duration: 0.08 },
            atTime + 0.34
          ).to(
            pivotEl,
            { rotation: tiltAngle, duration: 0.3, ease: 'elastic.out(1, 0.5)' },
            atTime + 0.42
          );

          let maxTime = atTime;
          indices.forEach((idx, i) => {
            const launchTime = atTime + 0.34 + i * 0.1;
            addRipple(tl, tip, 0.5 - i * 0.1, launchTime);
            maxTime = Math.max(maxTime, flingLetter(tl, idx, tip, launchTime));
          });
          return maxTime;
        };

        const masterTl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? 1.1 : 0,
          onComplete: () => {
            if (!loop) onCompleteRef.current?.();
          },
        });

        masterTl.timeScale(speed);
        masterTl
          .set(container, { opacity: 1 })
          .set(letterEls.filter(Boolean), { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 })
          .set(pivotEl, { opacity: 0, y: dropStartY, rotation: 0 })
          .set(dot, { opacity: 0, y: dropStartY, scale: 1 });

        // Phase 1: Dot drops & bounces twice with squash and stretch
        const dotTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        const bounceHeight = fontSize * 0.4;

        dotTl
          .set(dot, { opacity: 1 }, 0)
          .to(dot, { y: 0, duration: 0.42, ease: 'power2.in' }, 0)
          .to(dot, { scaleX: 0.82, scaleY: 1.22, duration: 0.28, ease: 'power1.in' }, 0.14)
          .to(dot, { scaleX: 1.4, scaleY: 0.52, duration: 0.06 }, 0.42)
          .to(dot, { y: -bounceHeight, duration: 0.2 }, 0.48)
          .to(dot, { scaleX: 1, scaleY: 1, duration: 0.18 }, 0.48)
          .to(dot, { y: 0, duration: 0.18, ease: 'power2.in' }, 0.68)
          .to(dot, { scaleX: 0.92, scaleY: 1.08, duration: 0.14, ease: 'power1.in' }, 0.72)
          .to(dot, { scaleX: 1.2, scaleY: 0.74, duration: 0.05 }, 0.86)
          .to(dot, { scaleX: 1, scaleY: 1, duration: 0.36, ease: 'elastic.out(1, 0.42)' }, 0.91);

        addRipple(dotTl, pivotBase, 0.4, 0.42);
        addRipple(dotTl, pivotBase, 0.24, 0.86);

        // Phase 2: Pivot letter drops and bounces elastically
        const pivotBounce = fontSize * 0.13;
        dotTl
          .set(pivotEl, { opacity: 1 }, 0.8)
          .to(pivotEl, { y: 0, duration: 0.34, ease: 'power2.in' }, 0.8)
          .to(pivotEl, { scaleX: 0.86, scaleY: 1.16, duration: 0.24, ease: 'power1.in' }, 0.88)
          .to(pivotEl, { scaleX: 1.32, scaleY: 0.64, duration: 0.06 }, 1.14)
          .to(pivotEl, { y: -pivotBounce, duration: 0.1 }, 1.2)
          .to(pivotEl, { scaleX: 1, scaleY: 1, duration: 0.12 }, 1.2)
          .to(pivotEl, { y: 0, duration: 0.1, ease: 'power2.in' }, 1.3)
          .to(pivotEl, { scaleX: 1.12, scaleY: 0.88, duration: 0.05 }, 1.4)
          .to(pivotEl, { scaleX: 1, scaleY: 1, duration: 0.38, ease: 'elastic.out(1, 0.4)' }, 1.45)
          .fromTo(pivotEl, { rotation: -9 }, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.36)' }, 1.19);

        addRipple(dotTl, pivotBase, 0.6, 1.14);
        addRipple(dotTl, pivotBase, 0.26, 1.4);

        const timeScaleFactor = 0.5;
        masterTl.add(dotTl.timeScale(timeScaleFactor), 0);

        // Phase 3: Tilt left & fling left letters, then tilt right & fling right letters
        const leftLetters = otherIndices.filter((idx) => idx < pivot).reverse();
        const rightLetters = otherIndices.filter((idx) => idx > pivot);

        let flingStartTime = 1.4 / timeScaleFactor;
        flingStartTime = flingSide(masterTl, -Ri, leftLetters, flingStartTime);
        flingStartTime = flingSide(
          masterTl,
          Ri,
          rightLetters,
          leftLetters.length ? flingStartTime - 0.3 : flingStartTime
        );

        masterTl
          .to(pivotEl, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.55)' }, flingStartTime - 0.16)
          .to(dot, { opacity: 0, scale: 0, duration: 0.3, ease: 'power2.in' }, flingStartTime - 0.12);

        let resizeTimer;
        const handleResize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (loop) {
              setResizeKey((k) => k + 1);
            } else if (masterTl.progress() < 1) {
              masterTl.progress(1);
            }
          }, 150);
        };

        window.addEventListener('resize', handleResize);
        cleanup = () => {
          clearTimeout(resizeTimer);
          window.removeEventListener('resize', handleResize);
        };
      }, container);
    });

    return () => {
      isCancelled = true;
      cleanup();
      ctx?.revert();
    };
  }, [letters, pivot, loop, speed, resizeKey]);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute top-0 left-0 opacity-0">
      <h1 ref={headingRef} className={className}>
        {letters.map((char, idx) => (
          <span
            key={`${char}-${idx}`}
            ref={(el) => {
              letterRefs.current[idx] = el;
            }}
            className={`inline-block will-change-transform ${letterClassName}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      <span ref={dotRef} className={`absolute rounded-full pointer-events-none ${dotClassName}`} />
      <span
        ref={rippleRef}
        className="absolute rounded-full opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
    </div>
  );
}
