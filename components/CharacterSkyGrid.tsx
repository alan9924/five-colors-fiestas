
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, Cloud } from 'lucide-react';

const characters = [
    "La Granja de Zenón", "Mickey y Minnie", "Bely y Beto", "Luli Pampín", "Encanto",
    "Paw Patrol", "Masha y El Oso", "Peppa Pig", "PJ Masks", "Ladybug",
    "Gallinita Pintadita", "Plim Plim", "Cocomelon", "Coco", "My Little Pony",
    "Toy Story", "Mario Bros", "Sonic", "Among Us", "Tinkerbell",
    "Pica Pica", "Mis Pastelitos", "Frozen", "Moana y Maui", "Bella y Bestia",
    "Cenicienta", "Blanca Nieves", "La Sirenita Ariel", "Rapunzel", "Raya y el Último Dragón",
    "The Avengers", "Capitán América", "Hulk", "Spiderman", "Iron Man",
    "Batman", "Santa Claus", "Reyes Magos", "Cars", "Lara Campos",
    "K-Pop Demon Hunters", "El Extraño Mundo de Jack"
];

// Gummy colors: Bright, saturated, slightly warm
const gummyColors = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-green-400',
    'bg-blue-400',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-400'
];

interface CharacterCardProps {
    char: string;
    index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ char, index }) => {
    const colorClass = gummyColors[index % gummyColors.length];

    // Random slight rotation for "floating" feel
    const randomRotate = Math.random() * 6 - 3;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{
                scale: 1.1,
                rotate: randomRotate * 2,
                zIndex: 10,
                transition: { type: "spring", stiffness: 300 }
            }}
            className={`
        relative 
        group cursor-pointer
        h-40 md:h-48 w-full
        rounded-[32px] 
        ${colorClass}
        flex flex-col items-center justify-center text-center
        shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3),inset_0_-10px_20px_rgba(0,0,0,0.1),inset_0_10px_20px_rgba(255,255,255,0.4)]
        border-4 border-white/20
        backdrop-blur-sm
      `}
        >
            {/* Glossy Highlight (Plastic Look) */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/40 blur-sm"></div>
            <div className="absolute top-2 left-2 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-[28px] pointer-events-none"></div>

            {/* Content */}
            <div className="z-10 relative px-4">
                <p className="text-white/80 font-black text-[10px] md:text-xs tracking-widest uppercase mb-1 drop-shadow-md">Show Infantil</p>
                <h3 className="text-white font-black text-xl md:text-2xl leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
                    {char}
                </h3>

                <div className="mt-3 bg-white/90 text-[10px] md:text-xs font-black text-gray-900 px-3 py-1 rounded-full shadow-lg inline-block transform group-hover:scale-110 transition-transform">
                    DISPONIBLE
                </div>
            </div>

            {/* 3D Texture/Detail */}
            <div className="absolute bottom-3 right-3 opacity-20 transform rotate-12">
                <Star fill="white" size={24} />
            </div>
        </motion.div>
    );
};

const CharacterSkyGrid: React.FC = () => {
    return (
        <div className="min-h-screen bg-sky-300 relative overflow-x-hidden font-body">

            {/* Animated Sky Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-b from-sky-300 to-blue-200"></div>
                {/* CSS Clouds */}
                <div className="absolute top-20 left-[10%] opacity-60 animate-pulse delay-700">
                    <Cloud size={120} fill="white" className="text-white blur-xl" />
                </div>
                <div className="absolute top-40 right-[15%] opacity-40 animate-pulse duration-[10000ms]">
                    <Cloud size={180} fill="white" className="text-white blur-xl" />
                </div>
                <div className="absolute bottom-32 left-[20%] opacity-50">
                    <Cloud size={90} fill="white" className="text-white blur-lg" />
                </div>
                <div className="absolute top-1/2 left-1/2 opacity-30 blur-2xl transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay"></div>
                </div>
            </div>

            {/* Header */}
            <div className="relative z-10 pt-20 pb-12 text-center px-4">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="inline-block"
                >
                    <span className="bg-white/30 backdrop-blur-md border border-white/50 text-white px-6 py-2 rounded-full text-sm font-black tracking-[0.2em] shadow-lg mb-6 block w-max mx-auto">
                        NUESTROS PERSONAJES
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_10px_20px_rgba(0,0,50,0.2)] font-display tracking-tight">
                        Elige tu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-400 drop-shadow-none" style={{ textShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
                            Favorito
                        </span>
                    </h1>
                    <p className="text-white text-xl md:text-2xl font-bold mt-6 opacity-90 drop-shadow-sm max-w-2xl mx-auto">
                        ¡Explora nuestra colección de shows mágicos listos para tu fiesta!
                    </p>
                </motion.div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-32 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {characters.map((char, index) => (
                        <CharacterCard key={index} char={char} index={index} />
                    ))}
                </div>
            </div>

            {/* Floating Sparkles Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/40"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        <Sparkles size={10 + Math.random() * 20} />
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default CharacterSkyGrid;
