import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroMosaicCanvas from './HeroMosaicCanvas';
import LetterFlingIntro from './LetterFlingIntro';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero({ profileData, onPreloadComplete }) {
  const wordmark = profileData?.personal?.wordmark || 'GAURAV';
  const roleBold = profileData?.personal?.role?.bold || profileData?.personal?.title?.split(' ')[0] || 'AI/ML';
  const roleLight = profileData?.personal?.role?.light || profileData?.personal?.title?.split(' ').slice(1).join(' ') || 'Engineer';

  const [displayText, setDisplayText] = useState(wordmark);
  const [physicsFinished, setPhysicsFinished] = useState(false);
  const [renderPhysics, setRenderPhysics] = useState(true);
  const [isMosaicReady, setIsMosaicReady] = useState(false);

  const containerRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const headingRef = useRef(null);
  const leftWordRef = useRef(null);
  const rightWordRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const portraitRef = useRef(null);

  // Initial scroll lock & portrait preload
  useEffect(() => {
    const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      setPhysicsFinished(true);
      setRenderPhysics(false);
      setDisplayText('PORTFOLIO');
      setIsMosaicReady(true);
      document.body.style.overflow = 'auto';
      if (onPreloadComplete) onPreloadComplete();
      return;
    }

    // Lock scroll to hero during introductory sequence
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Morph from wordmark to PORTFOLIO, then drop & split
  useEffect(() => {
    if (!physicsFinished) return;

    const targetWord = 'PORTFOLIO';
    const initialWord = wordmark;
    let iteration = 0;
    let intervalId;
    let ctx;

    // Wait briefly after physics settling before cypher morph begins
    const startMorphDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        setDisplayText(() =>
          targetWord
            .split('')
            .map((char, idx) => {
              if (idx < Math.floor(iteration)) return targetWord[idx];
              if (idx < initialWord.length) return initialWord[idx];
              return '';
            })
            .join('')
        );

        if (iteration >= targetWord.length) {
          clearInterval(intervalId);

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = 'auto';
                ScrollTrigger.refresh();
                if (onPreloadComplete) onPreloadComplete();
              },
            });

            const isMobile = window.innerWidth < 768;
            const splitAmount = isMobile
              ? window.innerWidth * 0.2
              : Math.min(300, window.innerWidth * 0.2);

            // Move heading down across the chest/chin
            tl.to(
              headingWrapperRef.current,
              {
                top: isMobile ? '20%' : '74%',
                duration: 1.5,
                ease: 'power3.inOut',
              },
              '+=0.2'
            );

            // Fade in and slide up subtitle and action controls
            tl.fromTo(
              [subtitleRef.current, ctaGroupRef.current],
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' },
              '-=1.0'
            );

            // Trigger mosaic assembly on Gaurav's photo
            tl.call(() => setIsMosaicReady(true), null, '-=1.2');

            // Split PORT and FOLIO horizontally
            tl.to(
              leftWordRef.current,
              {
                x: -splitAmount / 2,
                duration: 1.5,
                ease: 'power3.out',
              },
              '<'
            );

            tl.to(
              rightWordRef.current,
              {
                x: splitAmount / 2,
                duration: 1.5,
                ease: 'power3.out',
              },
              '<'
            );
          }, containerRef);
        }

        iteration += 1 / 3;
      }, 50);
    }, 150);

    return () => {
      clearTimeout(startMorphDelay);
      clearInterval(intervalId);
      ctx?.revert();
    };
  }, [physicsFinished, wordmark]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, #222222 0%, #000000 80%)' }}
    >
      {/* Pure black backdrop during intro animation */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none z-10 ${
          isMosaicReady ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Background vignette & blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

      {/* Decorative star dots field */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Interactive WebGL2 Photomosaic Canvas */}
      <HeroMosaicCanvas
        src="/assets/hero_center.png"
        anchorRef={portraitRef}
        play={isMosaicReady}
        label="Interactive AI/ML Engineer photomosaic portrait"
      />

      {/* Central Portrait Anchor (Used for bounding calculations & WebGL fallback) */}
      <div className="absolute inset-x-0 top-[28vh] md:top-[2vh] z-0 text-center text-white flex flex-col items-center w-full pointer-events-none select-none">
        <div className="relative">
          <img
            ref={portraitRef}
            src="/assets/hero_center.png"
            alt="Gaurav Patel — AI/ML Engineer Portrait"
            className="invisible w-auto max-w-none h-[110vh] md:h-[143vh]"
          />
        </div>
      </div>

      {/* Heading Layer: Large Split Typography */}
      <div
        ref={headingWrapperRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-start w-max"
      >
        <h1
          ref={headingRef}
          className={`flex items-baseline text-[14vw] md:text-[9rem] lg:text-[12.5rem] font-black tracking-tight drop-shadow-2xl leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 transition-opacity duration-300 px-4 py-2 ${
            physicsFinished ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span ref={leftWordRef} className="inline-block pr-1">
            {displayText.slice(0, 4)}
          </span>
          <span ref={rightWordRef} className="inline-block pl-1 pr-6">
            {displayText.slice(4)}
          </span>
        </h1>

        {renderPhysics && (
          <div
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              physicsFinished ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <LetterFlingIntro
              word={wordmark}
              pivotIndex={3}
              className="flex items-baseline text-[16vw] md:text-[10rem] lg:text-[14rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase"
              letterClassName="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800"
              dotClassName="bg-gray-200"
              speed={1.15}
              onComplete={() => {
                setPhysicsFinished(true);
                setTimeout(() => setRenderPhysics(false), 320);
              }}
            />
          </div>
        )}

        {/* Subtitle bottom left */}
        <p
          ref={subtitleRef}
          className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-8 text-white text-base md:text-2xl lg:text-3xl drop-shadow-md z-30 opacity-0 w-max pointer-events-auto"
        >
          <span className="font-bold tracking-tight">{roleBold}</span>{' '}
          <span className="font-light italic text-gray-300">{roleLight}</span>
        </p>

        {/* Action controls bottom right */}
        <div
          ref={ctaGroupRef}
          className="absolute -bottom-20 md:-bottom-12 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-12 flex items-center gap-3 pointer-events-auto z-30 opacity-0 w-max"
        >
          <a
            href="#contact"
            aria-label="Scroll to contact"
            className="group w-9 h-9 md:w-11 md:h-11 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 transition-transform duration-300 group-hover:rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
            </svg>
          </a>
          <a
            href="#contact"
            className="px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-gray-400/30 flex items-center justify-center backdrop-blur-md bg-black/40 hover:bg-white/10 hover:border-gray-400/50 transition-all duration-300 cursor-pointer"
          >
            <span className="text-gray-300 text-xs md:text-sm font-light italic tracking-wider">
              Contact
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
