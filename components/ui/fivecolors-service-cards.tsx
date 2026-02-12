"use client";

import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
    title: string;
    description: string;
    theme: "pink" | "blue" | "orange" | "green";
    onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    theme,
    onClick,
}) => {
    const getThemeStyles = (theme: "pink" | "blue" | "orange" | "green") => {
        switch (theme) {
            case "pink":
                return {
                    gradient: "from-pink-100 to-rose-100",
                    titleColor: "text-rose-500",
                    buttonGradient: "from-rose-400 to-pink-500",
                    shadowColor: "shadow-pink-200/50",
                    ringColor: "bg-rose-500",
                };
            case "blue":
                return {
                    gradient: "from-blue-50 to-indigo-100",
                    titleColor: "text-blue-500",
                    buttonGradient: "from-blue-400 to-indigo-500",
                    shadowColor: "shadow-blue-200/50",
                    ringColor: "bg-blue-500",
                };
            case "orange":
                return {
                    gradient: "from-orange-50 to-amber-100",
                    titleColor: "text-orange-500",
                    buttonGradient: "from-orange-400 to-amber-500",
                    shadowColor: "shadow-orange-200/50",
                    ringColor: "bg-orange-500",
                };
            case "green":
                return {
                    gradient: "from-emerald-50 to-teal-100",
                    titleColor: "text-emerald-500",
                    buttonGradient: "from-emerald-400 to-teal-500",
                    shadowColor: "shadow-emerald-200/50",
                    ringColor: "bg-emerald-500",
                };
        }
    };

    const styles = getThemeStyles(theme);

    return (
        <motion.div
            className="relative w-full max-w-sm mx-auto group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Rotated background "paper" layer */}
            <div
                className={`absolute inset-0 rounded-3xl transform rotate-[-2deg] translate-y-2 opacity-60 z-0 bg-gradient-to-br ${styles.gradient} blur-[1px]`}
            ></div>

            {/* Main card */}
            <div className="relative z-10 h-full bg-white rounded-3xl overflow-hidden shadow-xl border border-white/40">
                {/* Pastel Gradient Background */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-80`}
                ></div>

                {/* Content Container */}
                <div className="relative p-8 h-full flex flex-col items-center text-center z-10 transition-transform duration-300 group-hover:scale-[1.01]">
                    {/* Subtle Ring Accent */}
                    <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-white/60 backdrop-blur-sm shadow-sm`}>
                        <div className={`w-3 h-3 rounded-full ${styles.ringColor}`}></div>
                    </div>

                    <h3 className={`text-3xl font-bold mb-3 ${styles.titleColor} tracking-tight`}>
                        {title}
                    </h3>

                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base flex-grow">
                        {description}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClick}
                        className={`px-6 py-2.5 rounded-full text-white font-semibold text-sm shadow-md bg-gradient-to-r ${styles.buttonGradient} hover:shadow-lg transition-shadow duration-300`}
                    >
                        VER DETALLES
                    </motion.button>
                </div>

                {/* Wavy Edge at Bottom (SVG Overlay) */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 opacity-30">
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-[calc(110%+1.3px)] h-[50px] fill-white"
                    >
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

const FiveColorsServiceCards = () => {
    const services = [
        {
            title: "Cumpleaños",
            description:
                "Celebra el día especial de tu pequeño con un show inolvidable lleno de magia, música y diversión. Nuestros personajes harán que cada momento sea memorable.",
            theme: "pink",
        },
        {
            title: "Bautizos",
            description:
                "Convierte este día sagrado en una celebración llena de alegría. Entretenimiento apropiado y memorable para todas las edades en esta ocasión tan especial.",
            theme: "blue",
        },
        {
            title: "Graduaciones",
            description:
                "Celebra este importante logro con un espectáculo que los pequeños nunca olvidarán. Perfecto para graduaciones de kínder y preescolar.",
            theme: "orange",
        },
        {
            title: "Eventos Escolares",
            description:
                "Shows educativos y divertidos para festivales escolares, día del niño, posadas y cualquier celebración en tu escuela. Adaptamos nuestro show a tus necesidades.",
            theme: "green",
        },
    ] as const;

    return (
        <div className="w-full bg-transparent">
            <div className="max-w-7xl mx-auto">
                {/* Desktop: First 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 mb-8 md:mb-12">
                    {services.slice(0, 3).map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            theme={service.theme}
                        />
                    ))}
                </div>

                {/* Desktop: Center the 4th card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12">
                    {/* Empty columns for centering on lg screens */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    <div className="w-full lg:col-span-1 flex justify-center">
                        <ServiceCard
                            title={services[3].title}
                            description={services[3].description}
                            theme={services[3].theme}
                        />
                    </div>

                    <div className="hidden lg:block lg:col-span-1"></div>
                </div>
            </div>
        </div>
    );
};

export default FiveColorsServiceCards;
