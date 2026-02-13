import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ScrollyHero from './components/sections/ScrollyHero';
import AboutSection from './components/sections/AboutSection';
// import PixelHero from './components/PixelHero';
import CharactersSection from './components/sections/CharactersSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/MagicPlanner';
import TestimonialsSection from './components/sections/TestimonialsSection';
import MascotDesignView from './components/MascotDesignView';
import KbooProfileView from './components/KbooProfileView';
import FlappyLlamaGame from './components/FlappyLlamaGame';
import LlamaRunGame from './components/LlamaRunGame';
import StweeChat from './components/StweeChat';
import CorporateEventsView from './components/CorporateEventsView';
import KeycapStack from './components/KeycapStack';
import GameCenterMenu from './components/GameCenterMenu';

import ShowsInfantilesSection from './components/sections/ShowsInfantilesSection';
import CharacterSkyGrid from './components/CharacterSkyGrid';
import { useActiveSection } from './hooks/useActiveSection';

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 md:py-16 border-t-4 border-brand-yellow pb-24 md:pb-16">
    <div className="max-w-7xl mx-auto px-6">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        {/* Logo */}
        <div className="text-3xl font-black tracking-wide cursor-default">
          <span className="text-brand-pink">F</span>
          <span className="text-brand-orange">i</span>
          <span className="text-brand-yellow">v</span>
          <span className="text-brand-green">e</span>
          <span className="text-brand-blue">c</span>
          <span className="text-brand-pink">o</span>
          <span className="text-brand-orange">l</span>
          <span className="text-brand-yellow">o</span>
          <span className="text-brand-green">r</span>
          <span className="text-brand-blue">s</span>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-bold text-brand-yellow">¡Síguenos en Redes Sociales!</h3>
          <div className="flex gap-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/fivecolors_shows?igsh=ajdiNjhncHN1NzJn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group relative w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-pink-500/50 border-2 border-white/20"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/17nKUTpnCF/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group relative w-14 h-14 bg-[#1877F2] rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 border-2 border-white/20"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@fivecolors_?_r=1&_t=ZS-93eDtTuT1ea"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="group relative w-14 h-14 bg-black rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 border-2 border-white/20"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#00F2EA" />
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FF004F" opacity="0.5" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/524421434797"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="group relative w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg hover:shadow-green-500/50 border-2 border-white/20"
            >
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 border-t border-gray-700">
        <p className="text-gray-400 font-semibold">© 2024 Five Colors - Diversión y Magia. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
)

const App: React.FC = () => {
  // Initialize with the correct page from URL to prevent flash
  const getInitialPage = () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    return page || 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigate = (page: string) => {
    if (page === 'stwee-chat') {
      setIsChatOpen(true);
      return;
    }
    setCurrentPage(page);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      window.history.pushState({}, '', url);
    } catch (e) {
      console.warn('Navigation history update failed (likely sandbox restriction):', e);
    }
  };

  // Section IDs to observe for active state updates in URL
  const sectionIds = ['inicio', 'quienes-somos', 'personajes', 'servicios', 'testimonios', 'contacto'];
  useActiveSection(currentPage === 'home' ? sectionIds : []);

  if (currentPage === 'mascots') {
    return <MascotDesignView onNavigate={handleNavigate} />;
  }
  if (currentPage === 'corporate') {
    return <CorporateEventsView onBack={() => handleNavigate('home')} />;
  }
  if (currentPage === 'kboo') {
    return <KbooProfileView onBack={() => handleNavigate('mascots')} />;
  }
  if (currentPage === 'game') {
    return <FlappyLlamaGame />;
  }
  if (currentPage === 'llamarun') {
    return <LlamaRunGame onClose={() => handleNavigate('home')} />;
  }
  if (currentPage === 'shows') {
    return <ShowsInfantilesSection />;
  }
  if (currentPage === 'favorites') {
    return <CharacterSkyGrid />;
  }
  if (currentPage === 'keycaps') {
    return <KeycapStack />;
  }
  // Game Center
  if (currentPage === 'themepark') {
    return <GameCenterMenu onClose={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#FFD400] font-body relative">
      <Header onNavigate={handleNavigate} />
      <main>
        {/* NEW SCROLLYTELLING HERO SECTION */}
        <ScrollyHero />

        <AboutSection />


        <CharactersSection />
        <ServicesSection onNavigate={handleNavigate} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />

      {isChatOpen && <StweeChat onClose={() => setIsChatOpen(false)} />}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/524421434797"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[90] bg-[#25D366] border-4 border-gray-900 p-3 md:p-4 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:translate-y-1 transition-all animate-bounce group cursor-pointer flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-10 h-10 md:w-12 md:h-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118 1.571-.036 1.758-1.729 2.006-2.429 2.006-.297-.691-.297-1.287-.544-1.439z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.55 4.125 1.5 5.85L.5 23.5l5.8-1c1.65.9 3.55 1.425 5.7 1.425 6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.625-.5-5.15-1.375L6.5 20.5l-3.2.55.55-3.15-.125-.225C2.825 16.125 2.25 14.15 2.25 12c0-5.375 4.375-9.75 9.75-9.75S21.75 6.625 21.75 12 17.375 22 12 22z" />
        </svg>
      </a>
    </div>
  );
};

export default App;
