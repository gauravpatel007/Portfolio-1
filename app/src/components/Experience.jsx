import React, { useRef } from 'react';
import { useScrollReveals } from '../utils/animations';

const MILESTONES = [
  {
    id: 'ativeg',
    category: 'Industry Internship',
    status: 'Active / In Progress',
    statusType: 'active', // green glow
    role: 'AI Intern',
    organization: 'Ativeg Technologies',
    period: 'Jul 2026 – Present',
    location: 'Ahmedabad, India',
    summary:
      'Developing production Generative AI systems, RAG architectures, and intelligent conversational workflows.',
    bullets: [
      'Building and deploying LLM applications and conversational interfaces with LangChain and LangGraph.',
      'Developing privacy-preserving and cloud-connected RAG pipelines with vector databases (ChromaDB, Pinecone) and Ollama.',
      'Implementing intelligent NLP extraction, semantic reranking, and structured data persistence with PostgreSQL.',
    ],
    tech: ['LangChain', 'LangGraph', 'RAG Pipelines', 'Vector Databases', 'Ollama', 'spaCy', 'PostgreSQL', 'Python'],
  },
  {
    id: 'odoo-hackathon',
    category: 'Competitive Engineering',
    status: 'Grand Finale Qualifier',
    statusType: 'award', // amber glow
    role: 'Hackathon Onsite Finalist (Top 90 Teams)',
    organization: 'Odoo x Indus University Hackathon 2026',
    period: 'Apr 4–05, 2026',
    location: 'IITE, Indus University',
    summary:
      'Qualified through competitive virtual screening to compete in the 24-hour Onsite Grand Finale among the top 90–120 teams.',
    bullets: [
      'Selected from hundreds of applicant teams in the initial virtual qualification round.',
      'Advanced to the 24-hour Onsite Grand Finale Hackathon, building rapid AI-enabled prototypes under strict time constraints.',
      'Demonstrated high-pressure technical execution, rapid debugging, and functional system presentation.',
    ],
    tech: ['Rapid Prototyping', 'Full-Stack Integration', '24H Hackathon Execution'],
  },
  {
    id: 'indus-internship',
    category: 'Research & Applied AI',
    status: 'Certified with Appreciation',
    statusType: 'cert', // blue glow
    role: 'AI Intern',
    organization: 'Indus University',
    period: 'Jun 2024 – Jul 2024',
    location: 'Ahmedabad, India',
    summary:
      'Completed an intensive applied AI program covering machine learning, deep learning fundamentals, and neural network architectures.',
    bullets: [
      'Trained and evaluated deep neural networks for classification and predictive modeling using PyTorch and TensorFlow.',
      'Performed rigorous feature engineering, exploratory data analysis, and hyperparameter optimization.',
      'Honored with the official Certificate of Appreciation for outstanding performance and applied technical contributions.',
    ],
    tech: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Neural Networks', 'NumPy', 'Pandas'],
  },
  {
    id: 'btech-cse',
    category: 'Academic Foundation',
    status: 'Final Year Undergrad',
    statusType: 'academic', // purple glow
    role: 'B.Tech in Computer Science Engineering',
    organization: 'Indus Institute of Technology & Engineering',
    period: '2023 – Expected May 2027',
    location: 'Ahmedabad, Gujarat',
    summary:
      'Comprehensive undergraduate engineering curriculum with specialized elective focus on Artificial Intelligence and Machine Learning.',
    bullets: [
      'Core foundation in Computer Science, Database Systems (PostgreSQL), and Software Engineering.',
      'Advanced coursework in Natural Language Processing (NLP), Deep Learning, and Artificial Intelligence.',
      'Active peer collaboration, technical project builds, and ongoing production-level software development.',
    ],
    tech: ['Computer Science', 'AI/ML Specialization', 'Machine Learning', 'Natural Language Processing'],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  useScrollReveals(containerRef);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {status}
          </span>
        );
      case 'award':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-amber-500/10 border border-amber-500/30 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {status}
          </span>
        );
      case 'cert':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-sky-500/10 border border-sky-500/30 text-sky-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            {status}
          </span>
        );
      case 'academic':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide bg-purple-500/10 border border-purple-500/30 text-purple-300">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {status}
          </span>
        );
    }
  };

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-16 md:mb-24" data-reveal-group="0.1">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-gray-400 font-semibold">
            TRACK RECORD // REAL-WORLD ENGINEERING
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            EXPERIENCE &{' '}
            <span className="font-serif italic font-light text-gray-300 lowercase text-4xl sm:text-5xl lg:text-6xl">
              milestones
            </span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Hands-on production internships, competitive hackathons, and final-year academic foundations in Generative AI and Machine Learning.
          </p>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="relative border-l border-white/10 ml-3 md:ml-6 pl-6 md:pl-12 space-y-12 md:space-y-16">
        {MILESTONES.map((item, index) => (
          <div key={item.id} className="relative group" data-reveal="up">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/40 group-hover:border-white group-hover:scale-125 transition-all duration-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:bg-white transition-colors" />
            </div>

            {/* Main Card */}
            <div className="p-6 sm:p-8 md:p-10 rounded-2xl bg-zinc-950/60 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/25 hover:bg-zinc-900/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Card Header Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-500 block mb-1">
                    0{index + 1} // {item.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                    {item.role}
                  </h3>
                  <div className="text-sm sm:text-base text-gray-300 font-medium mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-white">{item.organization}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400 font-mono text-xs sm:text-sm">{item.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  {getStatusBadge(item.status, item.statusType)}
                  <span className="font-mono text-xs text-gray-400 tracking-wide">{item.period}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {item.summary}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-2.5 mb-8 text-sm text-gray-400 leading-relaxed border-t border-white/[0.06] pt-6">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="text-white/40 mt-1 select-none font-mono text-xs">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider mr-2">Skills:</span>
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[11px] font-mono text-gray-300 hover:border-white/30 hover:bg-white/[0.08] transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
