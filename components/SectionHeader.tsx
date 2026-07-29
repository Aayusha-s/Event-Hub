import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    title: React.ReactNode;
    description?: string;
    align?: "left" | "center";
    className?: string;
    accent?: boolean;
};

const SectionHeader = ({
    title,
    description,
    align = "left",
    className,
    accent = false,
}: SectionHeaderProps) => {
    return (
        <div
            className={cn(
                "mb-8 md:mb-10",
                align === "center" && "text-center",
                className
            )}
        >
            <h2
                className={cn(
                    "text-3xl font-semibold tracking-tight text-text-dark sm:text-4xl",
                    accent && "text-primary"
                )}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={cn(
                        "mt-3 max-w-2xl text-base leading-relaxed text-text-light",
                        align === "center" && "mx-auto"
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
