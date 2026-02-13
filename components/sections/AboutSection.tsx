"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../SectionWrapper';

const AboutSection: React.FC = () => {
    return (
        <SectionWrapper
            id="quienes-somos"
            bgColor="bg-white"
            pillText="¿QUIÉNES SOMOS?"
            pillColor="bg-brand-pink"
        >
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Internal pill removed, used wrapper pill instead */}

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-10 leading-tight">
                        Creamos momentos que <br className="hidden md:block" />
                        <span className="text-brand-blue relative inline-block">
                            unen personas
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-yellow z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h2>

                    <div className="prose prose-lg md:prose-2xl mx-auto text-gray-700 font-medium leading-relaxed space-y-8">
                        <p>
                            <strong className="text-brand-purple font-black">FiveColors</strong> es una marca creativa que crea experiencias para conectar, emocionar y dejar recuerdos. Nacimos con la idea de hacer cada evento diferente, cuidando cada detalle y poniendo siempre la emoción al centro.
                        </p>
                        <p>
                            Diseñamos personajes, shows y dinámicas que van más allá de entretener: buscamos que las personas participen, se rían y se sientan parte del momento, ya sea en <span className="font-bold text-brand-orange">eventos infantiles</span>, <span className="font-bold text-brand-green">activaciones de marca</span> o <span className="font-bold text-brand-blue">experiencias corporativas</span>.
                        </p>
                        <p className="text-xl md:text-3xl font-bold text-gray-900 mt-8 font-display">
                            "Creemos que cuando una experiencia se siente, se recuerda."
                        </p>
                        <p className="border-t-4 border-gray-900 pt-8 mt-8 inline-block transform -rotate-1">
                            Por eso en FiveColors no solo hacemos eventos: <span className="font-black bg-brand-yellow px-2">creamos momentos que unen personas.</span>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Sol sonriente animado - elemento principal decorativo */}
            <motion.div
                className="absolute top-8 right-4 md:top-12 md:right-12 lg:right-20 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 z-0"
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: 0.3,
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                <img
                    src="/sol-feliz.png"
                    alt="Sol sonriente Five Colors"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </motion.div>

            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-12 h-12 border-4 border-brand-green rounded-full opacity-20 animate-bounce delay-700 -z-10"></div>
            <div className="absolute bottom-20 right-10 w-8 h-8 bg-brand-orange rounded-full opacity-20 animate-pulse -z-10"></div>
            <div className="absolute top-1/2 left-4 w-4 h-4 bg-brand-purple rounded-full opacity-20 -z-10"></div>
        </SectionWrapper>
    );
};

export default AboutSection;
