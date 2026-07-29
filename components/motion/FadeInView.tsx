"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type FadeInViewProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "none";
    as?: "div" | "section";
};

const FadeInView = ({
    children,
    className,
    delay = 0,
    direction = "up",
    as: Tag = "div",
}: FadeInViewProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [prefersReducedMotion]);

    return (
        <Tag
            ref={ref}
            className={cn(
                prefersReducedMotion
                    ? "opacity-100"
                    : direction === "up"
                      ? "motion-fade-up"
                      : "motion-fade-in",
                isVisible && "motion-visible",
                className
            )}
            style={
                !prefersReducedMotion && delay > 0
                    ? ({ "--motion-delay": `${delay}ms` } as React.CSSProperties)
                    : undefined
            }
        >
            {children}
        </Tag>
    );
};

export default FadeInView;
