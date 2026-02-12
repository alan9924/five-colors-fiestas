import React from 'react';
import { BenefitsRulerSection } from '../ui/benefits-ruler-section';

/**
 * Componente que muestra las ofertas corporativas
 * Actualmente solo renderiza la sección de beneficios con el carrusel interactivo
 */
export const CorporateOfferings = () => {
    return (
        <div className="bg-slate-50 font-body text-slate-900 pb-20">
            {/* Benefits - Interactive Ruler Carousel */}
            <BenefitsRulerSection />
        </div>
    );
};
