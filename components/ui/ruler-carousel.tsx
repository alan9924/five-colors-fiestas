"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BenefitItem {
    id: number;
    title: string;
    description: string;
}

// Create infinite items by triplicating the array
const createInfiniteItems = (originalItems: BenefitItem[]) => {
    const items = [];
    for (let i = 0; i < 3; i++) {
        originalItems.forEach((item, index) => {
            items.push({
                ...item,
                id: `${i}-${item.id}`,
                originalIndex: index,
            });
        });
    }
    return items;
};

const RulerLines = ({
    top = true,
    totalLines = 100,
}: {
    top?: boolean;
    totalLines?: number;
}) => {
    const lines = [];
    const lineSpacing = 100 / (totalLines - 1);

    for (let i = 0; i < totalLines; i++) {
        const isFifth = i % 5 === 0;
        const isCenter = i === Math.floor(totalLines / 2);

        let height = "h-3";
        let color = "bg-gray-500 dark:bg-gray-400";

        if (isCenter) {
            height = "h-8";
            color = "bg-white dark:bg-white";
        } else if (isFifth) {
            height = "h-4";
            color = "bg-white dark:bg-white";
        }

        const positionClass = top ? "" : "bottom-0";

        lines.push(
            <div
                key={i}
                className={`absolute w-0.5 ${height} ${color} ${positionClass}`}
                style={{ left: `${i * lineSpacing}%` }}
            />
        );
    }

    return <div className="relative w-full h-8 px-4">{lines}</div>;
};

interface RulerCarouselProps {
    items: BenefitItem[];
    activeIndex?: number;
    onActiveChange?: (index: number) => void;
}

export function RulerCarousel({
    items,
    activeIndex: controlledActiveIndex,
    onActiveChange,
}: RulerCarouselProps) {
    const infiniteItems = createInfiniteItems(items);
    const itemsPerSet = items.length;

    // Internal state for uncontrolled mode
    const [internalActiveIndex, setInternalActiveIndex] = useState(itemsPerSet + 0);
    const [isResetting, setIsResetting] = useState(false);
    const previousIndexRef = useRef(itemsPerSet + 0);

    // Determine if we're in controlled mode
    const isControlled = controlledActiveIndex !== undefined && onActiveChange !== undefined;
    const activeIndex = isControlled ? controlledActiveIndex + itemsPerSet : internalActiveIndex;

    const handleItemClick = (newIndex: number) => {
        if (isResetting) return;

        // Find the original item index (0-7)
        const targetOriginalIndex = newIndex % itemsPerSet;

        // Find all instances of this item across the 3 copies
        const possibleIndices = [
            targetOriginalIndex, // First copy
            targetOriginalIndex + itemsPerSet, // Second copy
            targetOriginalIndex + itemsPerSet * 2, // Third copy
        ];

        // Find the closest index to current position
        let closestIndex = possibleIndices[0];
        let smallestDistance = Math.abs(possibleIndices[0] - activeIndex);

        for (const index of possibleIndices) {
            const distance = Math.abs(index - activeIndex);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestIndex = index;
            }
        }

        previousIndexRef.current = activeIndex;

        if (isControlled) {
            // In controlled mode, notify parent with original index
            onActiveChange(targetOriginalIndex);
        } else {
            setInternalActiveIndex(closestIndex);
        }
    };

    const handlePrevious = () => {
        if (isResetting) return;
        if (isControlled) {
            const newOriginalIndex = (controlledActiveIndex - 1 + itemsPerSet) % itemsPerSet;
            onActiveChange(newOriginalIndex);
        } else {
            setInternalActiveIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (isResetting) return;
        if (isControlled) {
            const newOriginalIndex = (controlledActiveIndex + 1) % itemsPerSet;
            onActiveChange(newOriginalIndex);
        } else {
            setInternalActiveIndex((prev) => prev + 1);
        }
    };

    // Handle infinite scrolling (only in uncontrolled mode)
    useEffect(() => {
        if (isControlled || isResetting) return;

        // If we're in the first set, jump to the equivalent position in the middle set
        if (internalActiveIndex < itemsPerSet) {
            setIsResetting(true);
            setTimeout(() => {
                setInternalActiveIndex(internalActiveIndex + itemsPerSet);
                setIsResetting(false);
            }, 0);
        }
        // If we're in the last set, jump to the equivalent position in the middle set
        else if (internalActiveIndex >= itemsPerSet * 2) {
            setIsResetting(true);
            setTimeout(() => {
                setInternalActiveIndex(internalActiveIndex - itemsPerSet);
                setIsResetting(false);
            }, 0);
        }
    }, [internalActiveIndex, itemsPerSet, isResetting, isControlled]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isResetting) return;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                handlePrevious();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isResetting, isControlled, controlledActiveIndex]);

    // Configuration constants
    // Increased width fitting text perfectly: 500px.
    const ITEM_WIDTH = 500;
    const GAP = 50;
    const TOTAL_STEP = ITEM_WIDTH + GAP;

    // We want the active item to be centered.
    // The container is centered on screen.
    // We start rendering items from left to right inside the motion div.
    // If we shift the motion div by -activeIndex * TOTAL_STEP, the active item moves to the START (left) of the container.
    // To center it, we need to shift it back left by half its width (since the container is at center screen).

    // Calculation:
    // Screen Center = 0 (relative to our centered anchor)
    // Item Center relative to Item Left Edge = ITEM_WIDTH / 2
    // Item Left Edge relative to Motion Div Start = activeIndex * TOTAL_STEP

    // We want: Motion Div Start + (activeIndex * TOTAL_STEP) + (ITEM_WIDTH / 2) = 0
    // Motion Div Start = - (activeIndex * TOTAL_STEP) - (ITEM_WIDTH / 2)

    const currentTargetX = -activeIndex * TOTAL_STEP;

    const currentPage = (activeIndex % itemsPerSet) + 1;
    const totalPages = itemsPerSet;

    return (
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full h-[180px] md:h-[220px] flex flex-col justify-center relative">
                <div className="flex items-center justify-center">
                    <RulerLines top />
                </div>

                {/* Main carousel container - Absolute centered */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Zero width container ensures our transform origin is exactly center screen */}
                    <div className="w-0 flex items-center justify-start overflow-visible">
                        <motion.div
                            className="flex items-center"
                            style={{
                                gap: `${GAP}px`,
                                // Shift left by half an item width to center the first item initially
                                marginLeft: `-${ITEM_WIDTH / 2}px`
                            }}
                            animate={{
                                x: currentTargetX,
                            }}
                            transition={
                                isResetting
                                    ? { duration: 0 }
                                    : {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 30,
                                        mass: 1,
                                    }
                            }
                        >
                            {infiniteItems.map((item, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => handleItemClick(index)}
                                        className={`text-2xl md:text-5xl font-bold whitespace-nowrap cursor-pointer flex items-center justify-center focus:outline-none transition-all duration-300 pointer-events-auto ${isActive
                                            ? "text-white opacity-100 scale-100 blur-0"
                                            : "text-white/30 hover:text-white/50 opacity-40 scale-75 blur-[1px]"
                                            }`}
                                        style={{
                                            width: `${ITEM_WIDTH}px`,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.title}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                <div className="flex items-center justify-center mt-auto">
                    <RulerLines top={false} />
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={isResetting}
                    className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50"
                    aria-label="Beneficio anterior"
                >
                    <ChevronLeft className="w-6 h-6 text-white/80" />
                </button>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white/60">
                        {currentPage}
                    </span>
                    <span className="text-sm text-white/40">/</span>
                    <span className="text-sm font-medium text-white/60">
                        {totalPages}
                    </span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={isResetting}
                    className="flex items-center justify-center cursor-pointer p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50"
                    aria-label="Siguiente beneficio"
                >
                    <ChevronRight className="w-6 h-6 text-white/80" />
                </button>
            </div>
        </div>
    );
}
