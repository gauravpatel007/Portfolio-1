import React, { useRef } from 'react';
import { useScrollReveals } from '../utils/animations';

export default function Projects() {
  const containerRef = useRef(null);

  useScrollReveals(containerRef);

  const projects = [
    {
      num: '01',
      sans1: 'LIFE',
      italic: 'os',
      sans2: 'HEALTHCARE PLATFORM',
      desc: 'An AI healthcare platform covering symptom analysis, medical record understanding, personalized fitness and nutrition recommendations, medication management, and health tracking.',
      tech: ['GenAI', 'NLP', 'Health Intelligence', 'Python'],
      img: '/assets/lifeos.png',
      github: 'https://github.com/gauravpatel007/Healthcare-Ai-Mobile',
      demo: 'http://16.171.242.175/',
      imageLeft: true,
    },
    {
      num: '02',
      sans1: 'RESUME',
      italic: 'intel',
      sans2: 'SCREENING ENGINE',
      desc: 'A full-stack resume screening platform where candidates upload PDF resumes and recruiters search and rank candidates by job role and skills with spaCy NER and a weighted 100-point algorithm.',
      tech: ['Python', 'spaCy', 'React', 'PostgreSQL', 'NLP'],
      img: '/assets/resume_intel.png',
      github: 'https://github.com/gauravpatel007/Ai-Resume-Intelligence',
      demo: null,
      imageLeft: false,
    },
    {
      num: '03',
      sans1: 'RAG',
      italic: 'study',
      sans2: 'ASSISTANT SYSTEM',
      desc: 'A locally running, privacy-preserving study assistant enabling users to upload PDF documents and ask questions grounded in content with Ollama, Qwen3, and Sentence Transformers without paid APIs.',
      tech: ['Python', 'RAG', 'Ollama', 'Qwen3', 'Embeddings'],
      img: '/assets/study_assistant.png',
      github: 'https://github.com/gauravpatel007/RAG-Based-Study-assistant',
      demo: null,
      imageLeft: true,
    },
    {
      num: '04',
      sans1: 'AGENTIC',
      italic: 'pulse',
      sans2: 'WORKFLOW STUDIO',
      desc: 'Autonomous multi-agent task execution and semantic retrieval pipelines built with LangGraph, vector databases, and custom reasoning loops for intelligent code and data extraction.',
      tech: ['LangGraph', 'Agentic AI', 'Vector DB', 'PyTorch'],
      img: '/assets/expense.jpg',
      github: 'https://github.com/gauravpatel007',
      demo: null,
      imageLeft: false,
      hidden: true, // Hidden per user request (preserved in codebase)
    },
  ];

  return (
    <section id="project" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto space-y-32">
      {projects
        .filter((proj) => !proj.hidden)
        .map((proj) => {
        const ImageBlock = (
          <div className="w-full lg:w-7/12" data-parallax-frame="true">
            <div
              data-parallax="25"
              className="group relative rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 shadow-2xl p-2 sm:p-3 transition-all duration-300 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <img
                src={proj.img}
                alt={`${proj.sans1} ${proj.italic} ${proj.sans2}`}
                className="w-full h-auto object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>
        );

        const ContentBlock = (
          <div className="w-full lg:w-5/12 flex flex-col justify-center" data-reveal-group="0.1">
            <span className="font-mono text-sm font-semibold text-gray-500 mb-3 tracking-wider">
              {proj.num}
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              {proj.sans1}{' '}
              <span className="font-serif italic font-light text-gray-300 lowercase text-3xl sm:text-4xl lg:text-5xl">
                {proj.italic}
              </span>{' '}
              {proj.sans2}
            </h3>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              {proj.desc}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-[11px] font-mono text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              {proj.demo && (
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs md:text-sm tracking-wide hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>Live Demo</span>
                  <span>↗</span>
                </a>
              )}

              <a
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-medium text-xs md:text-sm tracking-wide hover:border-white/50 hover:bg-white/[0.05] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>GitHub</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        );

        return (
          <div
            key={proj.num}
            className={`flex flex-col ${
              proj.imageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-12 lg:gap-16 items-center`}
          >
            {ImageBlock}
            {ContentBlock}
          </div>
        );
      })}
    </section>
  );
}
