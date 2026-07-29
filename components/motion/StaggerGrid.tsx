"use client";

import { Children, cloneElement, isValidElement } from "react";
import FadeInView from "./FadeInView";
import { cn } from "@/lib/utils";

type StaggerGridProps = {
    children: React.ReactNode;
    className?: string;
    staggerMs?: number;
    baseDelay?: number;
};

const StaggerGrid = ({
    children,
    className,
    staggerMs = 80,
    baseDelay = 0,
}: StaggerGridProps) => {
    return (
        <div className={cn(className)}>
            {Children.map(children, (child, index) => {
                if (!isValidElement(child)) return child;

                return (
                    <FadeInView key={child.key ?? index} delay={baseDelay + index * staggerMs}>
                        {child}
                    </FadeInView>
                );
            })}
        </div>
    );
};

export default StaggerGrid;
