"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CharacterCard {
    id: number
    name: string
    category: string
    image: string
    tags: string[]
    year?: string
}

interface StackedCharacterCardsProps {
    characters: CharacterCard[]
}

export function StackedCharacterCards({ characters }: StackedCharacterCardsProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const nextCard = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % characters.length)
    }, [characters.length])

    const prevCard = () => {
        setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length)
    }

    // Auto-play carousel effect
    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            nextCard()
        }, 3000) // Change card every 3 seconds

        return () => clearInterval(interval)
    }, [isPaused, nextCard])



    const getCardStyle = (index: number) => {
        const position = (index - currentIndex + characters.length) % characters.length

        if (position === 0) {
            // Center card
            return {
                x: 0,
                y: 0,
                scale: 1,
                rotateY: 0,
                zIndex: 50,
                opacity: 1,
            }
        } else if (position === 1) {
            // Right card
            return {
                x: 280,
                y: 20,
                scale: 0.85,
                rotateY: -25,
                zIndex: 40,
                opacity: 0.7,
            }
        } else if (position === characters.length - 1) {
            // Left card
            return {
                x: -280,
                y: 20,
                scale: 0.85,
                rotateY: 25,
                zIndex: 40,
                opacity: 0.7,
            }
        } else if (position === 2) {
            // Far right card
            return {
                x: 400,
                y: 40,
                scale: 0.7,
                rotateY: -35,
                zIndex: 30,
                opacity: 0.4,
            }
        } else if (position === characters.length - 2) {
            // Far left card
            return {
                x: -400,
                y: 40,
                scale: 0.7,
                rotateY: 35,
                zIndex: 30,
                opacity: 0.4,
            }
        } else {
            // Hidden cards
            return {
                x: position > characters.length / 2 ? -500 : 500,
                y: 60,
                scale: 0.6,
                rotateY: position > characters.length / 2 ? 45 : -45,
                zIndex: 20,
                opacity: 0,
            }
        }
    }

    return (
        <div
            className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-white py-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue rounded-full blur-[120px]" />
            </div>

            {/* Cards container */}
            <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: "2000px" }}
            >
                {characters.map((character, index) => {
                    const style = getCardStyle(index)
                    const isCenter = (index - currentIndex + characters.length) % characters.length === 0

                    return (
                        <motion.div
                            key={character.id}
                            className="absolute cursor-grab active:cursor-grabbing"
                            initial={false}
                            animate={style}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                            // Drag and swipe functionality
                            drag={isCenter ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = Math.abs(offset.x) * velocity.x

                                if (swipe > 500) {
                                    // Swiped right - go to previous
                                    prevCard()
                                } else if (swipe < -500) {
                                    // Swiped left - go to next
                                    nextCard()
                                }
                            }}
                            whileTap={isCenter ? { scale: 0.95 } : {}}
                        >
                            <div
                                className="relative rounded-3xl shadow-2xl overflow-hidden"
                                style={{
                                    width: "320px",
                                    height: "480px",
                                }}
                            >
                                {/* Character image - full card */}
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="w-full h-full object-cover pointer-events-none select-none"
                                    draggable={false}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={prevCard}
                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-[60] bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-2 border-gray-900"
                aria-label="Anterior"
            >
                <ChevronLeft size={32} strokeWidth={3} />
            </button>
            <button
                onClick={nextCard}
                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[60] bg-gray-900 text-white p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-2 border-gray-900"
                aria-label="Siguiente"
            >
                <ChevronRight size={32} strokeWidth={3} />
            </button>

            {/* Indicator dots */}
            <div className="hidden absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-[60]">
                {characters.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                            ? "bg-gray-900 w-8"
                            : "bg-gray-400 hover:bg-gray-600"
                            }`}
                        aria-label={`Ir a tarjeta ${index + 1}`}
                    />
                ))}
            </div>

            {/* Counter */}
            <div className="hidden absolute top-8 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-6 py-2 rounded-full z-[60]">
                <span className="text-white font-black text-lg">
                    {currentIndex + 1} / {characters.length}
                </span>
            </div>
        </div>
    )
}
