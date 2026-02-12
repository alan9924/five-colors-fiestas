import React from 'react';
import { Component } from '../ui/morphing-card-stack';
import { Cake, Baby, GraduationCap, School } from 'lucide-react';

const cardData = [
    {
        id: "cumpleanos",
        title: "Cumpleaños",
        description: "Celebra el día especial de tu pequeño con un show inolvidable lleno de magia, música y diversión.",
        image: "/images/shows/birthday_minimal.png",
        icon: <Cake className="h-5 w-5 text-pink-500" />,
        color: "#ffffff"
    },
    {
        id: "bautizos",
        title: "Bautizos",
        description: "Convierte este día sagrado en una celebración llena de alegría. Entretenimiento apropiado y memorable para todas las edades.",
        image: "/images/shows/baptism_minimal.png",
        icon: <Baby className="h-5 w-5 text-blue-500" />,
        color: "#ffffff"
    },
    {
        id: "graduaciones",
        title: "Graduaciones",
        description: "Celebra este importante logro con un espectáculo que los pequeños nunca olvidarán. Perfecto para graduaciones de kínder y preescolar.",
        image: "/images/shows/graduation_minimal.png",
        icon: <GraduationCap className="h-5 w-5 text-orange-500" />,
        color: "#ffffff"
    },
    {
        id: "eventos-escolares",
        title: "Eventos Escolares",
        description: "Shows educativos y divertidos para festivales escolares, día del niño, posadas y cualquier celebración en tu escuela.",
        image: "/images/shows/school_event_minimal.png",
        icon: <School className="h-5 w-5 text-green-500" />,
        color: "#ffffff"
    }
];

const PerfectoParaSection: React.FC = () => {
    return (
        <section id="servicios" className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32 border-t-4 border-gray-900 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 bg-brand-pink rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-blue rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-yellow rounded-full blur-3xl"></div>
            </div>

            <div className="py-16 px-4 max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-2 text-gray-900">
                    Nuestros shows se adaptan a<br />
                    <span className="text-brand-blue">cualquier celebración especial</span>
                </h2>
                <p className="text-center text-gray-600 font-bold mb-6 text-lg">
                    Hacemos que cada evento sea único y memorable con entretenimiento de calidad
                </p>
                <Component cards={cardData} defaultLayout="stack" />
            </div>
        </section>
    );
};

export default PerfectoParaSection;
