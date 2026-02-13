"use client";

import React, { useEffect, useRef, useState } from 'react'; // Verified Update
import { ArrowLeft, ExternalLink, Box, Sparkles, ScanLine, Palette, Hammer, Zap, Star, Shield, Award, Upload, Send, MapPin, X, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverEffect } from './ui/hover-effect';
import ColorChangeCards from './ui/color-change-card';
import Footer from './Footer';
import { MascotMenu } from './ui/mascot-menu';

interface MascotDesignViewProps {
    onNavigate?: (page: string) => void;
}

const mascotCategories = [
    {
        title: "Personajes para Escuelas",
        description: "Mascotas que representan los valores de tu institución educativa. Perfectas para motivar a los estudiantes y crear sentido de pertenencia. \n\nFeatures: Diseño amigable • Colores institucionales • Durabilidad garantizada",
        link: "#",
        image: "/mascots/school.png",
        theme: "school"
    },
    {
        title: "Deportivos",
        description: "Mascotas para equipos deportivos que inspiran pasión y unidad. Diseñadas para resistir el entusiasmo de los aficionados. \n\nFeatures: Diseño dinámico • Resistente a uso rudo • Personalización completa",
        link: "#",
        image: "/mascots/sports.png",
        theme: "sports"
    },
    {
        title: "Fanáticos",
        description: "Personajes únicos para grupos de fans y comunidades. Dale vida a tu pasión con una botarga que te represente. \n\nFeatures: Diseño personalizado • Detalles únicos • Expresión de identidad",
        link: "#",
        image: "/mascots/fans_character.png",
        theme: "fans"
    },
    {
        title: "Corporativo: Mascota de Marca",
        description: "Crea una conexión emocional con tus clientes. Una mascota corporativa hace que tu marca sea memorable y cercana. \n\nFeatures: Refleja tu marca • Uso en eventos • Marketing efectivo",
        link: "#",
        image: "/mascots/corporate.png",
        theme: "corporate"
    },
];

const MascotDesignView: React.FC<MascotDesignViewProps> = ({ onNavigate }) => {
    const kbooRef = useRef<HTMLElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formState, setFormState] = useState({
        characterName: '',
        purpose: '',
        description: '',
        fullName: '',
        city: '',
        phone: '',
        email: ''
    });


    useEffect(() => {
        // Scroll instantáneo al inicio cuando se monta el componente
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        // También asegurar que el body esté en la parte superior
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);


    const handleNavigate = (page: string) => {
        if (onNavigate) onNavigate(page);
        else window.location.href = `/?page=${page}`;
    };

    const scrollToKboo = () => {
        kbooRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const clearFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construir mensaje de WhatsApp con los datos del formulario
        // Construir mensaje de WhatsApp con los datos del formulario
        let text = `¡Hola! Me interesa diseñar una botarga personalizada.%0A%0A*SOBRE EL PERSONAJE:*%0A*Nombre del Personaje:* ${formState.characterName}%0A*Propósito:* ${formState.purpose}%0A*Descripción:* ${formState.description}`;

        if (selectedFile) {
            text += `%0A*Imagen de Referencia:* ${selectedFile.name} (La adjuntaré en este chat)`;
        }

        text += `%0A%0A*DATOS DE CONTACTO:*%0A*Nombre:* ${formState.fullName}%0A*Ciudad:* ${formState.city}%0A*Teléfono:* ${formState.phone}%0A*Email:* ${formState.email}`;

        // Abrir WhatsApp con el mensaje
        window.open(`https://api.whatsapp.com/send?phone=5214421434797&text=${text}`, '_blank');

        // Limpiar formulario
        setFormState({
            characterName: '',
            purpose: '',
            description: '',
            fullName: '',
            city: '',
            phone: '',
            email: ''
        });
    };

    return (
        <div className="min-h-screen bg-white font-body text-gray-900 relative">
            {/* Abstract Background Elements - Constrained */}
            <div className="absolute top-0 right-0 w-[40vw] max-w-[300px] h-[40vw] max-h-[300px] bg-brand-yellow/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[40vw] max-w-[300px] h-[40vw] max-h-[300px] bg-brand-pink/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Main Content Wrapper - Strict Overflow Control */}
            <main className="w-full overflow-x-hidden">
                {/* Back Button */}
                <div className="fixed top-6 left-6 md:left-10 z-50">
                    <button
                        onClick={() => handleNavigate('home')}
                        className="bg-white p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 hover:translate-y-1 hover:shadow-none transition-all group"
                    >
                        <ArrowLeft className="text-gray-900 group-hover:-translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Menu Hamburguesa */}
                <MascotMenu />

                {/* SECTION 1: HERO - Premium Studio Layout */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 relative z-10 w-full">

                    {/* LEFT COLUMN: Typography & Storytelling */}
                    <div className="w-full lg:w-5/12 space-y-8 text-center lg:text-left pt-10 lg:pt-0 relative z-20">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-xs font-black tracking-widest uppercase mx-auto lg:mx-0"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
                            </span>
                            Mascot Lab © 2024
                        </motion.div>

                        {/* Main Title Group */}
                        <div className="space-y-4 relative">
                            {/* Decorative background text */}
                            <div className="absolute -top-20 -left-20 text-[120px] font-black text-gray-100 select-none pointer-events-none opacity-50 font-heading tracking-tighter hidden lg:block z-[-1]">
                                CREATE
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-6xl md:text-7xl lg:text-8xl font-black font-heading text-gray-900 leading-[0.85] tracking-tighter drop-shadow-sm"
                            >
                                DISEÑO <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-purple to-brand-blue animate-gradient-x">
                                    IMPACTANTE
                                </span>
                            </motion.h1>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-2xl md:text-3xl font-bold font-heading text-gray-400 tracking-tight"
                            >
                                <span className="text-gray-900">Tu marca,</span> convertida en leyenda.
                            </motion.h2>
                        </div>

                        {/* Descriptive Copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-500 font-medium font-sans leading-relaxed max-w-lg mx-auto lg:mx-0"
                        >
                            Deja de ser una empresa más. Transformamos tu identidad en un personaje <span className="text-gray-900 font-bold underline decoration-brand-yellow decoration-4 underline-offset-2">vivo y memorable</span> que conecta instantáneamente con tu audiencia.
                        </motion.p>

                        {/* Capabilities Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-wrap gap-2 justify-center lg:justify-start"
                        >
                            {['Diseño 3D', 'Ergonomía', 'Materiales Premium', 'Alta Durabilidad'].map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-6 justify-center lg:justify-start"
                        >
                            <button
                                onClick={() => window.location.href = '#cotizar'}
                                className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black font-heading text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 hover:translate-y-1 hover:shadow-none transition-all duration-200 flex items-center gap-3 group active:scale-95"
                            >
                                INICIAR PROYECTO <ExternalLink size={20} className="group-hover:rotate-45 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Video Showcase - Premium Look */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="w-full lg:w-7/12 relative flex items-center justify-center p-4 lg:p-0"
                    >

                        {/* Background Graphic Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue rounded-full blur-[80px] opacity-20 animate-pulse delay-700"></div>

                        {/* Decorative Ring */}
                        <div className="absolute inset-0 border border-gray-200 rounded-[32px] transform rotate-2 scale-105 z-0"></div>
                        <div className="absolute inset-0 border border-gray-100 rounded-[32px] transform -rotate-2 scale-105 z-0"></div>

                        {/* Video Container - CLEAN & PRECISE */}
                        <div className="relative z-10 w-full max-w-2xl h-[500px] md:h-[700px] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white bg-white" style={{ borderRadius: '24px' }}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover rounded-[20px]"
                            >
                                <source src="/botarga_llama.mp4" type="video/mp4" />
                            </video>

                            {/* Overlay Gradient at bottom for text readability if needed later, kept subtle */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>

                        {/* Floating Info Card */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -right-4 bottom-20 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                    <Zap size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Engagement</p>
                                    <p className="text-lg font-black font-heading text-gray-900">+300%</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>

                {/* SECTION 2: KBOO CASE STUDY */}
                <section id="objetivo" ref={kbooRef} className="py-24 bg-gray-100/50 relative">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-black text-gray-900 mb-2">Objetivo</h2>
                            <p className="text-gray-500 font-bold">Descubre el nivel de detalle que entregamos.</p>
                        </div>

                        {/* Main "Product Card" Container */}
                        <div className="w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-gray-200">

                            {/* Yellow Header / Packaging Top */}
                            <div className="bg-[#FFD700] h-32 w-full relative px-8 py-6 flex justify-between items-start">

                                {/* Hole Punch Simulation */}
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-100 rounded-full shadow-inner border border-gray-300 z-10"></div>

                                <div className="flex flex-col z-10">
                                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase font-display">KBOO</h1>
                                    <span className="text-xs font-bold tracking-[0.2em] text-gray-800 opacity-60">ONTHE<span className="text-gray-900">ROAD</span></span>
                                </div>

                                <div className="z-10 bg-black/5 rounded px-3 py-1 mt-2">
                                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Personal File</span>
                                </div>

                                {/* White overlay effect for plastic look */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                            </div>

                            {/* Content Body */}
                            <div className="flex flex-col md:flex-row relative">

                                {/* Left: Character Visual */}
                                <div className="w-full md:w-5/12 bg-gray-50 relative min-h-[500px] border-r border-dashed border-gray-300">
                                    {/* Background Grid */}
                                    <div className="absolute inset-0 opacity-20"
                                        style={{
                                            backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
                                            backgroundSize: '40px 40px'
                                        }}>
                                    </div>

                                    {/* Character Image */}
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center pt-10">
                                        {/* Floating Badge */}
                                        <div className="absolute top-8 right-8 bg-brand-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-black shadow-lg animate-bounce">
                                            <Zap size={20} fill="currentColor" />
                                        </div>

                                        <img
                                            src="https://api.dicebear.com/9.x/big-smile/svg?seed=Kboo&skinColor=3b82f6&hair=mohawk&backgroundColor=transparent"
                                            alt="Kboo Character"
                                            className="w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-xl filter hover:scale-105 transition-transform duration-500"
                                        />

                                        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-gray-200 mt-8 mb-8 transform -rotate-2">
                                            <span className="font-black text-2xl text-gray-900 uppercase">HEY!</span>
                                        </div>

                                        {/* Shadow */}
                                        <div className="w-40 h-4 bg-black/10 rounded-[100%] blur-sm -mt-10"></div>
                                    </div>
                                </div>

                                {/* Right: Specs & Info */}
                                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col">

                                    {/* Logo & Handwriting */}
                                    <div className="flex justify-end mb-6">
                                        <span className="font-handwriting text-5xl text-brand-blue font-black tracking-tighter transform -rotate-6" style={{ fontFamily: 'Fredoka, cursive' }}>
                                            Kboo.
                                        </span>
                                    </div>

                                    {/* Stats Bar */}
                                    <div className="flex justify-between border-t-2 border-brand-blue border-b border-gray-100 py-3 mb-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        <div className="flex flex-col">
                                            <span className="opacity-50 mb-1">Birth / ID</span>
                                            <span className="text-gray-900">221007</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="opacity-50 mb-1">Attr / Type</span>
                                            <span className="text-brand-blue">Cloud</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="opacity-50 mb-1">Job / Role</span>
                                            <span className="text-gray-900">Guide</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="opacity-50 mb-1">Weight / Size</span>
                                            <span className="text-gray-900">Light</span>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        <span className="bg-[#FFD700] text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                                            <Star size={12} fill="black" /> Employee of the Year
                                        </span>
                                        <span className="bg-[#FFD700] text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                            # Friendly Service
                                        </span>
                                        <span className="bg-[#FFD700] text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                            # Handsome
                                        </span>
                                        <span className="bg-[#FFD700] text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                                            # Car Rental Expert
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-10 text-gray-700 text-base md:text-lg font-bold leading-relaxed space-y-4 text-justify">
                                        <p>
                                            En FiveColors creamos botargas que no solo se ven bien, sino que generan emoción, atraen miradas y hacen que tu marca o evento sea inolvidable.
                                        </p>
                                        <p>
                                            Diseñamos cada personaje de forma personalizada, utilizando materiales de alta calidad que garantizan durabilidad, comodidad y una presencia escénica impactante.
                                        </p>
                                        <p>
                                            Combinamos creatividad, experiencia y talento mexicano para desarrollar botargas ideales para shows infantiles, activaciones de marca, eventos especiales o renta, logrando una conexión inmediata con el público.
                                        </p>
                                        <p>
                                            No solo fabricamos botargas —creamos experiencias.
                                            Te acompañamos desde la idea hasta el resultado final para que tu personaje se convierta en el protagonista y deje una impresión duradera.
                                        </p>
                                    </div>

                                    {/* Turnaround Section */}
                                    <div className="mt-auto relative bg-blue-50/50 rounded-2xl p-6 border border-blue-100">

                                        {/* Ruler */}
                                        <div className="absolute left-4 top-6 bottom-6 w-4 border-r border-gray-300 flex flex-col justify-between text-[8px] font-bold text-gray-400 py-1 pr-1">
                                            <span>16</span>
                                            <span>12</span>
                                            <span>8</span>
                                            <span>4</span>
                                            <span>0</span>
                                        </div>

                                        {/* Views */}
                                        <div className="flex justify-between pl-8 pr-2">
                                            {[
                                                { label: 'FRONT', rotate: 0 },
                                                { label: 'HALFSIDE', rotate: 15 },
                                                { label: 'SIDE', rotate: 90 },
                                                { label: 'BACK', rotate: 180 }
                                            ].map((view, i) => (
                                                <div key={i} className="flex flex-col items-center">
                                                    <img
                                                        src={`https://api.dicebear.com/9.x/big-smile/svg?seed=Kboo&skinColor=3b82f6&hair=mohawk&backgroundColor=transparent&rotate=${view.rotate}`}
                                                        alt={view.label}
                                                        className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm"
                                                    />
                                                    <span className="mt-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">{view.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: TYPES OF MASCOTS - Testimonials Stack */}
                <section id="categorias" className="py-24 bg-white relative z-10" >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-black text-gray-900 mb-2">Explora Nuestras Categorías</h2>
                            <p className="text-gray-500 font-bold">Encuentra el personaje perfecto para tu necesidad.</p>
                        </div>

                        <div className="flex justify-center py-10">
                            <ColorChangeCards cards={mascotCategories.map(cat => ({
                                heading: cat.title,
                                description: cat.description,
                                imgSrc: cat.image,
                                theme: cat.theme as any,
                                onClick: () => {
                                    // Determine the purpose based on the category title or theme
                                    let purpose = "Otro";
                                    if (cat.title.includes("Escuelas")) purpose = "Escuela / Institución";
                                    else if (cat.title.includes("Deportivos")) purpose = "Equipo Deportivo";
                                    else if (cat.title.includes("Fanáticos")) purpose = "Evento Social"; // Assuming mapping for fans
                                    else if (cat.title.includes("Corporativo")) purpose = "Marca Corporativa";

                                    setFormState(prev => ({ ...prev, purpose }));

                                    // Scroll to quote section
                                    const quoteSection = document.getElementById('cotizar');
                                    if (quoteSection) {
                                        quoteSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }))} />
                        </div>
                    </div>
                </section>

                {/* SECTION 4: QUOTE FORM */}
                <section id="cotizar" className="py-24 bg-gray-50 relative z-10 border-t border-gray-200" >
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl font-black text-gray-900 mb-2">Comienza Tu Proyecto</h2>
                            <p className="text-gray-500 font-bold">Cuéntanos sobre tu idea y hagamos magia juntos.</p>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                            {/* Decorative blob */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                {/* Character Info */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm">1</span>
                                        Sobre el Personaje
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Nombre del Personaje</label>
                                            <input type="text" name="characterName" value={formState.characterName} onChange={handleChange} placeholder="Ej. Astro, Kboo..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Propósito</label>
                                            <select name="purpose" value={formState.purpose} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium text-gray-600" required>
                                                <option value="">Selecciona una opción...</option>
                                                <option value="Escuela / Institución">Escuela / Institución</option>
                                                <option value="Equipo Deportivo">Equipo Deportivo</option>
                                                <option value="Marca Corporativa">Marca Corporativa</option>
                                                <option value="Evento Social">Evento Social</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Describe tu personaje</label>
                                        <textarea name="description" value={formState.description} onChange={handleChange} rows={4} placeholder="Colores, personalidad, rasgos específicos..." className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium resize-none" required></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 block">Imagen de referencia (Opcional)</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer group relative ${selectedFile ? 'border-brand-blue bg-blue-50/50' : 'border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                className="hidden"
                                                accept="image/*"
                                            />

                                            {selectedFile ? (
                                                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                                    <div className="w-12 h-12 bg-white text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                                        <ImageIcon size={24} />
                                                    </div>
                                                    <p className="text-sm text-brand-blue font-bold truncate max-w-[200px]">{selectedFile.name}</p>
                                                    <button
                                                        onClick={clearFile}
                                                        type="button"
                                                        className="absolute top-4 right-4 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                                        <Upload size={20} />
                                                    </div>
                                                    <p className="text-sm text-gray-500 font-medium">Arrastra una imagen o <span className="text-brand-blue underline">haz clic para subir</span></p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-gray-100" />

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm">2</span>
                                        Datos de Contacto
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Nombre Completo</label>
                                            <input type="text" name="fullName" value={formState.fullName} onChange={handleChange} placeholder="Tu nombre completo" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Ciudad</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input type="text" name="city" value={formState.city} onChange={handleChange} placeholder="Tu ciudad" className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Teléfono / WhatsApp</label>
                                            <input type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder="Ej: 442 123 4567" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Correo Electrónico</label>
                                            <input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="correo@ejemplo.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 border focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium" required />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-brand-blue transition-colors flex items-center justify-center gap-2 group">
                                        SOLICITAR COTIZACIÓN
                                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="text-center text-xs text-gray-400 mt-4 font-medium">Recibirás una respuesta en menos de 24 horas.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                < Footer />

            </main>
        </div >
    );
};

export default MascotDesignView;
