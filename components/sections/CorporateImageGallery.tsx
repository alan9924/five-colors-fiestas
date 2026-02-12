import React from 'react';
import { motion } from 'framer-motion';

interface ImageCard {
    src: string;
    title: string;
    description: string;
}

const images: ImageCard[] = [
    {
        src: '/corporate/team_collaboration_nobg.png',
        title: 'Team Building',
        description: 'Fomentamos la seguridad psicológica y la cohesión grupal. A través de dinámicas lúdicas, desactivamos barreras jerárquicas y construimos redes de confianza genuina, esenciales para un alto rendimiento y resolución de conflictos.'
    },
    {
        src: '/corporate/coffee_break_nobg.png',
        title: 'Networking',
        description: 'Creamos entornos propicios para el "networking" humano. Facilitamos interacciones que van más allá de lo transaccional, estimulando la empatía y la inteligencia social para tejer alianzas estratégicas basadas en valores compartidos.'
    },
    {
        src: '/corporate/work_juggling_nobg.png',
        title: 'Balance Laboral',
        description: 'Promovemos la higiene mental y la prevención del burnout. Nuestros eventos actúan como catalizadores de recuperación cognitiva, reduciendo niveles de cortisol y reavivando la motivación intrínseca por el trabajo bien hecho.'
    },
    {
        src: '/corporate/busy_office_nobg.png',
        title: 'Ambiente Dinámico',
        description: 'Estimulamos la plasticidad cerebral rompiendo la monotonía. Un ambiente lúdico y sorprendente despierta la creatividad latente, facilita estados de "flow" y renueva la perspectiva ante desafíos complejos.'
    }
];

export const CorporateImageGallery: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Transformamos el Ambiente Corporativo
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        De la rutina diaria a experiencias extraordinarias que energizan a tu equipo
                    </p>
                </motion.div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.25, 0.1, 0.25, 1]
                            }}
                            className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${index === 0 || index === 3 ? 'md:translate-y-8' : 'md:-translate-y-8'
                                }`}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                <img
                                    src={image.src}
                                    alt={image.title}
                                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Text Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <h3 className="text-2xl font-black text-white mb-2">
                                    {image.title}
                                </h3>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    {image.description}
                                </p>
                            </div>

                            {/* Decorative Border */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500/50 rounded-3xl transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <p className="text-lg text-gray-700 mb-6 font-medium">
                        ¿Listo para dar el siguiente paso en cultura empresarial?
                    </p>
                    <button
                        onClick={() => document.getElementById('corporate-contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Conversemos sobre tu evento
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
