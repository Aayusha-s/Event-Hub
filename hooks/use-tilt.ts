"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type TiltStyle = {
    transform: string;
    transition: string;
};

export function useTilt(maxTilt = 4) {
    const cardRef = useRef<HTMLElement>(null);
    const [tilt, setTilt] = useState<TiltStyle>({
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    });
    const prefersReducedMotion = useReducedMotion();

    const resetTilt = useCallback(() => {
        setTilt({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        });
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            setTilt({
                transform: `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(1.01)`,
                transition: "transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", resetTilt);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", resetTilt);
        };
    }, [maxTilt, prefersReducedMotion, resetTilt]);

    return { cardRef, tilt, prefersReducedMotion };
}
