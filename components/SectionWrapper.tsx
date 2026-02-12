import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SectionWrapperProps {
    id?: string;
    pillText: string;
    pillColor?: string; // Optional custom color class for the pill
    bgColor?: string; // Arbitrary color value or class
    children: React.ReactNode;
    className?: string; // Additional classes for the section
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
    id,
    pillText,
    pillColor = 'bg-brand-pink',
    bgColor = 'bg-white',
    children,
    className
}) => {
    return (
        <section
            id={id}
            className={cn(
                "py-20 md:py-28 relative overflow-hidden w-full",
                bgColor,
                className
            )}
        >
            <div className="relative z-10 w-full">
                {/* Pill Label */}
                <div className="flex justify-center mb-12">
                    <span
                        className={cn(
                            "inline-block text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider",
                            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900",
                            "transform -rotate-2 hover:rotate-0 transition-transform cursor-default",
                            pillColor
                        )}
                    >
                        {pillText}
                    </span>
                </div>

                {/* Content */}
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;
