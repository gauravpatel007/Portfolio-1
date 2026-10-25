import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar.jsx';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import BreakoutGame from './components/BreakoutGame.jsx';
import Contact from './components/Contact.jsx';
import ComingSoonModal from './components/ComingSoonModal.jsx';
import profileData from './data/profile.json';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  React.useEffect(() => {
    const sections = ['home', 'about', 'service', 'project', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#e8e4dc] selection:text-[#050505] antialiased overflow-x-hidden w-full max-w-full">
      {/* Fixed Navigation Header - fades in cleanly when intro completes */}
      <div
        className={`transition-opacity duration-1000 ${
          isIntroComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Navbar
          brandName={profileData?.personal?.wordmark || profileData?.personal?.name}
          activeSection={activeSection}
          onNavigate={(id) => setActiveSection(id)}
        />
      </div>

      {/* Main Page Layout in Exact Sequential Order */}
      <main>
        {/* 1. Hero Section (#home) */}
        <Hero
          profileData={profileData}
          onPreloadComplete={() => {
            setIsIntroComplete(true);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          }}
        />

        {/* 2. About Me Section (#about) */}
        <About profileData={profileData} />

        {/* 3. Services / Capabilities Section (#service) */}
        <Services />

        {/* 4. Selected Projects Section (#project) */}
        <Projects />

        {/* 5. Experience & Milestones Section (#experience) */}
        <Experience />

        {/* 6. Interactive Breakout Arcade Game (#play) */}
        <BreakoutGame />

        {/* 7. Contact & Footer Section (#contact) */}
        <Contact profileData={profileData} />
      </main>

      {/* Fullscreen Coming Soon Modal Overlay */}
      <ComingSoonModal
        isOpen={comingSoonOpen}
        onBack={() => setComingSoonOpen(false)}
      />
    </div>
  );
}
