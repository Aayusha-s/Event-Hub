"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const steps = [
    { number: 1, label: "Basics", href: "/create-event/step-1" },
    { number: 2, label: "Details", href: "/create-event/step-2" },
    { number: 3, label: "Tickets", href: "/create-event/step-3" },
    { number: 4, label: "Review", href: "/create-event/step-4" },
];

const CreateEventStepper = () => {
    const pathname = usePathname();
    const activeStepIndex = Math.max(
        0,
        steps.findIndex((step) => pathname === step.href)
    );

    return (
        <div className="mb-6 grid gap-3 sm:grid-cols-4">
            {steps.map((step, index) => {
                const isActive = index === activeStepIndex;
                const isCompleted = index < activeStepIndex;

                return (
                    <Link
                        key={step.href}
                        href={step.href}
                        className={cn(
                            "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200",
                            isActive
                                ? "border-primary bg-primary-light shadow-sm"
                                : "border-border bg-surface hover:bg-surface-hover"
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                                isActive || isCompleted
                                    ? "bg-primary text-white"
                                    : "bg-divider text-text-light"
                            )}
                        >
                            {step.number}
                        </span>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-dark">
                                Step {step.number}
                            </p>
                            <p className="text-sm text-text-light">{step.label}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default CreateEventStepper;
