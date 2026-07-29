"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type ParallaxOffset = {
    x: number;
    y: number;
};

export function useMouseParallax(intensity = 1) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
    const prefersReducedMotion = useReducedMotion();

    const resetOffset = useCallback(() => {
        setOffset({ x: 0, y: 0 });
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * intensity;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * intensity;
            setOffset({ x, y });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", resetOffset);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", resetOffset);
        };
    }, [intensity, prefersReducedMotion, resetOffset]);

    return { containerRef, offset, prefersReducedMotion };
}
