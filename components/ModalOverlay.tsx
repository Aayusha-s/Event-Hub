"use client";

import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalOverlayProps = { isOpen: boolean; onClose: () => void; children: ReactNode; ariaLabel: string };

export default function ModalOverlay({ isOpen, onClose, children, ariaLabel }: ModalOverlayProps) {
    useEffect(() => {
        if (!isOpen) return;
        const previousOverflow = document.body.style.overflow;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const previousPaddingRight = document.body.style.paddingRight;
        const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };

        document.body.style.overflow = "hidden";
        if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || typeof document === "undefined") return null;
    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label={ariaLabel} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            {children}
        </div>,
        document.body,
    );
}
