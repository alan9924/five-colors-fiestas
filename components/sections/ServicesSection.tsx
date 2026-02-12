import React, { useEffect, useRef, useState } from 'react';
import { Heart, ArrowRight, Smile, MapPin, Gamepad2 } from 'lucide-react';
import SectionWrapper from '../SectionWrapper';

interface ServicesSectionProps {
  onNavigate?: (page: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the component is visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset trigger
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = `?page=${page}`;
    }
  };

  // Helper class for animation
  const animClass = isVisible ? 'animate-slide-up-fade' : 'opacity-0';

  return (
    <SectionWrapper
      id="servicios"
      bgColor="bg-[#EEF6FF]"
      pillText="SERVICIOS"
      pillColor="bg-brand-blue"
      className="animate-corkboard" // keeping animation class if generic, but removing bg styles
    >
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4 md:px-8">
        <div className={`text-center mb-10 text-gray-900 ${animClass}`}>
          <h2 className="text-5xl font-black drop-shadow-sm">Nuestros Servicios</h2>
          <p className="text-xl font-bold text-gray-600">Todo para tu fiesta en un solo lugar</p>
        </div>

        {/* Notebook Container */}
        <div className={`bg-white rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 border-4 border-gray-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

          {/* Notebook Holes (Top Decoration) */}
          <div className="flex justify-between px-4 mb-6 md:mb-8 border-b-2 border-gray-100 pb-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-gray-800 shadow-inner"></div>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">

            {/* 1. Shows Infantiles (Pink) - Character: Bear (Custom SVG) */}
            <a
              href="?page=shows"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-brand-pink p-5 md:p-6 rounded-2xl border-2 border-gray-900 flex flex-col justify-between h-56 md:h-64 transform hover:-translate-y-1 active:scale-98 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden relative block ${animClass}`}
              style={{ animationDelay: '100ms' }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white leading-tight mb-2">Shows Infantiles</h3>
                <p className="text-white font-bold text-sm opacity-90">Magia, títeres y diversión garantizada.</p>
              </div>
              {/* Custom Bear Character SVG */}
              <svg
                viewBox="0 0 200 200"
                className="absolute -bottom-6 -right-6 w-36 h-36 md:w-44 md:h-44 object-contain transform rotate-[-10deg]"
              >
                {/* Ears */}
                <circle cx="50" cy="70" r="22" fill="#F59E0B" stroke="#111827" strokeWidth="8" />
                <circle cx="150" cy="70" r="22" fill="#F59E0B" stroke="#111827" strokeWidth="8" />

                {/* Head */}
                <rect x="35" y="60" width="130" height="120" rx="45" fill="#F59E0B" stroke="#111827" strokeWidth="8" />

                {/* Hat */}
                <path d="M75 60 L 100 20 L 125 60" fill="#4ECDC4" stroke="#111827" strokeWidth="8" strokeLinejoin="round" />
                <circle cx="100" cy="20" r="8" fill="#FFC65C" stroke="#111827" strokeWidth="6" />

                {/* Snout */}
                <ellipse cx="100" cy="135" rx="35" ry="25" fill="#FDE68A" stroke="#111827" strokeWidth="8" />
                <ellipse cx="100" cy="125" rx="12" ry="8" fill="#111827" />

                {/* Eyes */}
                <circle cx="70" cy="100" r="10" fill="#111827" />
                <circle cx="74" cy="96" r="3" fill="white" />
                <circle cx="130" cy="100" r="10" fill="#111827" />
                <circle cx="134" cy="96" r="3" fill="white" />

                {/* Smile */}
                <path d="M88 150 Q 100 158 112 150" fill="none" stroke="#111827" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </a>

            {/* 2. Tienda en Línea (White) - Sticker Style */}
            <a
              href="https://fivecolorshop.org"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-white rounded-[2rem] border-4 border-gray-900 flex flex-col h-64 md:h-72 transform hover:-translate-y-2 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative block ${animClass}`}
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative z-10 px-6 pt-6">
                <h3 className="text-3xl font-black text-gray-900 leading-none mb-1 tracking-tight">Tienda en Línea</h3>
                <p className="text-gray-600 font-bold text-sm tracking-wide">Disfraces y decoración a un clic.</p>
              </div>

              <div className="relative w-full flex-grow flex items-end justify-center pointer-events-none pb-2">
                <img
                  src="/online_store_bag.png"
                  alt="Online Store Bag"
                  className="h-[110%] w-auto object-contain transform translate-y-4 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </a>

            {/* 3. Diseño de Botargas (Yellow) - Link to Detail View */}
            <a
              href="?page=mascots"
              onClick={(e) => handleNavClick(e, 'mascots')}
              className={`bg-brand-yellow p-5 md:p-6 rounded-2xl border-2 border-gray-900 flex flex-col justify-between h-56 md:h-64 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative cursor-pointer block group ${animClass}`}
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">Diseño de Botargas</h3>
                  <div className="bg-white/30 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-800 font-bold text-sm">Personajes únicos. <span className="underline decoration-2 underline-offset-2">Ver detalles</span></p>
              </div>
              <img
                src="https://api.dicebear.com/9.x/big-smile/svg?seed=Mascot&backgroundColor=transparent&skinColor=8e44ad&hair=mohawk"
                alt="Mascot Character"
                className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 object-contain transform rotate-[-5deg] group-hover:scale-110 transition-transform duration-300"
              />
            </a>

            {/* 4. Eventos Corporativos (White) - Character: Corporate/Cool */}
            <a
              href="?page=corporate"
              onClick={(e) => handleNavClick(e, 'corporate')}
              className={`bg-white p-5 md:p-6 rounded-2xl border-2 border-gray-900 flex flex-col justify-between h-56 md:h-64 transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative cursor-pointer group ${animClass}`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">Eventos Corporativos</h3>
                  <div className="bg-brand-yellow rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-gray-900" />
                  </div>
                </div>
                <p className="text-gray-600 font-bold text-sm">Activaciones y diversión empresarial.</p>
              </div>
              <img
                src="https://api.dicebear.com/9.x/big-smile/svg?seed=Cool&backgroundColor=transparent&accessories=sunglasses&skinColor=fcd53f"
                alt="Corporate Character"
                className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 object-contain transform rotate-[10deg] group-hover:scale-110 transition-transform"
              />
            </a>

            {/* ROW 2 */}

            {/* 5. Extra Info (Cream/Map) - "Cobertura Querétaro" */}
            {/* Expanded to 2 columns to fill the row after removing "Atención Constante" */}
            <div
              className={`col-span-1 md:col-span-2 bg-brand-cream p-5 md:p-6 rounded-2xl border-2 border-gray-900 flex flex-col justify-between min-h-[180px] transform hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden ${animClass}`}
              style={{ animationDelay: '500ms' }}
            >
              <div className="relative z-10 pointer-events-none">
                <h3 className="text-xl font-black text-gray-900 leading-tight mb-1">Cobertura</h3>
                <p className="text-gray-600 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={12} /> Querétaro
                </p>
              </div>
              <img
                src="/mapa_cobertura.png"
                alt="Mapa Cobertura Querétaro"
                className="absolute right-[18px] bottom-[12px] max-w-[32%] max-h-[80%] object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* 6. Game Center (Purple) - Spans 2 cols - Links to Llama Run Game */}
            <a
              id="game-center"
              href="?page=themepark"
              onClick={(e) => handleNavClick(e, 'themepark')}
              className={`col-span-1 md:col-span-2 bg-brand-purple p-6 rounded-2xl border-2 border-gray-900 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[180px] hover:scale-[1.02] transition-transform ${animClass}`}
              style={{ animationDelay: '600ms' }}
            >
              <div className="z-10 text-center md:text-left mb-4 md:mb-0 max-w-sm">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none">
                  Game Center
                </h3>
                <p className="text-white font-bold mb-4 text-sm opacity-90 leading-tight">
                  🎡 Parque temático 3D interactivo! Explora atracciones, juega y conoce otros usuarios.
                </p>
                <div className="bg-brand-yellow text-gray-900 font-black px-6 py-2 rounded-full border-2 border-gray-900 group-hover:bg-white transition-colors flex items-center gap-2 mx-auto md:mx-0 shadow-sm text-sm w-fit">
                  Explorar Parque <Gamepad2 size={16} />
                </div>
              </div>

              {/* Decorative Sticker */}
              <div className="absolute -right-8 -bottom-10 w-32 h-32 md:w-40 md:h-40 bg-brand-green rounded-full border-2 border-gray-900 flex items-center justify-center transform rotate-12 group-hover:rotate-[20deg] transition-transform">
                <div className="text-center -mt-4 -ml-4 transform -rotate-12">
                  <span className="block text-white font-black text-xs">NUEVO</span>
                  <span className="block text-white font-black text-2xl leading-none">GAME</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;
