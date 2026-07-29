import { cn } from "@/lib/utils";

type CreateEventStepShellProps = {
    title: string;
    description: string;
    stepLabel: string;
    children: React.ReactNode;
    footer: React.ReactNode;
    className?: string;
};

const CreateEventStepShell = ({
    title,
    description,
    stepLabel,
    children,
    footer,
    className,
}: CreateEventStepShellProps) => {
    return (
        <div className={cn("surface-card overflow-hidden", className)}>
            <div className="border-b border-divider bg-surface px-6 py-5 md:px-8">
                <p className="text-sm font-medium text-primary">{stepLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-dark">
                    {title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-light">
                    {description}
                </p>
            </div>

            <div className="space-y-6 p-6 md:p-8">
                {children}
                <div className="border-t border-divider pt-4">{footer}</div>
            </div>
        </div>
    );
};

export default CreateEventStepShell;
