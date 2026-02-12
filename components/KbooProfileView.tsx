
import React from 'react';
import { ArrowLeft, Zap, Star, Shield, Award } from 'lucide-react';

interface KbooProfileProps {
    onBack?: () => void;
}

const KbooProfileView: React.FC<KbooProfileProps> = ({ onBack }) => {
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onBack) onBack();
        else window.location.href = '/?page=mascots';
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 md:p-8 flex items-center justify-center overflow-auto">

            {/* Back Button */}
            <button
                onClick={handleBack}
                className="fixed top-6 left-6 z-50 bg-white p-3 rounded-full shadow-lg border-2 border-gray-900 hover:bg-brand-yellow transition-colors group"
            >
                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Main "Product Card" Container */}
            <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden relative border border-gray-200">

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
                        <div className="mb-10 text-gray-500 text-xs md:text-sm font-medium leading-relaxed space-y-4 text-justify">
                            <p>
                                En FiveColors transformamos ideas en personajes que conectan, emocionan y venden. Cada botarga se diseña de manera personalizada, cuidando forma, colores y acabados, y utilizando materiales de alta calidad que garantizan durabilidad, comodidad y un gran impacto visual.
                            </p>
                            <p>
                                Nuestros productos son fabricados con mano de obra 100% mexicana, combinando creatividad, experiencia y procesos profesionales. Seleccionamos estratégicamente los materiales según el tipo de botarga y su uso —eventos infantiles, activaciones de marca, shows o renta— para lograr presencia escénica, movilidad y una experiencia memorable para el público.
                            </p>
                            <p>
                                En FiveColors no solo fabricamos botargas: creamos experiencias que dejan huella. Te acompañamos desde el concepto y diseño del personaje hasta la selección de materiales ideales, asegurando que tu proyecto destaque, genere conexión emocional y se convierta en una poderosa herramienta de comunicación y posicionamiento de marca.
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
    );
};

export default KbooProfileView;
