"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"

interface TextItem {
    text: string;
    image: string;
}

interface CircularRevealHeadingProps {
    items: TextItem[];
    centerText: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}


const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.45em]',
        radius: 160,
        gap: 40,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    },
    md: {
        container: 'h-[400px] w-[400px]',
        fontSize: 'text-base',
        tracking: 'tracking-[0.45em]',
        radius: 160,
        gap: 30,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-lg',
        tracking: 'tracking-[0.45em]',
        radius: 160,
        gap: 20,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-medium'
    }
};

const usePreloadImages = (images: string[]) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url: string): Promise<void> =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
    }, [images]);

    return loaded;
};





const ImagePreloader = ({ images }: { images: string[] }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }: { image: string, size?: 'sm' | 'md' | 'lg' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);
export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}: CircularRevealHeadingProps) => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const config = sizeConfig[size];
    // Simple check for SSR safety, though this component is "use client"
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // On mobile, force a smaller radius/size implicitly by scaling the SVG or container
    const radius = isMobile ? 120 : config.radius;

    // Preload images
    const imagesLoaded = items.length > 0;
    usePreloadImages(items.map(item => item.image));

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                className={cn(
                    "relative rounded-full bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] flex items-center justify-center overflow-hidden aspect-square mx-auto",
                    // Responsive sizing using both w/h, but let aspect-square handle the ratio
                    "w-[300px] md:w-[450px] lg:w-[500px]",
                    className
                )}
            >
                {/* Active Image Overlay */}
                <AnimatePresence>
                    {activeImage && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-4 md:inset-8 rounded-full overflow-hidden z-20 shadow-inner cursor-pointer"
                            onClick={() => setActiveImage(null)}
                        >
                            <img
                                src={activeImage}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                            {/* Tap hint for mobile */}
                            <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs font-medium md:hidden">
                                Toca para cerrar
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Rotating Text Ring */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <path
                            id="curve"
                            fill="none"
                            d="M 200, 200 m -160, 0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0"
                        />
                        {items.map((item, index) => {
                            const totalItems = items.length;
                            const gap = isMobile ? 50 : config.gap;
                            const totalGapDegrees = gap * totalItems;
                            const availableDegrees = 360 - totalGapDegrees;
                            const segmentDegrees = availableDegrees / totalItems;

                            const startPosition = index * (segmentDegrees + gap);
                            const startOffset = `${((index * 100) / totalItems) + (100 / totalItems / 2)}%`;

                            return (
                                <text key={index} className={cn(
                                    isMobile ? 'text-[10px]' : config.fontSize,
                                    "font-black tracking-[0.2em] uppercase select-none fill-slate-800 pointer-events-auto"
                                )}
                                    style={{ textShadow: '0px 1px 2px rgba(255,255,255,0.5)' }}
                                >
                                    <textPath
                                        href="#curve"
                                        startOffset={startOffset}
                                        className="transition-all duration-300 hover:fill-blue-600 cursor-pointer"
                                        onMouseEnter={() => !isMobile && setActiveImage(item.image)}
                                        onMouseLeave={() => !isMobile && setActiveImage(null)}
                                        onClick={() => setActiveImage(item.image)}
                                        textAnchor="middle"
                                    >
                                        {item.text}
                                    </textPath>
                                </text>
                            );
                        })}
                    </svg>
                </motion.div>

                {/* Center Content (Static) */}
                <div className="relative z-40 pointer-events-none">
                    {/* Show center text only if no image is active */}
                    <motion.div
                        animate={{ opacity: activeImage ? 0 : 1, scale: activeImage ? 0.8 : 1 }}
                        className="bg-[#e0e5ec] p-4 md:p-8 rounded-full shadow-[inset_6px_6px_12px_#b8b9be,inset_-6px_-6px_12px_#ffffff]"
                    >
                        {centerText}
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};
