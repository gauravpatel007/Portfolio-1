import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK_ROWS = [
  {
    label: 'Core AI & ML',
    items: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV'],
    duration: 50,
    reverse: false
  },
  {
    label: 'GenAI & NLP',
    items: ['LangChain', 'LangGraph', 'Hugging Face', 'RAG Pipelines', 'Vector Databases', 'Ollama', 'spaCy', 'ChromaDB', 'Pinecone', 'Reranking'],
    duration: 44,
    reverse: true
  },
  {
    label: 'Engineering & Tooling',
    items: ['PostgreSQL', 'Docker', 'Git', 'GitHub Actions', 'VS Code', 'Vite', 'React', 'Tailwind CSS'],
    duration: 52,
    reverse: false
  }
];

const BIO_TEXT_TOKENS = [
  { text: "Hey,", highlight: false },
  { text: "I'm", highlight: false },
  { text: "Gaurav Patel.", highlight: true, className: "font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300" },
  { text: "An", highlight: false },
  { text: "AI/ML Engineer", highlight: true, className: "text-white font-medium" },
  { text: "and", highlight: false },
  { text: "Computer Science", highlight: false },
  { text: "undergraduate", highlight: false },
  { text: "specializing in building", highlight: false },
  { text: "production-ready Generative AI systems,", highlight: true, className: "text-white font-medium" },
  { text: "RAG architectures,", highlight: true, className: "text-white font-medium" },
  { text: "and intelligent NLP workflows.", highlight: false },
  { text: "AI Intern at", highlight: false },
  { text: "Ativeg Technologies", highlight: true, className: "text-white font-medium" },
  { text: "and Final Round participant at the", highlight: false },
  { text: "Odoo x Indus University Hackathon 2026.", highlight: true, className: "text-white font-medium" },
  { text: "I develop full-stack AI applications with", highlight: false },
  { text: "Python, LangChain, LangGraph, Ollama, spaCy, and PostgreSQL", highlight: true, className: "text-white font-medium" },
  { text: "— engineering offline and cloud-connected intelligence that runs reliably in production.", highlight: false }
];

export default function About({ profileData }) {
  const sectionRef = useRef(null);
  const introHeadingRef = useRef(null);
  const bioRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const bioEl = bioRef.current;
    if (!sectionEl || !bioEl || typeof window === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 768px)',
        mobile: '(max-width: 767px)',
        motion: '(prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const { desktop, motion } = context.conditions;

        if (motion) {
          // 1. Intro metallic heading slide up
          gsap.from(introHeadingRef.current, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top 75%',
              once: true
            }
          });

          // 2. Word-by-word scrub reveal on desktop
          if (desktop) {
            const words = bioEl.querySelectorAll('.word');
            gsap.fromTo(
              words,
              { color: '#52525b', opacity: 0.25 },
              {
                color: '#ffffff',
                opacity: 1,
                stagger: 0.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: bioEl,
                  start: 'top 85%',
                  end: 'bottom 50%',
                  scrub: true
                }
              }
            );
          } else {
            gsap.from(bioEl, {
              y: 24,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: bioEl,
                start: 'top 90%',
                once: true
              }
            });
          }
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-[#050505] text-white pt-24 pb-16 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full z-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 lg:gap-24 items-center mb-16">
          {/* Left Column: Intro Heading */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] text-gray-400 mb-4 md:mb-6">
              About me
            </span>
            <h2
              ref={introHeadingRef}
              className="text-[17vw] md:text-[7.5rem] lg:text-[9.5rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.85] pr-6 pb-2"
            >
              Intro
            </h2>
            <a
              href="/assets/Gaurav_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-xs font-semibold tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all shadow-md focus:outline-none focus:ring-1 focus:ring-white"
            >
              <span>Download CV</span>
              <span>↓</span>
            </a>
          </div>

          {/* Right Column: Bio Card with scrubbed word spans */}
          <div
            ref={bioRef}
            className="relative bg-white/[0.04] backdrop-blur-md px-6 py-8 md:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-2xl"
          >
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light leading-relaxed">
              {BIO_TEXT_TOKENS.map((token, idx) => (
                <span
                  key={idx}
                  className={`word mr-1.5 ${token.className || ''}`}
                >
                  {token.text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* The Stack: Continuous Marquee Rows */}
        <div className="border-t border-white/[0.08] pt-12">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-6 text-center md:text-left">
            THE STACK // PRODUCTION CAPABILITIES
          </p>

          <div className="space-y-3">
            {STACK_ROWS.map((row, rowIdx) => {
              const repeatedItems = [...row.items, ...row.items, ...row.items];
              return (
                <div key={rowIdx} className="marquee-row" aria-hidden="true">
                  <div
                    className="marquee-track"
                    style={{
                      '--marquee-duration': `${row.duration}s`,
                      '--marquee-direction': row.reverse ? 'reverse' : 'normal'
                    }}
                  >
                    {repeatedItems.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="mx-1 md:mx-1.5 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs md:text-sm font-medium tracking-wide text-gray-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white transition-colors duration-200"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
