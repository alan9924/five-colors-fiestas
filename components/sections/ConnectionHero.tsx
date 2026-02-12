"use client"
import React from 'react';
import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";

import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConnectionHero = () => {
    // Items for the circular ring
    const items = [
        {
            text: "MEDITACIÓN",
            image: "/corporate/meditacion.png"
        },
        {
            text: "EMOCIONES",
            image: "/corporate/emociones.png"
        },
        {
            text: "BIENESTAR",
            image: "/corporate/bienestar.png"
        },
        {
            text: "FAMILIA",
            image: "/corporate/familia.png"
        }
    ];

    return (
        <section className="relative w-full min-h-[600px] lg:min-h-[700px] bg-white text-slate-900 overflow-hidden pt-20 pb-16 lg:pt-0 lg:pb-0 flex items-center">
            {/* Background Element - Soft Gradient Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3 opacity-70"></div>

            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col items-center text-center">

                    {/* Left Column: Text & Content */}
                    <div className="flex flex-col gap-8 text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
                                Descubre un nuevo nivel de <span className="text-blue-600">conexión.</span>
                            </h1>

                            <p className="text-lg sm:text-xl lg:text-2xl text-slate-500 font-medium mb-2">
                                Fortalecemos el corazón de tu empresa.
                            </p>

                            <p className="text-sm uppercase tracking-widest text-slate-400 font-semibold">
                                Meditación • Inteligencia emocional • Integración familiar
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            <button
                                onClick={() => window.open('https://api.whatsapp.com/send?phone=5215545117478&text=Hola%20FiveColors%20me%20interesa%20agendar%20una%20llamada', '_blank')}
                                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Agendar una llamada
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => document.getElementById('corporate-offerings')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                            >
                                Ver experiencias
                                <PlayCircle className="w-5 h-5 opacity-50" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Column: Removed as requested to move below hero */}
                    {/* <div className="flex justify-center items-center order-1 lg:order-2 h-[400px] lg:h-[600px] relative">
                         ... Content moved to SpecialExperiencesCircular ...
                    </div> */}
                </div>
            </div>
        </section>
    );
};

// Helper for the center text content
const CenterBrand = ({ compact = false, small = false }: { compact?: boolean, small?: boolean }) => (
    <div className={`flex flex-col items-center justify-center text-center ${small ? 'gap-1' : 'gap-2'}`}>
        <div className={`font-black tracking-tighter text-slate-900 ${small ? 'text-lg' : compact ? 'text-xl' : 'text-2xl'}`}>
            FIVECOLORS
        </div>
        <div className={`font-bold tracking-widest text-[#536b78] uppercase ${small ? 'text-[8px]' : 'text-[10px]'}`}>
            EXPERIENCE
        </div>
    </div>
);
