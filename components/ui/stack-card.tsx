"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface StackCardProps {
    i: number;
    title: string;
    description: string;
    bullets: string[];
    icon: React.ReactNode;
    color: string; // Gradient background for the splash
}

export const StackCard: React.FC<StackCardProps> = ({
    i,
    title,
    description,
    bullets,
    icon,
    color,
}) => {
    return (
        <motion.div
            className={cn(
                "relative flex justify-center items-center w-full",
                "mb-8 md:-mb-32" // Mobile: spacery, Desktop: Overlap (stack effect)
            )}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.4, once: true }}
            custom={i}
        >
            {/* Splash Background Shape */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
                {/* 
                    We use an SVG to render the splash shape so it can scale or maintain aspect ratio.
                    The original path was for a 500x450 box. We'll try to center it behind existing card.
                */}
                <div
                    className="w-[120%] h-[120%] opacity-20 transform scale-110 md:scale-125"
                    style={{
                        background: color,
                        maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 450' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z' /%3E%3C/svg%3E")`,
                        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 450' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z' /%3E%3C/svg%3E")`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                    }}
                />
            </div>

            {/* Card Content */}
            <motion.div
                variants={cardVariants}
                className={cn(
                    "relative z-10 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100",
                    "w-full max-w-lg md:max-w-2xl min-h-[400px] flex flex-col justify-between", // Responsive width
                    "transform origin-center"
                )}
            >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-slate-900 shadow-sm">
                            {icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                            {title}
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div className="space-y-6">
                    <p className="text-slate-600 text-lg leading-relaxed">
                        {description}
                    </p>

                    <div className="space-y-3 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
                        {bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                                <span className="font-medium text-slate-700 text-sm md:text-base">{bullet}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const cardVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0,
        rotate: 0, // Reset for cleanliness or start slightly skewed
    },
    onscreen: {
        y: 0,
        opacity: 1,
        rotate: -3, // Subtle rotation, less extreme than -10 ensures text readability
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};
