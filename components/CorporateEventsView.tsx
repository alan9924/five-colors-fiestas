import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CorporateOfferings } from './sections/CorporateOfferings';
import { CorporateHero } from './CorporateHero';
import { SpecialExperiencesCircular } from './sections/SpecialExperiencesCircular';
import { CorporateIntro } from './sections/CorporateIntro';
import { CorporateImageGallery } from './sections/CorporateImageGallery';
import EventosCorporativosStack from './sections/EventosCorporativosStack';
import { CorporateRallyGallery } from './sections/CorporateRallyGallery';
import { CorporateContactForm } from './sections/CorporateContactForm';
import { CorporateFooter } from './sections/CorporateFooter';
import { getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';
import { CorporateMenu } from './CorporateMenu';

interface CorporateEventsViewProps {
    onBack?: () => void;
}

const CorporateEventsView: React.FC<CorporateEventsViewProps> = ({ onBack }) => {
    React.useEffect(() => {
        // Force scroll to top immediately
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

        // Double check after a small delay to handle any layout shifts or browser restoration
        const timer = setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white font-body relative">
            {/* Navigation Menu - Discreet */}
            <CorporateMenu />

            {/* Navigation Bar - Simplified */}
            <div className="fixed top-0 left-0 w-full z-40 px-6 py-4 pointer-events-none">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors group pointer-events-auto"
                    >
                        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full border border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors shadow-sm">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="hidden md:inline bg-white/50 backdrop-blur-md px-2 py-1 rounded-lg">Volver a Inicio</span>
                    </button>
                </div>
            </div>

            {/* Hero Section - Gravity Physics */}
            <CorporateHero />

            {/* Intro Section - Servicios */}
            <div id="servicios">
                <CorporateIntro />
            </div>

            {/* Eventos Corporativos Stack */}
            <EventosCorporativosStack />

            {/* Corporate Image Gallery - Objetivos */}
            <div id="objetivos">
                <CorporateImageGallery />
            </div>

            {/* Special Experiences Section - Experiencias */}
            <div id="experiencias">
                <SpecialExperiencesCircular />
            </div>

            {/* Main Corporate Offerings - Beneficios */}
            <div id="beneficios">
                <CorporateOfferings />
            </div>

            {/* Rally Gallery Section - Galeria */}
            <div id="galeria">
                <CorporateRallyGallery />
            </div>

            {/* Contact Form Section - Contactanos */}
            <div id="contactanos">
                <CorporateContactForm />
            </div>

            {/* Footer Section */}
            <CorporateFooter />

            {/* Floating WhatsApp Button */}
            <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.CORPORATE)}
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

export default CorporateEventsView;

