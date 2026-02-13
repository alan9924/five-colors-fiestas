"use client";

import React, { useMemo } from 'react';

const FeatureSection: React.FC = () => {
  // Generate random confetti pieces
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 3}s`, // Between 3s and 6s
      animationDelay: `${Math.random() * 5}s`,
      // Exclude brand-blue since bg is blue
      bg: ['bg-brand-pink', 'bg-brand-yellow', 'bg-brand-green', 'bg-brand-orange', 'bg-white'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
      size: Math.random() > 0.5 ? 'w-3 h-3' : 'w-2 h-2',
      opacity: Math.random() * 0.5 + 0.5 // Random opacity between 0.5 and 1
    }));
  }, []);

  return (
    <section className="bg-brand-blue min-h-[600px] md:min-h-[700px] relative overflow-hidden flex items-center py-12 md:py-0 font-sans">

      {/* Animated Confetti Background - Limited to left side/background only */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        {confettiPieces.map((piece) => (
          <div
            key={piece.id}
            className={`absolute -top-4 ${piece.bg} ${piece.shape} ${piece.size} animate-confetti`}
            style={{
              left: piece.left,
              animationDuration: piece.animationDuration,
              animationDelay: piece.animationDelay,
              opacity: piece.opacity
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch relative z-20 min-h-[500px] md:min-h-[600px]">

        {/* Column 1: Text Content - Centered Vertically */}
        <div className="flex flex-col justify-center text-center md:text-left z-30 py-8 md:py-0">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            El Show Empieza
          </h2>
          <h2 className="text-7xl md:text-9xl font-black text-brand-yellow uppercase tracking-tighter mb-8 drop-shadow-md">
            AQUÍ
          </h2>

          <div>
            <a
              href="#services"
              className="inline-block bg-brand-cream text-gray-900 text-lg md:text-xl font-bold italic py-4 px-10 rounded-full shadow-[0_4px_0_rgb(0,0,0,0.2)] hover:shadow-[0_2px_0_rgb(0,0,0,0.2)] hover:translate-y-[2px] transition-all uppercase tracking-wide border-2 border-gray-900"
            >
              Explorar Servicios
            </a>
          </div>
        </div>

        {/* Column 2: Video Display Area - MINIMAL & CLEAN */}
        <div className="relative p-10 overflow-hidden w-full h-full flex items-center justify-center">

          {/* THE VIDEO: Strictly contained and centered */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-contain object-center z-0"
          >
            <source src="/mascota-video-2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* NO OVERLAYS, NO GRADIENTS, NO HALOS - Strictly the video */}
        </div>

      </div>
    </section>
  );
};

export default FeatureSection;