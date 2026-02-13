"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ScrollyHero = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <div className="relative h-[100dvh] w-full overflow-hidden bg-gray-900">
            {/* 1. Video Background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover object-center"
                src="/mascota-video-2.mp4"
            />

            {/* 2. Overlay */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* 3. Text Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center max-w-4xl px-4"
                >
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-lg mb-4">
                        FÁBRICA DE <br />
                        <span className="text-brand-yellow">DIVERSIÓN</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-medium text-white/90 drop-shadow-md mb-8">
                        FiveColors presenta magia en cada evento.
                    </p>

                    <button
                        onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-3 md:px-10 md:py-4 bg-brand-yellow text-navy font-black text-lg md:text-xl rounded-full shadow-[0_10px_20px_rgba(255,212,0,0.4)] hover:scale-105 transition-transform active:scale-95 uppercase tracking-wide cursor-pointer"
                    >
                        Reserva ahora
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default ScrollyHero;
