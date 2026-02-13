"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../ui/glass-button';


export const CorporateIntro = () => {
    return (
        <section id="corporate-intro" className="py-20 px-6 max-w-5xl mx-auto text-center bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-slate-900">
                    ¿Qué ofrecemos?
                </h2>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto mb-6">
                    Diseñamos experiencias que fortalecen la cultura empresarial, desarrollan equipos de alto desempeño y generan conexiones que impulsan resultados reales.
                </p>

                <div className="mt-10 flex justify-center">
                    <GlassButton
                        size="lg"
                        className="shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-shadow duration-300"
                        contentClassName="flex items-center gap-2 font-bold text-slate-900"
                        onClick={() => document.getElementById('corporate-contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span>Hablar con un especialista</span>
                    </GlassButton>
                </div>
            </motion.div>
        </section>
    );
};
