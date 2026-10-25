import React, { useEffect } from 'react';

export default function ComingSoonModal({ isOpen, onBack }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onBack]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onBack();
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md text-[#e8e4dc] px-6 animate-fade-in"
    >
      <h2
        id="modal-title"
        className="text-5xl md:text-8xl font-black uppercase tracking-widest mb-8 text-center"
      >
        Coming Soon
      </h2>
      <p className="text-gray-400 text-sm md:text-base max-w-md text-center mb-10 leading-relaxed">
        This catalogue view is currently being packaged for open distribution. Check back shortly or connect directly.
      </p>
      <button
        type="button"
        autoFocus
        onClick={onBack}
        className="px-8 py-3.5 rounded-full border border-[#e8e4dc] text-black bg-[#e8e4dc] font-bold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
      >
        Back to Portfolio
      </button>
    </div>
  );
}
