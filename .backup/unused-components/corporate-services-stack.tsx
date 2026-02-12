"use client";

import React from "react";
import { StackCard } from "@/components/ui/stack-card";
import {
    Flag, Users, Zap, PartyPopper, Rocket, GraduationCap
} from "lucide-react";

const services = [
    {
        title: "Rallys Corporativos",
        description: "Dinámicas y competencias diseñadas para impulsar el trabajo en equipo, la comunicación efectiva y la resolución colaborativa de retos.",
        bullets: ["Actividades personalizadas", "Competencias por equipos", "Premiaciones incluidas"],
        icon: <Flag className="w-8 h-8 text-red-500" />,
        color: "linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)", // Soft Red
    },
    {
        title: "Integración de Equipo",
        description: "Actividades especializadas que fortalecen la cohesión, confianza y productividad del equipo.",
        bullets: ["Rompehielos creativos", "Dinámicas de confianza", "Team building profesional"],
        icon: <Users className="w-8 h-8 text-blue-500" />,
        color: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)", // Soft Blue
    },
    {
        title: "Eventos de Motivación",
        description: "Experiencias diseñadas para elevar la energía, el compromiso y la satisfacción laboral.",
        bullets: ["Sesiones energizantes", "Reconocimientos especiales", "Ambientes positivos"],
        icon: <Zap className="w-8 h-8 text-amber-500" />,
        color: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)", // Soft Amber
    },
    {
        title: "Celebraciones Empresariales",
        description: "Organización completa de aniversarios, metas alcanzadas y celebraciones corporativas.",
        bullets: ["Planeación integral", "Entretenimiento profesional", "Decoración temática"],
        icon: <PartyPopper className="w-8 h-8 text-pink-500" />,
        color: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)", // Soft Pink
    },
    {
        title: "Ferias & Activaciones",
        description: "Actividades interactivas para ferias, convenciones y eventos de gran escala.",
        bullets: ["Stands interactivos", "Botargas corporativas", "Alto impacto visual"],
        icon: <Rocket className="w-8 h-8 text-purple-500" />,
        color: "linear-gradient(135deg, #f3e8ff 0%, #d8b4fe 100%)", // Soft Purple
    },
    {
        title: "Capacitaciones Lúdicas",
        description: "Metodologías que combinan aprendizaje y diversión para una mayor retención.",
        bullets: ["Aprendizaje activo", "Dinámicas educativas", "Experiencias memorables"],
        icon: <GraduationCap className="w-8 h-8 text-emerald-500" />,
        color: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)", // Soft Emerald
    }
];

export default function CorporateServicesStack() {
    return (
        <section className="bg-white relative py-20 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Eventos Corporativos
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
                        Experiencias para empresas: integración, energía y resultados reales.
                    </p>
                </div>

                {/* Stack Cards Container */}
                <div className="flex flex-col items-center pb-20 md:pb-40">
                    {services.map((service, i) => (
                        <StackCard
                            key={i}
                            i={i}
                            {...service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
