import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardTheme = "school" | "sports" | "fans" | "corporate" | "fiestas";

interface CardData {
    heading: string;
    description: string;
    imgSrc: string;
    theme?: CardTheme;
    onClick?: () => void;
}

interface ColorChangeCardsProps {
    cards?: CardData[];
}

const themeStyles: Record<CardTheme, {
    ring: string;
    text: string;
    icon: string;
    gradient: string;
}> = {
    school: {
        ring: "hover:ring-cyan-400/50",
        text: "text-cyan-400 md:text-zinc-400 md:group-hover:text-cyan-400",
        icon: "text-cyan-400 md:text-zinc-300 md:group-hover:text-cyan-400",
        gradient: "from-cyan-500/80 via-cyan-500/20 to-cyan-500/10 md:from-cyan-500/0 md:via-cyan-500/0 md:to-cyan-500/10"
    },
    sports: {
        ring: "hover:ring-orange-500/50",
        text: "text-orange-500 md:text-zinc-400 md:group-hover:text-orange-500",
        icon: "text-orange-500 md:text-zinc-300 md:group-hover:text-orange-500",
        gradient: "from-orange-500/80 via-orange-500/20 to-orange-500/10 md:from-orange-500/0 md:via-orange-500/0 md:to-orange-500/10"
    },
    fans: {
        ring: "hover:ring-purple-500/50",
        text: "text-purple-400 md:text-zinc-400 md:group-hover:text-purple-400",
        icon: "text-purple-400 md:text-zinc-300 md:group-hover:text-purple-400",
        gradient: "from-purple-500/80 via-purple-500/20 to-purple-500/10 md:from-purple-500/0 md:via-purple-500/0 md:to-purple-500/10"
    },
    corporate: {
        ring: "hover:ring-amber-400/50",
        text: "text-amber-400 md:text-zinc-400 md:group-hover:text-amber-400",
        icon: "text-amber-400 md:text-zinc-300 md:group-hover:text-amber-400",
        gradient: "from-amber-500/80 via-amber-500/20 to-amber-500/10 md:from-amber-500/0 md:via-amber-500/0 md:to-amber-500/10"
    },
    fiestas: {
        ring: "hover:ring-pink-400/50",
        text: "text-pink-400 md:text-zinc-400 md:group-hover:text-pink-400",
        icon: "text-pink-400 md:text-zinc-300 md:group-hover:text-pink-400",
        gradient: "from-pink-500/80 via-pink-500/20 to-pink-500/10 md:from-pink-500/0 md:via-pink-500/0 md:to-pink-500/10"
    },
};

const ColorChangeCards = ({ cards }: ColorChangeCardsProps) => {
    // Default demo data if no cards provided
    const displayCards = cards || [
        {
            heading: "Plan",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem.",
            imgSrc: "https://images.pexels.com/photos/176342/pexels-photo-176342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            theme: "school" as CardTheme
        },
        {
            heading: "Play",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem.",
            imgSrc: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            theme: "sports" as CardTheme
        },
        {
            heading: "Connect",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem.",
            imgSrc: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            theme: "fans" as CardTheme
        },
        {
            heading: "Support",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem.",
            imgSrc: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            theme: "corporate" as CardTheme
        }
    ];

    return (
        <div className="p-4 py-12 md:p-8">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {displayCards.map((card, index) => (
                    <Card
                        key={index}
                        heading={card.heading}
                        description={card.description}
                        imgSrc={card.imgSrc}
                        theme={card.theme || 'school'}
                        onClick={card.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

// --- Card Component ---
interface CardProps {
    heading: string;
    description: string;
    imgSrc: string;
    theme: CardTheme;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ heading, description, imgSrc, theme, onClick }) => {
    const styles = themeStyles[theme] || themeStyles.school;

    return (
        <motion.div
            onClick={onClick}
            transition={{ staggerChildren: 0.035 }}
            whileHover="hover"
            className={cn(
                "group relative h-80 w-full cursor-pointer overflow-hidden rounded-3xl bg-white",
                "border border-zinc-100 shadow-sm transition-all duration-500",
                "hover:shadow-xl hover:-translate-y-1 hover:ring-1",
                styles.ring
            )}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 saturate-100 md:saturate-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:saturate-100"
                style={{
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className={cn("absolute inset-0 bg-gradient-to-t opacity-100 md:opacity-0 transition-opacity duration-500 group-hover:opacity-100", styles.gradient)} />
                {/* Mobile overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 md:bg-transparent transition-colors duration-500 group-hover:bg-black/10 md:group-hover:bg-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 flex h-full flex-col justify-between p-6">
                <ArrowRight className={cn(
                    "ml-auto text-3xl transition-all duration-500 -rotate-45 md:rotate-0 md:group-hover:-rotate-45",
                    styles.icon
                )} />

                <div className="translate-y-0 md:translate-y-2 transition-transform duration-500 md:group-hover:translate-y-0">
                    <h4 className="flex flex-wrap transition-colors duration-500 drop-shadow-sm">
                        {heading.split("").map((letter, index) => (
                            <AnimatedLetter letter={letter} key={index} themeStyle={styles.text} />
                        ))}
                    </h4>
                    <p className="mt-3 text-sm font-bold text-white/90 md:text-black opacity-100 md:opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// --- AnimatedLetter Helper Component ---
interface AnimatedLetterProps {
    letter: string;
    themeStyle: string;
}

const letterVariants: Variants = {
    hover: {
        y: "-30%",
    },
};

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({ letter, themeStyle }) => {
    return (
        <div className="inline-block h-[36px] overflow-hidden font-black text-2xl sm:text-3xl font-heading">
            <motion.span
                className={cn("flex min-w-[4px] flex-col", themeStyle)}
                style={{ y: "0%" }}
                variants={letterVariants}
                transition={{ duration: 0.4, ease: "backOut" }}
            >
                <span>{letter}</span>
                <span>{letter}</span>
            </motion.span>
        </div>
    );
};

export default ColorChangeCards;
