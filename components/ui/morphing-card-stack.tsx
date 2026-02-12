"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
    id: string
    title: string
    description: string
    icon?: ReactNode
    image?: string
    color?: string
}

export interface MorphingCardStackProps {
    cards?: CardData[]
    className?: string
    defaultLayout?: LayoutMode
    onCardClick?: (card: CardData) => void
}

const layoutIcons = {
    stack: Layers,
    grid: Grid3X3,
    list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function Component({
    cards = [],
    className,
    defaultLayout = "stack",
    onCardClick,
}: MorphingCardStackProps) {
    const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
    const [expandedCard, setExpandedCard] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    if (!cards || cards.length === 0) {
        return null
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info
        const swipe = Math.abs(offset.x) * velocity.x

        if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
            // Swiped left - go to next card
            setActiveIndex((prev) => (prev + 1) % cards.length)
        } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
            // Swiped right - go to previous card
            setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
        }
        setIsDragging(false)
    }

    const getStackOrder = () => {
        const reordered = []
        for (let i = 0; i < cards.length; i++) {
            const index = (activeIndex + i) % cards.length
            reordered.push({ ...cards[index], stackPosition: i })
        }
        return reordered.reverse() // Reverse so top card renders last (on top)
    }

    const getLayoutStyles = (stackPosition: number) => {
        switch (layout) {
            case "stack":
                return {
                    top: stackPosition * 8,
                    left: stackPosition * 8,
                    zIndex: cards.length - stackPosition,
                    rotate: (stackPosition - 1) * 2,
                }
            case "grid":
                return {
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    rotate: 0,
                }
            case "list":
                return {
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    rotate: 0,
                }
        }
    }

    const containerStyles = {
        stack: "relative h-[420px] w-[300px] md:h-[520px] md:w-[400px]",
        grid: "grid grid-cols-1 md:grid-cols-2 gap-3",
        list: "flex flex-col gap-3",
    }

    const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

    return (
        <div className={cn("space-y-4", className)}>
            {/* Layout Toggle */}
            <div className="flex items-center justify-center gap-1 rounded-lg bg-secondary/50 p-1 w-fit mx-auto">
                {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
                    const Icon = layoutIcons[mode]
                    return (
                        <button
                            key={mode}
                            onClick={() => setLayout(mode)}
                            className={cn(
                                "rounded-md p-2 transition-all",
                                layout === mode
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                            )}
                            aria-label={`Switch to ${mode} layout`}
                        >
                            <Icon className="h-4 w-4" />
                        </button>
                    )
                })}
            </div>

            {/* Cards Container */}
            <LayoutGroup>
                <motion.div layout className={cn(containerStyles[layout], "mx-auto")}>
                    <AnimatePresence mode="popLayout">
                        {displayCards.map((card) => {
                            const styles = getLayoutStyles(card.stackPosition)
                            const isExpanded = expandedCard === card.id
                            const isTopCard = layout === "stack" && card.stackPosition === 0

                            return (
                                <motion.div
                                    key={card.id}
                                    layoutId={card.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isExpanded ? 1.05 : 1,
                                        x: 0,
                                        ...styles,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8, x: -200 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 25,
                                    }}
                                    drag={isTopCard ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.7}
                                    onDragStart={() => setIsDragging(true)}
                                    onDragEnd={handleDragEnd}
                                    whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                                    onClick={() => {
                                        if (isDragging) return
                                        setExpandedCard(isExpanded ? null : card.id)
                                        onCardClick?.(card)
                                    }}
                                    className={cn(
                                        "cursor-pointer rounded-xl border border-border bg-card p-4",
                                        "hover:border-primary/50 transition-colors",
                                        layout === "stack" && "absolute w-[300px] h-[400px] md:w-[400px] md:h-[500px]",
                                        layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                                        layout === "grid" && "w-full aspect-auto md:aspect-square",
                                        layout === "list" && "w-full",
                                        isExpanded && "ring-2 ring-primary",
                                    )}
                                    style={{
                                        backgroundColor: card.color || undefined,
                                    }}
                                >
                                    <div className={cn(
                                        "flex gap-3 h-full p-3 md:p-6",
                                        layout === "list" ? "flex-row items-center md:items-start text-left" : "flex-col items-center justify-start text-center"
                                    )}>
                                        {/* Image Section */}
                                        {/* Render image first naturally for stack/grid vertical layout, but manage order for list via flex-direction or order util if needed.
                                            Actually, let's keep it simple. Stack: Image Top, Text Bottom. List: Image Left, Text Right.
                                        */}
                                        {(card.image || card.icon) && (
                                            <div className={cn(
                                                "flex-shrink-0 rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm relative z-20 mx-auto",
                                                layout === "list" ? "w-20 h-20 md:w-32 md:h-32" : "w-full h-40 md:h-64 mb-4"
                                            )}>
                                                {card.image ? (
                                                    <img src={card.image} alt={card.title} className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        {card.icon}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Text Section */}
                                        <div className={cn(
                                            "min-w-0 flex-1 w-full flex flex-col justify-center",
                                            layout === "list" ? "pt-1" : ""
                                        )}>
                                            <h3 className="font-black text-black text-xl md:text-3xl mb-2 leading-tight">{card.title}</h3>
                                            <p
                                                className={cn(
                                                    "text-gray-900 font-semibold leading-relaxed text-sm md:text-lg",
                                                    layout === "stack" && "line-clamp-4",
                                                    layout === "grid" && "line-clamp-3",
                                                    layout === "list" && "line-clamp-2",
                                                )}
                                            >
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>


                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>


        </div>
    )
}
