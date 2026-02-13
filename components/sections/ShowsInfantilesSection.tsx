"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import SphereImageGrid from '../ui/img-sphere';
import LogoToCarouselSection from './LogoToCarouselSection';
import MagicPlanner from '../MagicPlanner';
import PerfectoParaSection from './PerfectoParaSection';
import Footer from '../Footer';
import { ShowMenu } from '../ShowMenu';

const ShowsInfantilesSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const handleBack = () => {
        // Set page to home to go back to main menu
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'home');
        window.location.href = url.toString();
    };


    // Screen 1: Intro (0 - 15%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

    // Screen 2: 20+ Personajes (NEW) (15% - 35%)
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.55], [50, -50]);

    // Screen 3: Experience (Old 2) (35% - 55%)
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.4, 0.8], [50, -50]);

    // Screen 4: Production (Old 3) (55% - 75%)
    const opacity4 = useTransform(scrollYProgress, [0.65, 0.85, 0.95], [0, 1, 0]);
    const y4 = useTransform(scrollYProgress, [0.65, 0.95], [50, -50]);

    // Screen 5: CTA (Old 4) (75% - 100%)
    const opacity5 = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);
    const y5 = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

    // Simulated Sticky: Moves down as we scroll. 
    // For 250vh height, we need to travel ~150vh. 
    // For 400vh height, we need to travel ~300vh.
    // Using 150vh (approx 1000-1200px) as safe baseline for mobile to avoid void.
    // Desktop will feel slightly 'loose' but functional.
    const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);

    const shows = [
        { name: "PJ Masks", color: "bg-blue-500" },
        { name: "Ladybug", color: "bg-red-500" },
        { name: "Gallinita Pintadita", color: "bg-blue-400" },
        { name: "Plim Plim", color: "bg-red-400" },
        { name: "Iron Man", color: "bg-yellow-500" },
        { name: "Batman", color: "bg-gray-800" },
        { name: "Santa Claus", color: "bg-red-600" },
        { name: "Reyes Magos", color: "bg-yellow-600" },
    ];

    const infiniteShows = [...shows, ...shows, ...shows];

    const [sphereConfig, setSphereConfig] = React.useState({ size: 800, radius: 300 });

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSphereConfig({ size: 360, radius: 160 });
            } else {
                setSphereConfig({ size: 800, radius: 300 });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <section id="shows-infantiles" className="relative bg-black">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="fixed top-6 left-6 z-50 bg-white text-gray-900 p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 hover:scale-110 active:scale-95 transition-all"
                aria-label="Volver al menú"
            >
                <ArrowLeft size={32} strokeWidth={2.5} />
            </button>
            <ShowMenu />

            <main className="w-full overflow-x-hidden">
                {/* Height adjusted for mobile and desktop screens, using safe viewport units */}
                <div ref={containerRef} className="h-[250vh] md:h-[400vh] relative w-full">
                    <motion.div
                        style={{ y: yMain }}
                        className="absolute top-0 h-[100dvh] w-full overflow-hidden bg-black"
                    >
                        {/* Video Layer - Optimized for performance */}
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
                            style={{ willChange: 'auto' }}
                        >
                            <source src="/sin_marca.mp4" type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                        {/* Content Layer - Full width/height, centralized */}
                        <div className="absolute inset-0 flex items-center justify-center w-full h-full z-10 p-4">

                            {/* Screen 1 */}
                            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-4 text-center transform-gpu">
                                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] leading-tight text-white max-w-5xl mx-auto">
                                    Shows Infantiles
                                </h2>
                                <p className="text-lg sm:text-2xl md:text-4xl font-bold text-brand-yellow drop-shadow-md max-w-3xl mx-auto">
                                    El show empieza aquí.
                                </p>
                            </motion.div>

                            {/* Screen 2: NEW - 20+ Personajes */}
                            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-none transform-gpu">
                                <h3 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 text-brand-orange leading-tight drop-shadow-lg max-w-4xl mx-auto">
                                    +20 Personajes
                                </h3>
                                <p className="text-white text-base sm:text-xl md:text-3xl font-bold leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                                    Desde clásicos hasta los más nuevos. ¡Tenemos a tu favorito listo para la fiesta!
                                </p>
                            </motion.div>

                            {/* Screen 3: Experience */}
                            <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-none transform-gpu">
                                <h3 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 text-brand-pink leading-tight drop-shadow-lg max-w-4xl mx-auto">
                                    +10 años de experiencia
                                </h3>
                                <p className="text-white text-base sm:text-xl md:text-3xl font-bold leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                                    Creamos experiencias que encienden sonrisas con personajes, dinámicas y momentos WOW.
                                </p>
                            </motion.div>

                            {/* Screen 4: Production */}
                            <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-4 text-center pointer-events-none transform-gpu">
                                <h3 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 text-brand-blue leading-tight drop-shadow-lg max-w-4xl mx-auto">
                                    Producción completa
                                </h3>
                                <p className="text-white text-base sm:text-xl md:text-3xl font-bold leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                                    Nos encargamos de todo: ritmo, interacción, energía, música y recuerdos inolvidables.
                                </p>
                            </motion.div>

                            {/* Screen 5: CTA */}
                            <motion.div style={{ opacity: opacity5, y: y5 }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full px-4 text-center transform-gpu">
                                <h3 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-8 leading-tight drop-shadow-lg max-w-5xl mx-auto">
                                    Convierte tu evento en un<br />recuerdo inolvidable
                                </h3>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-center pointer-events-auto">
                                    <button
                                        onClick={() => window.open('https://wa.me/524421434797', '_blank')}
                                        className="bg-brand-green text-white text-base md:text-xl font-black px-8 py-3 md:px-10 md:py-5 rounded-full border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 w-full md:w-auto transform-gpu"
                                    >
                                        Cotizar ahora <ArrowRight size={24} />
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Scroll Indicator */}
                        <motion.div
                            style={{ opacity: opacity1 }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 animate-bounce pointer-events-none z-20"
                        >
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest drop-shadow-md">Desliza</span>
                            <div className="w-1 h-12 bg-white/50 rounded-full relative overflow-hidden backdrop-blur-sm">
                                <div className="absolute top-0 w-full h-1/2 bg-white animate-slide-down"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>

            {/* COMBINED LOGO TO CAROUSEL SECTION */}
            <div id="personajes">
                <LogoToCarouselSection
                    characters={[
                        { id: 1, name: "Personaje 1", category: "Show Infantil", image: "/personajes/IMG_6326.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 2, name: "Personaje 2", category: "Show Infantil", image: "/personajes/IMG_6328.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 3, name: "Personaje 3", category: "Show Infantil", image: "/personajes/IMG_6329.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 4, name: "Personaje 4", category: "Show Infantil", image: "/personajes/IMG_6330.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 5, name: "Personaje 5", category: "Show Infantil", image: "/personajes/IMG_6337.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 6, name: "Personaje 6", category: "Show Infantil", image: "/personajes/IMG_6340.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 7, name: "Personaje 7", category: "Show Infantil", image: "/personajes/IMG_6363.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 8, name: "Personaje 8", category: "Show Infantil", image: "/personajes/IMG_6367.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 9, name: "Personaje 9", category: "Show Infantil", image: "/personajes/IMG_6369.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 10, name: "Personaje 10", category: "Show Infantil", image: "/personajes/IMG_6371.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 11, name: "Personaje 11", category: "Show Infantil", image: "/personajes/IMG_6372.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 12, name: "Personaje 12", category: "Show Infantil", image: "/personajes/IMG_6373.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 13, name: "Personaje 13", category: "Show Infantil", image: "/personajes/IMG_6380.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 14, name: "Personaje 14", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203029.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 15, name: "Personaje 15", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203051.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 16, name: "Personaje 16", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203117.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 17, name: "Personaje 17", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203310.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 18, name: "Personaje 18", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203327.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 19, name: "Personaje 19", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203408.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 20, name: "Personaje 20", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203430.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 21, name: "Personaje 21", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203504.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 22, name: "Personaje 22", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203552.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 23, name: "Personaje 23", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203632.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 24, name: "Personaje 24", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203653.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 25, name: "Personaje 25", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203712.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 26, name: "Personaje 26", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203731.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 27, name: "Personaje 27", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203749.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 28, name: "Personaje 28", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203814.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 29, name: "Personaje 29", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203847.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 30, name: "Personaje 30", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203903.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 31, name: "Personaje 31", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203923.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 32, name: "Personaje 32", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203943.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 33, name: "Personaje 33", category: "Show Infantil", image: "/personajes/Photoroom_20260126_203959.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 34, name: "Personaje 34", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204014.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 35, name: "Personaje 35", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204039.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 36, name: "Personaje 36", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204100.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 37, name: "Personaje 37", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204130.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 38, name: "Personaje 38", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204159.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 39, name: "Personaje 39", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204228.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 40, name: "Personaje 40", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204246.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 41, name: "Personaje 41", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204303.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 42, name: "Personaje 42", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204438.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 43, name: "Personaje 43", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204458.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 44, name: "Personaje 44", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204526.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 45, name: "Personaje 45", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204603.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 46, name: "Personaje 46", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204640.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 47, name: "Personaje 47", category: "Show Infantil", image: "/personajes/Photoroom_20260126_204703.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 48, name: "Personaje 48", category: "Show Infantil", image: "/personajes/Photoroom_20260126_205143.PNG", tags: ["Diversión", "Fiesta"], year: "2024" },
                        { id: 49, name: "Bluey y Bingo", category: "Show Infantil", image: "/personajes/Photoroom_20260204_222559.PNG", tags: ["Aventura", "Hermanas"], year: "2024" },
                        { id: 50, name: "Barbie", category: "Show Infantil", image: "/personajes/IMG_6708.PNG", tags: ["Moda", "Estilo"], year: "2024" },
                        { id: 51, name: "Hello Kitty y Kuriomi", category: "Show Infantil", image: "/personajes/IMG_6712.PNG", tags: ["Sanrio Besties", "Cuteness"], year: "2024" },
                    ]}
                />
            </div>

            {/* 3D CAROUSEL SECTION */}
            <div id="galeria" className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
                <div className="mb-16 text-center relative z-10 px-4">
                    <h3 className="text-5xl md:text-6xl font-black text-gray-900 drop-shadow-sm mb-4">Galería de Shows</h3>

                </div>

                {/* 3D Photo Carousel */}
                <div className="max-w-7xl mx-auto px-4 w-full h-[600px] md:h-[800px] flex items-center justify-center">
                    <SphereImageGrid
                        images={[
                            { id: "1", src: "/fotos_fivecolors/IMG_6441.JPG", alt: "Show Five Colors 1" },
                            { id: "2", src: "/fotos_fivecolors/IMG_6443.JPG", alt: "Show Five Colors 2" },
                            { id: "3", src: "/fotos_fivecolors/IMG_6444.JPG", alt: "Show Five Colors 3" },
                            { id: "4", src: "/fotos_fivecolors/IMG_6445.JPG", alt: "Show Five Colors 4" },
                            { id: "5", src: "/fotos_fivecolors/IMG_6446.JPG", alt: "Show Five Colors 5" },
                            { id: "6", src: "/fotos_fivecolors/IMG_6447.JPG", alt: "Show Five Colors 6" },
                            { id: "7", src: "/fotos_fivecolors/IMG_6448.JPG", alt: "Show Five Colors 7" },
                            { id: "8", src: "/fotos_fivecolors/IMG_6449.JPG", alt: "Show Five Colors 8" },
                            { id: "9", src: "/fotos_fivecolors/IMG_6450.JPG", alt: "Show Five Colors 9" },
                            { id: "10", src: "/fotos_fivecolors/IMG_6451.JPG", alt: "Show Five Colors 10" },
                            { id: "11", src: "/fotos_fivecolors/IMG_6453.JPG", alt: "Show Five Colors 11" },
                            { id: "12", src: "/fotos_fivecolors/IMG_6454.JPG", alt: "Show Five Colors 12" },
                            { id: "13", src: "/fotos_fivecolors/IMG_6455.JPG", alt: "Show Five Colors 13" },
                            { id: "14", src: "/fotos_fivecolors/IMG_6456.JPG", alt: "Show Five Colors 14" },
                            { id: "15", src: "/fotos_fivecolors/IMG_6457.JPG", alt: "Show Five Colors 15" },
                            { id: "16", src: "/fotos_fivecolors/IMG_6458.JPG", alt: "Show Five Colors 16" },
                            { id: "17", src: "/fotos_fivecolors/IMG_6459.JPG", alt: "Show Five Colors 17" },
                            { id: "18", src: "/fotos_fivecolors/IMG_6460.JPG", alt: "Show Five Colors 18" },
                            { id: "19", src: "/fotos_fivecolors/IMG_6461.JPG", alt: "Show Five Colors 19" },
                            { id: "20", src: "/fotos_fivecolors/IMG_6462.JPG", alt: "Show Five Colors 20" },
                            { id: "21", src: "/fotos_fivecolors/IMG_6463.JPG", alt: "Show Five Colors 21" },
                            { id: "22", src: "/fotos_fivecolors/IMG_6464.JPG", alt: "Show Five Colors 22" },
                            { id: "23", src: "/fotos_fivecolors/IMG_6465.JPG", alt: "Show Five Colors 23" },
                            { id: "24", src: "/fotos_fivecolors/IMG_6466.JPG", alt: "Show Five Colors 24" },
                            { id: "25", src: "/fotos_fivecolors/IMG_6467.JPG", alt: "Show Five Colors 25" },
                            { id: "26", src: "/fotos_fivecolors/IMG_6468.JPG", alt: "Show Five Colors 26" },
                            { id: "27", src: "/fotos_fivecolors/IMG_6469.JPG", alt: "Show Five Colors 27" },
                            { id: "28", src: "/fotos_fivecolors/IMG_6470.JPG", alt: "Show Five Colors 28" },
                            { id: "29", src: "/fotos_fivecolors/IMG_6471.JPG", alt: "Show Five Colors 29" },
                            { id: "30", src: "/fotos_fivecolors/IMG_6472.JPG", alt: "Show Five Colors 30" },
                            { id: "31", src: "/fotos_fivecolors/IMG_6473.JPG", alt: "Show Five Colors 31" },
                            { id: "32", src: "/fotos_fivecolors/IMG_6474.JPG", alt: "Show Five Colors 32" },
                            { id: "33", src: "/fotos_fivecolors/IMG_6475.JPG", alt: "Show Five Colors 33" },
                            { id: "34", src: "/fotos_fivecolors/IMG_6476.JPG", alt: "Show Five Colors 34" },
                            { id: "35", src: "/fotos_fivecolors/IMG_6477.JPG", alt: "Show Five Colors 35" },
                            { id: "36", src: "/fotos_fivecolors/IMG_6488.JPG", alt: "Show Five Colors 36" },
                            { id: "37", src: "/fotos_fivecolors/IMG_6489.JPG", alt: "Show Five Colors 37" },
                            { id: "38", src: "/fotos_fivecolors/IMG_6490.JPG", alt: "Show Five Colors 38" },
                            { id: "39", src: "/fotos_fivecolors/IMG_6492.JPG", alt: "Show Five Colors 39" },
                            { id: "40", src: "/fotos_fivecolors/IMG_6493.JPG", alt: "Show Five Colors 40" },
                            { id: "41", src: "/fotos_fivecolors/IMG_6494.JPG", alt: "Show Five Colors 41" },
                            { id: "42", src: "/fotos_fivecolors/Captura de pantalla 2026-01-24 a las 8.17.56 p. m..png", alt: "Captura Show 1" },
                            { id: "43", src: "/fotos_fivecolors/Captura de pantalla 2026-01-24 a las 8.18.16 p. m..png", alt: "Captura Show 2" },
                            { id: "44", src: "/fotos_fivecolors/Captura de pantalla 2026-01-25 a las 7.22.22 a. m..png", alt: "Captura Show 3" },

                        ]}
                        containerSize={sphereConfig.size}
                        sphereRadius={sphereConfig.radius}
                        autoRotate={true}
                        autoRotateSpeed={0.5}
                        baseImageScale={0.1}
                    />
                </div>
            </div>

            {/* PERFECTO PARA SECTION (Replaces Gallery) */}
            <PerfectoParaSection />

            {/* QUOTATION SECTION */}
            <MagicPlanner />

            {/* FOOTER */}
            <Footer />
        </section>
    );
};

export default ShowsInfantilesSection;
