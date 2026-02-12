"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Gravity, MatterBody } from "../ui/gravity";
import { cn } from "../../lib/utils";

interface CorporateFancyProps {
    onCtaClick?: () => void;
}

export function CorporateFancy({ onCtaClick }: CorporateFancyProps) {
    const primaryPills = [
        { text: "+50% Productividad", bg: "bg-emerald-500", x: "30%", y: -100, angle: 10 },
        { text: "+30% Compromiso", bg: "bg-blue-500", x: "70%", y: -200, angle: -5 },
        { text: "+10% Motivación", bg: "bg-amber-500", x: "50%", y: -350, angle: 15 },
    ];

    const secondaryPills = [
        { text: "Dinámicas de equipo", bg: "bg-cyan-500", x: "20%", y: -500, angle: -10 },
        { text: "Charlas motivacionales", bg: "bg-orange-500", x: "80%", y: -600, angle: 5 },
        { text: "Activaciones corporativas", bg: "bg-pink-500", x: "40%", y: -800, angle: -15 },
        { text: "Rallies de integración", bg: "bg-purple-500", x: "60%", y: -900, angle: 20 },
    ];

    const allPills = [...primaryPills, ...secondaryPills];

    // Common physics options for that "heavy/premium" feel
    const pillOptions = {
        restitution: 0.4, // Bouncy but not crazy
        friction: 0.5,    // High friction for stacking
        frictionAir: 0.02, // Air resistance makes falling look "heavier"
        density: 0.05,
    };

    return (
        <div className="relative w-full h-screen min-h-[800px] overflow-hidden bg-white">
            {/* 1) Text Layer (Static & Dominant) */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-32 md:pt-48 pointer-events-none px-6">
                <div className="max-w-4xl text-center space-y-8">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-gray-950 drop-shadow-sm">
                        Corporate Experiences
                    </h1>

                    <p className="text-xl md:text-3xl font-medium text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Integración laboral que se siente: <br className="hidden md:block" />
                        <span className="text-gray-800">más equipo, mejor energía y resultados reales.</span>
                    </p>

                    <div className="pt-8">
                        <button
                            onClick={onCtaClick}
                            className="pointer-events-auto group inline-flex items-center gap-3 px-8 py-4 bg-gray-950 text-white rounded-full text-lg font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-xl"
                        >
                            Ponte en contacto
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2) Physics Layer */}
            {/* z-0 so it is behind text, but we want pills to be interactable. 
          The text container has pointer-events-none, so clicks pass through to here. 
      */}
            <div className="absolute inset-0 z-0">
                <Gravity
                    gravity={{ x: 0, y: 1.2 }} // Slightly higher gravity for weight
                    topWall={false} // Allow falling from top
                    className="w-full h-full"
                >
                    {allPills.map((pill, i) => (
                        <MatterBody
                            key={i}
                            x={pill.x}
                            y={pill.y} // Start well above viewport
                            angle={pill.angle}
                            options={pillOptions}
                            // Approximate sizes strictly for physics engine mapping. 
                            // Visual size is handled by CSS, but must match fairly closely.
                            // Large pills ~320x80, Small pills ~260x60 typically
                            width={pill.text.includes("%") ? 280 : 300}
                            height={pill.text.includes("%") ? 80 : 70}
                            shape="rectangle"
                            radius={40} // Rounded chamfer simulation
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-transform active:scale-95 cursor-grab active:cursor-grabbing select-none",
                                    pill.bg,
                                    // Text and Padding adjustments
                                    pill.text.includes("%")
                                        ? "w-[280px] h-[80px] text-2xl font-black text-white px-8"
                                        : "w-[300px] h-[70px] text-lg font-bold text-white px-6"
                                )}
                            >
                                {pill.text}
                            </div>
                        </MatterBody>
                    ))}
                </Gravity>
            </div>

            {/* Decorative gradient at bottom to fade piles if they get too high */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none opacity-50" />
        </div>
    );
}
