"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';


const ScrollyHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smoothing the scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // --- Animation Logic ---
    // Scene 0: Introduction (0% - 20%)
    const opacity0 = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const scale0 = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
    const y0 = useTransform(smoothProgress, [0, 0.2], [0, -50]);

    // Scene 1: "Empieza la diversión" (25% - 45%)
    const opacity1 = useTransform(smoothProgress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
    const x1 = useTransform(smoothProgress, [0.2, 0.25, 0.5], [-50, 0, -50]);

    // Scene 2: "Momentos WOW" (50% - 75%)
    const opacity2 = useTransform(smoothProgress, [0.45, 0.5, 0.75, 0.8], [0, 1, 1, 0]);
    const x2 = useTransform(smoothProgress, [0.45, 0.5, 0.8], [50, 0, 50]);

    // Scene 3: CTA (80% - 100%)
    const opacity3 = useTransform(smoothProgress, [0.75, 0.8, 1], [0, 1, 1]);
    const scale3 = useTransform(smoothProgress, [0.75, 0.8], [0.9, 1]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-brand-blue">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* 1. Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    // Fallback to existing likely video if 'sin marca.mp4' is missing
                    // Assuming user might upload correct one later or renamed.
                    // Using "mascota-video-2.mp4" as found in file list, or keeping the request's name if I assume they'll provide it.
                    // I will use mascota-video-2.mp4 as it exists, but I'll add a comment.
                    src="/mascota-video-2.mp4"
                />

                {/* 2. Overlay */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* 3. Text Layers */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12">

                    {/* SCENE 0: Central Intro */}
                    <motion.div
                        style={{ opacity: opacity0, scale: scale0, y: y0 }}
                        className="absolute flex flex-col items-center text-center max-w-4xl opacity-0"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-lg mb-4">
                            FÁBRICA DE <br />
                            <span className="text-brand-yellow">DIVERSIÓN</span>
                        </h1>
                        <p className="text-xl md:text-3xl font-medium text-white/90 drop-shadow-md">
                            FiveColors presenta magia en cada evento.
                        </p>
                    </motion.div>

                    {/* SCENE 1: Left Card */}
                    <motion.div
                        style={{ opacity: opacity1, x: x1 }}
                        className="absolute left-6 md:left-24 lg:left-32 top-1/3 md:top-1/2 -translate-y-1/2 max-w-md p-8 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl opacity-0"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
                            Empieza la <br />diversión
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                            Shows, personajes y energía que encienden sonrisas.
                        </p>
                    </motion.div>

                    {/* SCENE 2: Right Card */}
                    <motion.div
                        style={{ opacity: opacity2, x: x2 }}
                        className="absolute right-6 md:right-24 lg:right-32 top-1/3 md:top-1/2 -translate-y-1/2 max-w-md p-8 rounded-[32px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl opacity-0 text-right"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
                            Momentos <br /><span className="text-brand-yellow">WOW</span>
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                            Producción completa para niños y familias en Querétaro.
                        </p>
                    </motion.div>

                    {/* SCENE 3: CTA */}
                    <motion.div
                        style={{ opacity: opacity3, scale: scale3 }}
                        className="absolute flex flex-col items-center text-center opacity-0"
                    >
                        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 drop-shadow-xl">
                            Haz tu evento <br />inolvidable
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-brand-yellow text-navy font-black text-lg md:text-xl rounded-full shadow-[0_10px_20px_rgba(255,212,0,0.4)] hover:scale-105 transition-transform active:scale-95 uppercase tracking-wide">
                                Reserva ahora
                            </button>
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/50 font-black text-lg md:text-xl rounded-full hover:bg-white/30 transition-colors uppercase tracking-wide">
                                Ver paquetes
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Wave Separator removed for flat design */}
        </div>
    );
};

export default ScrollyHero;
