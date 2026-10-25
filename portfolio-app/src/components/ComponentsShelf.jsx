import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ComponentsShelf({ onCtaClick }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const items = [
    {
      id: 'sigil',
      name: 'Sigil',
      price: '$10',
      tagline: 'a code field that seals itself',
      meta: '12.2 KB · 0 DEPS',
      video: '/assets/reels/sigil.mp4',
    },
    {
      id: 'quarto',
      name: 'Quarto',
      price: '$10',
      tagline: 'four boxes that fold into one',
      meta: '16.1 KB · 0 DEPS',
      video: '/assets/reels/quarto.mp4',
    },
    {
      id: 'parachute',
      name: 'Parachute',
      price: '$5',
      tagline: 'animated download button',
      meta: '9.2 KB · 0 DEPS',
      video: '/assets/reels/parachute.mp4',
    },
    {
      id: 'quench',
      name: 'Quench',
      price: '$5',
      tagline: 'Submit Button Animation',
      meta: '11.9 KB · 0 DEPS',
      video: '/assets/reels/quench.mp4',
    },
    {
      id: 'lucid',
      name: 'Lucid',
      price: '$5',
      tagline: 'liquid glass segmented bar',
      meta: '8.0 KB · 0 DEPS',
      video: '/assets/reels/lucid.mp4',
    },
  ];

  // Media query listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const desktopMq = window.matchMedia('(min-width: 1024px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateDesktop = () => setIsDesktop(desktopMq.matches);
    const updateMotion = () => setIsReducedMotion(motionMq.matches);

    updateDesktop();
    updateMotion();

    desktopMq.addEventListener('change', updateDesktop);
    motionMq.addEventListener('change', updateMotion);

    return () => {
      desktopMq.removeEventListener('change', updateDesktop);
      motionMq.removeEventListener('change', updateMotion);
    };
  }, []);

  const shouldPin = isDesktop && !isReducedMotion;

  // Active card index updater
  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    Array.from(track.children).forEach((child, idx) => {
      const diff = Math.abs(child.offsetLeft - track.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveCard(closestIdx);
  }, []);

  // Native scroll listener for touch / unpinned modes
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId = 0;
    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateActiveIndex);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    updateActiveIndex();
    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener('scroll', onScroll);
    };
  }, [updateActiveIndex]);

  // GSAP ScrollTrigger Desktop Pinning
  useEffect(() => {
    if (!shouldPin) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollDist = () => track.scrollWidth - track.clientWidth;
    if (getScrollDist() <= 0) return;

    const tween = gsap.to(track, {
      scrollLeft: getScrollDist,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDist()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      },
    });

    const refreshST = () => ScrollTrigger.refresh();
    const timer = setTimeout(refreshST, 300);
    window.addEventListener('load', refreshST);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refreshST);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { clearProps: 'scrollLeft' });
    };
  }, [shouldPin]);

  // Keyboard navigation
  const scrollToCard = useCallback(
    (index) => {
      const track = trackRef.current;
      if (!track) return;
      const targetCard = track.children[Math.max(0, Math.min(track.children.length - 1, index))];
      if (targetCard) {
        track.scrollTo({
          left: targetCard.offsetLeft - track.offsetLeft,
          behavior: isReducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [isReducedMotion]
  );

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToCard(activeCard + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToCard(activeCard - 1);
    }
  };

  // Pointer drag for unpinned viewports
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch' || shouldPin) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    track.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const diff = e.clientX - dragRef.current.startX;
    dragRef.current.moved = Math.abs(diff);
    trackRef.current.scrollLeft = dragRef.current.startScroll - diff;
  };

  const onPointerUp = (e) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      trackRef.current?.releasePointerCapture?.(e.pointerId);
    }
  };

  return (
    <section
      id="components"
      ref={sectionRef}
      className={`bg-[#050505] w-full text-white overflow-hidden border-t border-white/[0.08] ${
        shouldPin ? 'h-screen flex flex-col justify-center py-0' : 'pt-16 pb-24'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-6 px-6 md:px-16">
        {/* Left Column: Heading & CTAs */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
          <div className="bg-white/[0.04] p-6 md:p-8 rounded-2xl border border-white/10 mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Interface parts that behave under pressure.
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              6 components, 66.1 KB in total, every one of them plain HTML, CSS and JavaScript with no
              framework and no build step.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onCtaClick}
              className="px-6 py-3.5 rounded-full bg-[var(--accent)] text-black font-bold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-[0_0_24px_-6px_var(--accent)] cursor-pointer"
            >
              BROWSE THE SHOP ↗
            </button>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-xs tracking-wider uppercase hover:bg-white/10 hover:border-white/40 transition-colors"
            >
              MESSAGE ME
            </a>
          </div>
        </div>

        {/* Right Column: Cards Shelf Track */}
        <div className="flex-1 min-w-0 flex flex-col bg-white/[0.02] p-4 md:p-6 rounded-2xl border border-white/[0.08]">
          <div
            ref={trackRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Component previews"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={`flex items-stretch gap-4 md:gap-6 py-2 ${
              shouldPin ? 'overflow-x-hidden' : 'overflow-x-auto snap-x scrollbar-none'
            }`}
          >
            {items.map((card, idx) => (
              <div
                key={card.id}
                className={`w-[260px] sm:w-[280px] shrink-0 rounded-2xl bg-[#0a0a0c] border border-white/10 p-4 flex flex-col justify-between transition-all duration-300 ${
                  activeCard === idx
                    ? 'scale-100 opacity-100 ring-1 ring-white/30 shadow-2xl'
                    : 'scale-95 opacity-60'
                }`}
              >
                {/* Reel Video Frame */}
                <div className="relative aspect-[9/14] rounded-xl overflow-hidden bg-black mb-4 border border-white/[0.08]">
                  <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded bg-[#ff5c3d] text-[#161616] text-[10px] font-mono font-bold tracking-widest uppercase">
                    REEL
                  </span>
                  <video
                    src={card.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card Info */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-lg font-bold text-white">{card.name}</h4>
                    <span className="font-mono text-sm text-gray-400">{card.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{card.tagline}</p>
                  <p className="font-mono text-[11px] text-gray-500 mb-4">{card.meta}</p>

                  <button
                    type="button"
                    onClick={onCtaClick}
                    className="w-full py-2 rounded-full border border-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-white/10 hover:border-white/40 transition-colors"
                  >
                    <span>Inspect Component</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Final Catalogue Card */}
            <div className="w-[260px] sm:w-[280px] shrink-0 rounded-2xl bg-[#0d0d0f] border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-mono tracking-widest uppercase text-gray-500 mb-2">
                  THE FULL CATALOGUE
                </p>
                <h4 className="text-5xl font-black text-white mb-4">All</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  components & templates. Every one shown running in a real reel before you buy it.
                </p>
              </div>
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full py-2.5 rounded-full bg-white/[0.08] hover:bg-white text-white hover:text-black font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Browse all ↗
              </button>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="border-t border-white/[0.08] pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span>SCROLL = SHELF</span>
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-150"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span>P {scrollProgress.toFixed(2)}</span>
            </div>

            <div className="text-[#ff5c3d] tracking-widest text-[11px] uppercase font-bold">
              {shouldPin ? '↓ SCROLL TO TRANSLATE SHELF' : '← DRAG TO BROWSE SHELF →'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
