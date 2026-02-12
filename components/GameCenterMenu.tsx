
import React, { useState, useEffect } from 'react';
import { Trophy, ArrowRight, Play } from 'lucide-react';
import LlamaRunGame from './LlamaRunGame';
import FlappyLlamaGame from './FlappyLlamaGame';
import { PatternText } from './ui/pattern-text';

interface GameCenterMenuProps {
    onClose?: () => void;
}

type GameType = 'MENU' | 'LLAMA_RUN' | 'FLAPPY';

const GameCenterMenu: React.FC<GameCenterMenuProps> = ({ onClose }) => {
    const [activeGame, setActiveGame] = useState<GameType>('MENU');

    useEffect(() => {
        if (activeGame === 'MENU') {
            window.scrollTo(0, 0);
        }
    }, [activeGame]);

    if (activeGame === 'LLAMA_RUN') {
        return <LlamaRunGame onClose={() => setActiveGame('MENU')} />;
    }

    if (activeGame === 'FLAPPY') {
        return <FlappyLlamaGame onClose={() => setActiveGame('MENU')} />;
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden relative touch-manipulation">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0"></div>
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-brand-purple/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[0%] left-[0%] w-[40%] h-[40%] bg-brand-blue/10 blur-[100px] rounded-full"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-20 flex flex-col min-h-screen">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 text-center md:text-left">
                        <div className="relative w-24 h-24 md:w-36 md:h-36 md:-ml-4 transition-transform hover:scale-110 duration-500">
                            <img
                                src="/images/logo_gamecenter.PNG"
                                alt="Game Center Logo"
                                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                            />
                        </div>
                        <div>
                            <PatternText
                                text="GAME CENTER"
                                className="text-4xl md:text-5xl lg:text-7xl !text-white"
                            />
                            <p className="text-blue-400 font-bold tracking-widest text-xs uppercase mt-2 md:mt-1">FiveColors Arcade Experience</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                    >
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">Volver al sitio</span>
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                            <ArrowRight size={14} className="text-gray-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </div>
                    </button>
                </header>

                {/* Game Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch pb-10">

                    {/* Llama Run Card */}
                    <div
                        className="group relative bg-gray-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-brand-blue/50 active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2 cursor-pointer flex flex-col select-none touch-manipulation"
                        onClick={() => setActiveGame('LLAMA_RUN')}
                    >
                        {/* Image/Preview Area */}
                        <div className="h-48 relative overflow-hidden bg-gray-900">
                            <img
                                src="/images/llama-run-start-screen.png"
                                alt="Llama Run"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                            <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg z-10">
                                Popular
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-brand-blue transition-colors">Llama Run</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                La aventura épica de correr sin fin. Esquiva obstáculos, recoge monedas y desbloquea personajes increíbles.
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-[10px] text-white font-bold">AL</div>
                                        <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-[10px] text-white font-bold">+2k</div>
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">Jugando ahora</span>
                                </div>

                                <button className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-brand-blue/40 transition-all duration-300">
                                    <Play size={20} className="text-white fill-current ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="group relative bg-gray-800/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-brand-pink/50 active:scale-[0.98] transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] hover:-translate-y-2 cursor-pointer flex flex-col select-none touch-manipulation"
                        onClick={() => {
                            console.log("Clicked FLAPPY card");
                            setActiveGame('FLAPPY');
                        }}
                    >
                        {/* Image/Preview Area */}
                        <div className="h-48 relative overflow-hidden bg-gray-900">
                            <img
                                src="/images/flappy-llama-game-cover.png"
                                alt="Flappy Llama"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                            <div className="absolute top-4 right-4 bg-brand-pink text-white text-xs font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg z-10">
                                Nuevo
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-brand-pink transition-colors">Flappy Llama</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                ¿Qué tan lejos puedes llegar? Toca para volar y evita las tuberías en este desafío adictivo.
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Trophy size={16} className="text-brand-yellow" />
                                    <span className="text-xs font-medium">Top Score: <span className="text-white font-bold">124</span></span>
                                </div>

                                <button className="w-12 h-12 rounded-full bg-brand-pink flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-brand-pink/40 transition-all duration-300">
                                    <Play size={20} className="text-white fill-current ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-auto pt-8 md:pt-16 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-white/5 gap-4 md:gap-0 pb-8 md:pb-0">
                    <p className="font-medium text-center md:text-left">© 2026 FiveColors Game Center.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors p-2">Soporte</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GameCenterMenu;
