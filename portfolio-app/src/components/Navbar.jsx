import React, { useState, useEffect } from 'react';

export default function Navbar({ brandName = 'GAURAV B PATEL', activeSection = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICE', href: '#service', id: 'service' },
    { label: 'PROJECT', href: '#project', id: 'project' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (id) => {
    if (onNavigate) onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          <a
            href="#home"
            onClick={() => handleLinkClick('home')}
            className="text-white font-bold tracking-wider text-base md:text-lg uppercase hover:opacity-80 transition-opacity"
          >
            {brandName}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-xs tracking-[0.2em] font-medium uppercase transition-colors py-1 ${
                    isActive
                      ? 'text-white border-b-2 border-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block h-0.5 bg-white transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-opacity duration-200 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center gap-8 md:hidden px-6 animate-fade-in">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl p-2 hover:opacity-75 transition-opacity"
          >
            ✕
          </button>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleLinkClick(item.id)}
              className={`text-3xl font-black tracking-widest uppercase transition-colors ${
                activeSection === item.id ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
