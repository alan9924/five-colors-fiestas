"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Flag, Users, Sparkles, CheckCircle2 } from "lucide-react";

const services = [
    {
        id: "rallys",
        title: "Rallys Corporativos",
        summary: "Dinámicas y competencias para impulsar colaboración y energía.",
        bullets: [
            "Actividades personalizadas",
            "Retos por equipos",
            "Coordinación y comunicación",
        ],
        icon: Flag,
        iconColor: "text-red-600 dark:text-red-400",
        iconBg: "bg-red-50 dark:bg-red-500/10",
    },
    {
        id: "integracion",
        title: "Integración de Equipo",
        summary: "Experiencias para fortalecer vínculos y confianza entre áreas.",
        bullets: [
            "Dinámicas de confianza",
            "Rompehielos y retos",
            "Cierre con reflexión",
        ],
        icon: Users,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
        id: "activaciones",
        title: "Activaciones y Dinámicas",
        summary: "Momentos de alto impacto para eventos y fechas especiales.",
        bullets: [
            "Animación y conducción",
            "Juegos y concursos",
            "Experiencias temáticas",
        ],
        icon: Sparkles,
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-500/10",
    },
];

export function CorporateEventsAccordion() {
    return (
        <section className="bg-white dark:bg-slate-950 relative py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header - Premium Typography */}
                <div className="text-center mb-16 md:mb-24 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Eventos Corporativos
                    </h2>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Experiencias para empresas: integración, energía y resultados reales.
                    </p>
                </div>

                {/* Stacked Accordion Cards */}
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-0">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            // Calculate z-index (first item on top)
                            const zIndex = 30 - index * 10;
                            // Apply negative margin for stacking effect (except first)
                            const marginClass = index === 0 ? "" : "-mt-6 md:-mt-8";

                            return (
                                <div
                                    key={service.id}
                                    className={marginClass}
                                    style={{ zIndex }}
                                >
                                    <AccordionItem value={service.id}>
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-4 md:gap-6 w-full pr-4">
                                                {/* Icon */}
                                                <div
                                                    className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${service.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                                                >
                                                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${service.iconColor}`} />
                                                </div>

                                                {/* Text - Premium Typography */}
                                                <div className="flex-1 min-w-0 text-left space-y-1">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
                                                        {service.title}
                                                    </h3>
                                                    <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
                                                        {service.summary}
                                                    </p>
                                                </div>
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent>
                                            <div className="space-y-6">
                                                {/* Bullet List - Clean & Spacious */}
                                                <ul className="space-y-3">
                                                    {service.bullets.map((bullet, i) => (
                                                        <li key={i} className="flex items-start gap-3 group">
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" />
                                                            <span className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                                                {bullet}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* CTA Button - Premium Style */}
                                                <button
                                                    onClick={() =>
                                                        window.open(
                                                            "https://api.whatsapp.com/send?phone=5215545117478&text=Hola%20FiveColors%20te%20contacto%20desde%20tu%20sitio%20web%20Corporativo",
                                                            "_blank"
                                                        )
                                                    }
                                                    className="mt-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full px-6 py-3 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-white focus-visible:ring-offset-2"
                                                >
                                                    Solicitar cotización
                                                </button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
