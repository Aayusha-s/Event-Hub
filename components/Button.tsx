import { cn } from "@/lib/utils";

type ButtonProps = {
    text?: string | number;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    variant?: "cta" | "tag" | "secondary";
    size?: "vsm" | "sm" | "md" | "lg";
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
    status?: "danger" | "success" | "warning";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

const Button = ({
    text,
    iconLeft,
    iconRight,
    variant = "cta",
    size = "md",
    onClick,
    isActive,
    status,
    className,
    disabled,
    type = "button",
}: ButtonProps) => {
    const baseStyles =
        "group inline-flex items-center justify-center font-medium transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        cta: cn(
            "rounded-xl border shadow-sm",
            isActive
                ? "border-[#BF5A3F] bg-[#BF5A3F] text-white"
                : "border-[#E07A5F] bg-[#E07A5F] text-white hover:-translate-y-px hover:border-[#D66A4B] hover:bg-[#D66A4B] hover:shadow-md active:translate-y-0 active:bg-[#BF5A3F]"
        ),
        tag: "rounded-full border border-[#E8E8E8] bg-white text-text-dark hover:-translate-y-px hover:border-[#E07A5F]/40 hover:bg-[#FDF1EC] hover:shadow-sm active:scale-[0.98]",
        secondary:
            "border-none bg-transparent text-[#E07A5F] hover:bg-[#FDF1EC] hover:text-[#D66A4B] shadow-none active:scale-[0.98]",
    };

    const sizes = {
        cta: {
            vsm: "h-8 px-3 text-xs",
            sm: "h-10 px-4 text-sm",
            md: "h-11 px-5 text-sm",
            lg: "h-12 px-6 text-base",
        },
        tag: {
            vsm: "h-6 px-2.5 text-xs",
            sm: "h-7 px-3 text-xs",
            md: "h-8 px-4 text-sm",
            lg: "h-9 px-5 text-sm",
        },
        secondary: {
            vsm: "h-6 px-1 text-xs",
            sm: "h-7 px-2 text-sm",
            md: "h-8 px-3 text-sm",
            lg: "h-10 px-4 text-base",
        },
    };

    const statusStyles = {
        danger:
            "border-[#FEE2E2] bg-[#FEE2E2] text-[#EF4444] hover:border-[#EF4444]/30 hover:bg-[#EF4444] hover:text-white",
        success:
            "border-[#DCFCE7] bg-[#DCFCE7] text-[#22C55E] hover:border-[#22C55E]/30 hover:bg-[#22C55E] hover:text-white",
        warning:
            "border-[#FEF3C7] bg-[#FEF3C7] text-[#F59E0B] hover:border-[#F59E0B]/30 hover:bg-[#F59E0B] hover:text-white",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(
                baseStyles,
                variants[variant],
                sizes[variant][size],
                status && statusStyles[status],
                className
            )}
            onClick={onClick}
        >
            {iconLeft && <span className="mr-2 shrink-0">{iconLeft}</span>}
            {text}
            {iconRight && (
                <span className="ml-2 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                    {iconRight}
                </span>
            )}
        </button>
    );
};

export default Button;
