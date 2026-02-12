
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Quiénes somos', href: '#quienes-somos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Game Center', href: '?page=themepark' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('?page=') || href === '/') {
      e.preventDefault();
      const page = href.includes('page=') ? href.split('page=')[1] : 'home';

      if (onNavigate) {
        onNavigate(page);
        window.scrollTo(0, 0);
      } else {
        window.location.href = href;
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md py-5 px-6 md:px-12 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-20 bg-transparent">
        {/* Logo */}
        <a
          href="/"
          className="cursor-pointer select-none relative z-20 flex items-center gap-3 md:gap-4"
          onClick={(e) => handleNavClick(e, '/')}
        >
          <img
            src="/logo-fivecolors.png"
            alt="Five Colors - Espectáculos Infantiles"
            className="h-14 md:h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide">
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
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-gray-700 font-bold hover:text-brand-blue transition-all text-lg px-4 py-2 rounded-full hover:bg-brand-blue/10 ${item.label === 'Game Center' ? 'text-brand-purple bg-brand-purple/10 hover:bg-brand-purple/20' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none relative z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-7 h-7">
            <span className={`absolute inset-0 transform transition-all duration-300 ${isMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
              <Menu size={28} />
            </span>
            <span className={`absolute inset-0 transform transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
              <X size={28} />
            </span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-gray-100 transition-all duration-500 ease-in-out origin-top overflow-hidden ${isMenuOpen
          ? 'opacity-100 translate-y-0 max-h-[600px] visible'
          : 'opacity-0 -translate-y-4 max-h-0 invisible'
          }`}
      >
        <div className={`flex flex-col items-center space-y-4 py-6 transition-all duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-gray-800 font-bold text-lg w-3/4 text-center py-2 rounded-xl hover:bg-gray-100 transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${item.label === 'Game Center' ? 'text-brand-purple bg-brand-purple/10' : ''}`}
              style={{ transitionDelay: `${index * 75}ms` }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
