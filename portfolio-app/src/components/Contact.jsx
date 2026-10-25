import React, { useRef } from 'react';
import { useScrollReveals } from '../utils/animations';

export default function Contact({ profileData }) {
  const containerRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  useScrollReveals(containerRef);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profileData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative pt-20 pb-8 md:pt-28 md:pb-10 px-6 md:px-16 overflow-hidden">
      {/* Background Looping Ambient Video */}
      <video
        src="/assets/contact_bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-[#050505]/75 backdrop-blur-[2px] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Direct CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start" data-reveal-group="0.12">
            {/* Status Pill with Pulsing Halo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md mb-8">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-halo absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-white">
                AVAILABLE FOR WORK
              </span>
            </div>

            <h2 className="text-6xl md:text-8xl font-black chrome-text leading-none mb-6">
              Get in touch
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Open for full-time AI/ML engineering roles, generative AI contracts, and high-impact
              collaborations — LLM chatbots, RAG pipelines, and agentic workflows in particular.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919725259773"
                target="_blank"
                rel="noreferrer"
                className="group relative px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs md:text-sm tracking-wide shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.35)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-3 cursor-pointer overflow-hidden border border-white"
              >
                {/* Subtle sheen layer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
                  Message on WhatsApp
                </span>

                {/* Real WhatsApp SVG Vector Icon in Black */}
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 fill-black transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
              </a>

              {/* Send Email Button */}
              <a
                href={`mailto:${profileData.personal.email}`}
                className="group relative px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-white font-medium text-xs md:text-sm tracking-wide shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
                  Send an email
                </span>

                {/* Sleek Envelope Vector SVG Icon */}
                <span className="relative z-10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white group-hover:text-black transition-all duration-300 group-hover:scale-115 group-hover:rotate-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details Glass Card */}
          <div className="lg:col-span-6" data-reveal="scale">
            <div className="rounded-3xl border border-white/10 bg-[#0a0a0c]/80 p-8 md:p-10 backdrop-blur-md shadow-2xl flex flex-col gap-8">
              {/* Email */}
              <div className="border-b border-white/[0.08] pb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-mono tracking-widest text-gray-500 uppercase">EMAIL</p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-[11px] font-mono tracking-wider uppercase text-gray-400 hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    {copied ? '✓ COPIED TO CLIPBOARD' : 'COPY'}
                  </button>
                </div>
                <a
                  href={`mailto:${profileData.personal.email}`}
                  className="text-lg md:text-xl font-bold text-white hover:text-[#e8e4dc] transition-colors break-all"
                >
                  {profileData.personal.email}
                </a>
              </div>

              {/* Based In */}
              <div className="border-b border-white/[0.08] pb-6">
                <p className="text-[11px] font-mono tracking-widest text-gray-500 uppercase mb-2">BASED IN</p>
                <p className="text-lg md:text-xl font-bold text-white">
                  {profileData.personal.location}
                </p>
              </div>

              {/* Social Channels */}
              <div>
                <p className="text-[11px] font-mono tracking-widest text-gray-500 uppercase mb-4">ELSEWHERE</p>
                <div className="flex items-center gap-4">
                  {/* LinkedIn */}
                  <a
                    href={profileData.personal.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href={profileData.personal.links.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Profile"
                    className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center hover:bg-white hover:text-black transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="border-t border-white/[0.08] pt-6 mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 {profileData.personal.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#service" className="hover:text-white transition-colors">Services</a>
            <a href="#project" className="hover:text-white transition-colors">Projects</a>
            <span className="text-gray-700">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
