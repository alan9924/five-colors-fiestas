"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { label: "Servicios", id: "servicios" },
    { label: "Objetivos", id: "objetivos" },
    { label: "Experiencias", id: "experiencias" },
    { label: "Beneficios", id: "beneficios" },
    { label: "Galería", id: "galeria" },
    { label: "Contáctanos", id: "contactanos" },
];

export function CorporateMenu() {
    const [open, setOpen] = useState<boolean>(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // scroll with offset for fixed header if needed, for now just scrollIntoView
            element.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
            <Button
                className="group bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white text-gray-900 shadow-sm rounded-full w-12 h-12"
                variant="outline"
                size="icon"
                onClick={() => setOpen((prevState) => !prevState)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                <svg
                    className="pointer-events-none"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                </svg>
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl overflow-hidden min-w-[200px]"
                    >
                        <nav className="flex flex-col py-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
