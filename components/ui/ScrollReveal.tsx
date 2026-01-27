"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/utils"; // Assuming utils exists, or use clsx/tailwind-merge directly if not. 
// I will check if @/lib/utils or @/utils/utils exists first? 
// Actually, I'll inline the utils or check commonly used path.
// Package.json has clsx and tailwind-merge. 
// Usually @/lib/utils.ts.

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in";
    delay?: number; // in ms
    duration?: number; // in ms
    threshold?: number; // 0 to 1
}

export function ScrollReveal({
    children,
    className,
    animation = "fade-up",
    delay = 0,
    duration = 700,
    threshold = 0.1
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger once
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const getAnimationClass = () => {
        switch (animation) {
            case "fade-up":
                return "animate-in fade-in slide-in-from-bottom-12";
            case "fade-in":
                return "animate-in fade-in";
            case "slide-left":
                return "animate-in fade-in slide-in-from-right-12"; // Slide IN FROM right = moves left? No.
            // slide-in-from-right moves TO left. 
            case "slide-right":
                return "animate-in fade-in slide-in-from-left-12";
            case "zoom-in":
                return "animate-in fade-in zoom-in-95";
            default:
                return "animate-in fade-in slide-in-from-bottom-12";
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all ease-out",
                isVisible ? getAnimationClass() : "opacity-0",
                className
            )}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
