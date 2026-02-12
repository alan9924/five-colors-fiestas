"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

function ShowMenu() {
    const [open, setOpen] = useState<boolean>(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setOpen(false);
        }
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            <Button
                className="group bg-white text-black border-2 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all rounded-full h-12 w-12"
                variant="ghost"
                size="icon"
                onClick={() => setOpen((prevState) => !prevState)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                <svg
                    className="pointer-events-none"
                    width={24}
                    height={24}
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

            {open && (
                <div className="absolute top-16 right-0 bg-white border-2 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl p-2 w-56 flex flex-col gap-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 origin-top-right">
                    <button onClick={() => scrollToSection('personajes')} className="text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-brand-yellow hover:text-black rounded-lg transition-colors flex items-center gap-2">
                        Personajes
                    </button>
                    <button onClick={() => scrollToSection('galeria')} className="text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-brand-pink hover:text-white rounded-lg transition-colors flex items-center gap-2">
                        Galería
                    </button>
                    <button onClick={() => scrollToSection('servicios')} className="text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-brand-blue hover:text-white rounded-lg transition-colors flex items-center gap-2">
                        Servicios
                    </button>
                    <button onClick={() => scrollToSection('contacto')} className="text-left px-4 py-3 text-sm font-bold text-gray-900 hover:bg-brand-green hover:text-white rounded-lg transition-colors flex items-center gap-2">
                        Contáctanos
                    </button>
                </div>
            )}
        </div>
    );
}

export { ShowMenu };
