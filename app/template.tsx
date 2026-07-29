"use client";

import { cn } from "@/lib/utils";

export default function Template({ children }: { children: React.ReactNode }) {
    return <div className={cn("motion-page-enter")}>{children}</div>;
}
