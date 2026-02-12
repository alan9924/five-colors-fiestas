
import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import SectionWrapper from '../SectionWrapper';

const testimonials = [
  {
    id: 1,
    name: "Laura Martínez",
    role: "Mamá de Camila",
    rating: 5,
    text: "¡El show de Frozen fue mágico! Elsa y Anna cantaron hermoso y mi hija no podía creer que estuvieran en su fiesta. ¡Gracias Fivecolors!"
  },
  {
    id: 2,
    name: "Roberto Gómez",
    role: "Papá de Santiago",
    rating: 5,
    text: "Contratamos a Paw Patrol para los 3 años de Santi. Chase y Marshall fueron súper atentos con los niños. ¡La patrulla canina salvó el día!"
  },
  {
    id: 3,
    name: "Carolina Herrera",
    role: "Tía de Mateo",
    rating: 5,
    text: "Spiderman sorprendió a todos con sus acrobacias. Mateo es su fan número uno y no paraba de sonreír. Excelente servicio y muy puntuales."
  },
  {
    id: 4,
    name: "Elena Vega",
    role: "Abuela de Sofi",
    rating: 5,
    text: "Mickey y Minnie son clásicos que nunca fallan. Bailaron con todos los nietos y las fotos quedaron preciosas. Muy recomendados."
  },
  {
    id: 5,
    name: "Diego Fernández",
    role: "Papá de Iker",
    rating: 5,
    text: "La Granja de Zenón puso a bailar a toda la familia. La Vaca Lola fue la sensación. ¡Definitivamente los volveremos a llamar para el próximo año!"
  }
];

const TestimonialsSection: React.FC = () => {
  // Create a duplicated list for seamless looping
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <SectionWrapper
      id="testimonios"
      bgColor="bg-white"
      pillText="LO QUE DICEN DE NOSOTROS"
      pillColor="bg-brand-orange"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-10">
        <div className="text-center">
          {/* Internal pill removed */}
          <h2 className="text-5xl md:text-6xl font-black text-gray-800 font-display drop-shadow-sm">
            Testimonios
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full py-8">

        {/* Track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {allTestimonials.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[85vw] md:w-[500px] flex-shrink-0 px-4 transition-transform hover:scale-[1.02] duration-300"
            >
              <div className="bg-brand-yellow rounded-3xl p-6 md:p-10 border-2 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col justify-between">

                <div className="mb-6 border-b-2 border-gray-900/10 pb-4">
                  {/* Header Info */}
                  <div className="text-left">
                    <h3 className="font-black text-gray-900 text-xl font-display">{item.name}</h3>
                    <p className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">{item.role}</p>
                    <div className="flex justify-start gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={18} className="fill-white stroke-gray-900 stroke-[1.5]" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-black opacity-5 font-black font-serif leading-none">“</span>
                  <p className="text-gray-900 font-bold leading-relaxed text-lg relative z-10">
                    {item.text}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fades for Smooth Edges - White BG */}
        <div className="absolute top-0 left-0 h-full w-8 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-8 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      </div>

      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-brand-blue opacity-20 transform -rotate-12 -z-10">
        <Star size={120} fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 text-brand-orange opacity-20 transform rotate-45 -z-10">
        <Star size={80} fill="currentColor" />
      </div>

    </SectionWrapper>
  );
};

export default TestimonialsSection;
