"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MascotMenuProps {
    onNavigateToSection?: (sectionId: string) => void;
}

export function MascotMenu({ onNavigateToSection }: MascotMenuProps) {
    const [open, setOpen] = useState<boolean>(false);

    const menuItems = [
        { label: "Objetivo", sectionId: "objetivo" },
        { label: "Categorías", sectionId: "categorias" },
        { label: "Cotizar", sectionId: "cotizar" },
    ];

    const handleNavigation = (sectionId: string) => {
        setOpen(false);

        // Scroll suave a la sección
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (onNavigateToSection) {
            onNavigateToSection(sectionId);
        }
    };

    return (
        <div className="fixed top-6 right-6 md:right-10 z-50">
            <Button
                className="group bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 shadow-sm"
                variant="outline"
                size="icon"
                onClick={() => setOpen((prevState) => !prevState)}
                aria-expanded={open}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
                <svg
                    className="pointer-events-none text-gray-700"
                    width={16}
                    height={16}
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

            {/* Menu Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-14 right-0 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 overflow-hidden min-w-[160px]"
                    >
                        <nav className="py-2">
                            {menuItems.map((item, index) => (
                                <button
                                    key={item.sectionId}
                                    onClick={() => handleNavigation(item.sectionId)}
                                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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
