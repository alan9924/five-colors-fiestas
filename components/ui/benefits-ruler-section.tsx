"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { RulerCarousel, type BenefitItem } from "./ruler-carousel";

const benefits: BenefitItem[] = [
    {
        id: 1,
        title: "Clima Organizacional",
        description: "Fortalece la convivencia, la confianza y el ambiente de trabajo.",
    },
    {
        id: 2,
        title: "Productividad",
        description: "Equipos más motivados trabajan mejor, con más enfoque y energía.",
    },
    {
        id: 3,
        title: "Reducción de Estrés",
        description: "Dinámicas que bajan tensión y mejoran el bienestar del personal.",
    },
    {
        id: 4,
        title: "Comunicación",
        description: "Mejora la coordinación, acuerdos y claridad entre áreas.",
    },
    {
        id: 5,
        title: "Liderazgo",
        description: "Impulsa habilidades de liderazgo y toma de decisiones.",
    },
    {
        id: 6,
        title: "Retención de Talento",
        description: "Un mejor ambiente incrementa la permanencia y compromiso.",
    },
    {
        id: 7,
        title: "Cultura Positiva",
        description: "Refuerza valores y sentido de pertenencia en la organización.",
    },
    {
        id: 8,
        title: "Trabajo en Equipo",
        description: "Colaboración real con dinámicas que conectan y alinean objetivos.",
    },
];

export function BenefitsRulerSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeBenefit = benefits[activeIndex];

    return (
        <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern - Stars/Dots */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Title and Subtitle */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-5xl font-black mb-4">
                        Beneficios para tu Empresa
                    </h3>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Invertir en tu equipo es invertir en el futuro de tu organización.
                    </p>
                </div>

                {/* Ruler Carousel */}
                <div className="mb-12">
                    <RulerCarousel
                        items={benefits}
                        activeIndex={activeIndex}
                        onActiveChange={setActiveIndex}
                    />
                </div>

                {/* Detail Card */}
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex items-start gap-6">
                        {/* Check Icon */}
                        <div className="shrink-0">
                            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-green-400" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                {activeBenefit.title}
                            </h4>
                            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                {activeBenefit.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
