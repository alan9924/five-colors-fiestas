"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { StackedCharacterCards } from '../ui/stacked-character-cards';

interface Character {
    id: number;
    name: string;
    category: string;
    image: string;
    tags: string[];
    year?: string;
}

interface LogoToCarouselSectionProps {
    characters: Character[];
}

const LogoToCarouselSection: React.FC<LogoToCarouselSectionProps> = ({ characters }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress across the entire combined section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transform values - logo simulates sticky by moving down as container scrolls up
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.6, 0.4]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 600]); // Moves down to counter scroll up
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <div ref={containerRef} className="relative z-20 bg-white min-h-[120vh] md:min-h-[140vh]">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-brand-yellow rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-pink rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Floating Stars */}
            <motion.div
                className="absolute top-20 left-[10%] text-brand-yellow z-10"
                style={{ opacity }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Sparkles size={32} fill="currentColor" />
            </motion.div>

            <motion.div
                className="absolute top-32 right-[15%] text-brand-pink z-10"
                style={{ opacity }}
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, -360],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                <Sparkles size={24} fill="currentColor" />
            </motion.div>

            <motion.div
                className="absolute bottom-20 left-[20%] text-brand-blue z-10"
                style={{ opacity }}
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                <Sparkles size={28} fill="currentColor" />
            </motion.div>

            <motion.div
                className="absolute bottom-32 right-[25%] text-brand-orange z-10"
                style={{ opacity }}
                animate={{
                    y: [0, -18, 0],
                    rotate: [0, -360],
                }}
                transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            >
                <Sparkles size={20} fill="currentColor" />
            </motion.div>

            {/* Animated Logo - Simulated Sticky */}
            <motion.div
                className="relative top-20 max-w-2xl mx-auto px-6 z-20 py-12"
                style={{
                    scale,
                    y,
                    opacity
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                >
                    {/* Glow Effect Behind Logo */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 via-brand-pink/20 to-brand-blue/20 rounded-[3rem] blur-2xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Logo Image */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.img
                            src="/logo_fivecolors_espectaculos.png"
                            alt="Five Colors - Espectáculos Infantiles"
                            className="w-full h-auto max-w-xl mx-auto drop-shadow-2xl"
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut"
                            }}
                            style={{
                                maskImage: "linear-gradient(to right, transparent, black, transparent)",
                                WebkitMaskImage: "linear-gradient(to right, transparent, black, transparent)"
                            }}
                        />
                    </motion.div>

                    {/* Decorative Border */}
                    <motion.div
                        className="absolute -inset-4 border-4 border-dashed border-brand-yellow/30 rounded-[3.5rem] pointer-events-none"
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </motion.div>

                {/* Subtitle Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mt-8"
                >
                    <p className="text-xl md:text-2xl font-black text-gray-600 uppercase tracking-wider">
                        ¡La Magia de la Diversión!
                    </p>
                </motion.div>
            </motion.div>

            {/* Character Carousel - Positioned below, logo will settle above it */}
            <div className="relative z-10 mt-20">
                <StackedCharacterCards characters={characters} />
            </div>
        </div>
    );
};

export default LogoToCarouselSection;
