"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Building2, Mail, Phone, Calendar, MessageSquare } from 'lucide-react';
import { getWhatsAppUrlWithFormData } from '@/lib/constants';

export const CorporateContactForm = () => {
    const [formState, setFormState] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Usar helper de constantes para generar URL de WhatsApp
        const whatsappUrl = getWhatsAppUrlWithFormData(formState);
        window.open(whatsappUrl, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="corporate-contact" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Copy */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                                Diseñemos una experiencia <span className="text-blue-600">inolvidable</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Cuéntanos sobre tu evento y tu equipo. Personalizaremos cada detalle para alinear la diversión con tus objetivos empresariales.
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 text-slate-700">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Send size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Respuesta Rápida</p>
                                        <p className="text-sm text-slate-500">Recibe una propuesta en menos de 24 horas.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Empresa</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            name="company"
                                            value={formState.company}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="Nombre de la empresa"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Correo Electrónico</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="correo@empresa.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700 ml-1">Teléfono / WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formState.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                            placeholder="55 1234 5678"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Fecha Tentativa</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formState.date}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Detalles del Evento</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                                    <textarea
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                                        placeholder="Cuéntanos qué tienes en mente: tipo de evento, número aproximado de asistentes, objetivos..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform active:scale-[0.98]"
                            >
                                Solicitar Cotización
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
