"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn(
            // Shape & Background
            "rounded-3xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-md",
            // Border
            "border border-slate-200/60 dark:border-white/10",
            // Shadow - soft and elevated
            "shadow-[0_20px_60px_rgba(15,23,42,0.08)]",
            // Transitions
            "transition-all duration-300 ease-out",
            // Hover state
            "hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]",
            // Open state
            "data-[state=open]:bg-slate-50/60 dark:data-[state=open]:bg-white/10",
            className
        )}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                // Layout & Spacing
                "flex flex-1 items-center justify-between text-left",
                "p-6 md:p-8",
                // Typography
                "font-body leading-relaxed",
                // Background
                "bg-transparent",
                // Transitions
                "transition-all duration-300 ease-out",
                // Hover
                "hover:bg-slate-50/40 dark:hover:bg-white/5",
                // Focus
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white",
                // Open state - add divider
                "[&[data-state=open]]:border-b [&[data-state=open]]:border-slate-200/60 dark:[&[data-state=open]]:border-white/10",
                // Chevron rotation
                "[&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-600 dark:text-slate-300 transition-transform duration-300" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden bg-transparent text-sm text-slate-600 dark:text-slate-300 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("p-6 md:p-8 pt-6 space-y-6 leading-relaxed", className)}>
            {children}
        </div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
