"use client";

import React from 'react';
import { useScreenSize } from "@/components/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";


const PixelHero: React.FC = () => {
    const screenSize = useScreenSize();

    return (
        <div className="relative w-full min-h-[100dvh] bg-brand-blue text-white flex flex-col font-display overflow-hidden">
            {/* Pixel Trail Background Layer */}
            <div className="absolute inset-0 z-0">
                <PixelTrail
                    pixelSize={screenSize.lessThan("md") ? 48 : 80}
                    fadeDuration={0}
                    delay={900}
                    pixelClassName="rounded-full bg-brand-yellow"
                />
            </div>

            {/* Content Layer */}
            <div className="justify-center items-center flex flex-col w-full h-full z-10 pointer-events-none space-y-4 md:space-y-6 p-6 text-center">
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter drop-shadow-lg cursor-default pointer-events-auto transition-transform hover:scale-105 duration-300">
                    FÁBRICA DE <br />
                    <span className="text-brand-yellow drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">DIVERSIÓN</span>
                </h1>
                <p className="text-lg md:text-3xl font-medium text-white/90 max-w-2xl drop-shadow-md">
                    FiveColors presenta magia en cada evento.
                    <br />
                    <span className="text-sm md:text-base opacity-80 mt-2 block">(Mueve tu mouse para ver la magia)</span>
                </p>

                {/* CTA Buttons from original Hero */}
                <div className="flex flex-col md:flex-row gap-6 mt-8 pointer-events-auto">
                    <button className="px-8 py-3 md:px-10 md:py-4 bg-brand-yellow text-gray-900 font-black text-lg md:text-xl rounded-full shadow-[0_8px_0px_rgba(0,0,0,1)] border-2 border-gray-900 hover:translate-y-1 hover:shadow-[0_4px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide">
                        Reserva ahora
                    </button>
                    <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 border-2 border-gray-900 font-black text-lg md:text-xl rounded-full shadow-[0_8px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[0_4px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wide">
                        Ver paquetes
                    </button>
                </div>
            </div>

            {/* Footer Info */}
            <p className="absolute text-xs md:text-base bottom-8 right-8 pointer-events-none opacity-60 font-medium">
                FiveColors - Fiestas Infantiles
            </p>

            {/* Wave Separator removed for flat design */}
        </div>
    );
};

export default PixelHero;
