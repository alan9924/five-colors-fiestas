import React from 'react';
import { Star } from 'lucide-react';

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

const cardStyles = [
    { bg: 'bg-brand-yellow', text: 'text-gray-900', badge: 'bg-white text-brand-orange', sub: 'text-gray-800' },
    { bg: 'bg-brand-blue', text: 'text-white', badge: 'bg-white text-brand-blue', sub: 'text-blue-100' },
    { bg: 'bg-brand-green', text: 'text-white', badge: 'bg-white text-brand-green', sub: 'text-green-100' },
    { bg: 'bg-brand-pink', text: 'text-white', badge: 'bg-white text-brand-pink', sub: 'text-pink-100' },
    { bg: 'bg-brand-purple', text: 'text-white', badge: 'bg-white text-brand-purple', sub: 'text-purple-100' },
];

interface CharacterCardProps {
    char: string;
    index: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ char, index }) => {
    const style = cardStyles[index % cardStyles.length];
    return (
        <div
            className={`${style.bg} rounded-[2rem] p-6 relative overflow-hidden h-40 md:h-48 w-64 md:w-72 flex-shrink-0 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] border-2 border-gray-900 mx-3 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] cursor-pointer group`}
        >
            {/* Content */}
            <div className="z-10 w-full flex flex-col items-center">
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${style.sub}`}>Show Infantil</p>
                <h3 className={`text-lg md:text-xl font-black leading-tight mb-3 ${style.text} line-clamp-2 px-2`}>
                    {char}
                </h3>
                <span className={`${style.badge} px-3 py-1 rounded-full text-[9px] md:text-xs font-black uppercase tracking-wide shadow-sm`}>
                    Disponible
                </span>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute top-2 left-2 opacity-10">
                <Star size={24} fill="currentColor" className={style.text} />
            </div>
            <div className="absolute bottom-2 right-2 opacity-10">
                <Star size={32} fill="currentColor" className={style.text} />
            </div>
        </div>
    );
};

const ShowsMarquee: React.FC = () => {
    const halfPoint = Math.ceil(characters.length / 2);
    const row1Chars = characters.slice(0, halfPoint);
    const row2Chars = characters.slice(halfPoint);

    const marqueeRow1 = [...row1Chars, ...row1Chars];
    const marqueeRow2 = [...row2Chars, ...row2Chars];

    return (
        <div className="w-full overflow-hidden py-10">
            {/* Marquee Row 1 (Left) */}
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] mb-8">
                {marqueeRow1.map((char, i) => (
                    <CharacterCard key={`r1-${i}`} char={char} index={i} />
                ))}
            </div>

            {/* Marquee Row 2 (Right) */}
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
                {marqueeRow2.map((char, i) => (
                    <CharacterCard key={`r2-${i}`} char={char} index={i + row1Chars.length} />
                ))}
            </div>
        </div>
    );
};

export default ShowsMarquee;
