import React, { useState, useRef } from 'react';
import { useScrollReveals } from '../utils/animations';

export default function Services() {
  const [activeItem, setActiveItem] = useState(null);
  const containerRef = useRef(null);

  useScrollReveals(containerRef);

  const services = [
    {
      num: '01',
      title: 'GENERATIVE AI & LLM APPLICATIONS',
      desc: 'Architecting custom LLM-powered applications, conversational interfaces, and intelligent assistants using LangChain, LangGraph, and open-source models with Ollama and Hugging Face.',
    },
    {
      num: '02',
      title: 'RETRIEVAL-AUGMENTED GENERATION (RAG)',
      desc: 'Building high-accuracy, privacy-preserving document search and question-answering systems with vector databases, semantic embeddings, and verifiable source citations.',
    },
    {
      num: '03',
      title: 'FULL-STACK AI AGENTS & APIS',
      desc: 'Developing production Python AI backends, secure authenticated services, and modern frontends that integrate AI capabilities into cohesive user-facing products.',
    },
    {
      num: '04',
      title: 'NLP & SEMANTIC SEARCH PIPELINES',
      desc: 'Named entity recognition (NER), skill taxonomy matching with spaCy, TF-IDF classification, and high-performance search algorithms for structured and unstructured data.',
    },
    {
      num: '05',
      title: 'MACHINE LEARNING & MODEL OPTIMIZATION',
      desc: 'Custom neural network architectures, hyperparameter tuning with PyTorch & Scikit-learn, and feature engineering for predictive and recommendation systems.',
    },
  ];

  return (
    <section id="service" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Top Heading */}
      <h2
        data-reveal="right"
        className="text-5xl md:text-7xl lg:text-8xl font-black text-right chrome-text mb-16 uppercase leading-tight"
      >
        WHAT I CAN DO
      </h2>

      {/* Accordion List */}
      <div className="border-t border-white/[0.08]" onMouseLeave={() => setActiveItem(null)}>
        {services.map((item, index) => {
          const isSelected = activeItem === index;
          return (
            <div
              key={item.num}
              onClick={() => setActiveItem(activeItem === index ? null : index)}
              onMouseEnter={() => setActiveItem(index)}
              onTouchStart={() => setActiveItem(activeItem === index ? null : index)}
              className={`group border-b border-white/[0.08] transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#cfc9bc] text-[#16150f]'
                  : 'bg-transparent text-white hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between py-7 md:py-9 px-4 md:px-8">
                <div className="flex items-center gap-6 md:gap-12">
                  <span
                    className={`font-mono text-base md:text-xl font-medium transition-colors ${
                      isSelected ? 'text-[#16150f]/70' : 'text-gray-500'
                    }`}
                  >
                    {item.num}
                  </span>
                  <h3
                    className={`text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-tight transition-colors ${
                      isSelected ? 'text-[#16150f]' : 'text-white group-hover:text-[#e8e4dc]'
                    }`}
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                      isSelected
                        ? 'text-[#16150f] rotate-45'
                        : 'text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H16M7 17V8" />
                  </svg>
                </div>
              </div>

              {/* Expandable Description with robust height transition */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isSelected ? '1fr' : '0fr',
                  transition: 'grid-template-rows 300ms ease-out, opacity 300ms ease-out',
                  opacity: isSelected ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 md:px-8 pb-8 pt-0 text-sm md:text-base text-[#16150f]/85 max-w-3xl leading-relaxed">
                    <p>{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
