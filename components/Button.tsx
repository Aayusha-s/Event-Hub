
type ButtonProps = {
    text?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    variant?: "cta" | "tag" | "secondary";
    size?: "vsm" | "sm" | "md" | "lg";
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
    status?: "danger" | "success" | "warning";

};

const Button = (
    {
        text,
        iconLeft,
        iconRight,
        variant = "cta",
        size = "md",
        onClick,
        isActive,
        status,
        className
    }: ButtonProps) => {
    const baseStyles =
        "group border border-brown-dark bg-transparent hover:bg-brown-light-active hover:border-brown-dark-hover hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer flex items-center justify-center";

    const variants = {
        cta: "rounded-[10px]",
        tag: "rounded-[40px] ",
        secondary: "border-none bg-transparent hover:bg-transparent hover:text-brown-normal-active hover:underline hover:shadow-none hover:translate-none",
    };

    const sizes = {
        cta: {
            vsm: "px-2 h-8 text-sm",
            sm: "px-3 h-10 text-sm",
            md: "px-5 h-10 font-semibold",
            lg: "px-6 h-12",
        },
        tag: {
            vsm: "px-2 h-6 text-sm",
            sm: "px-3 h-6 text-sm",
            md: "px-5 h-8",
            lg: "px-5 h-10",
        },
        secondary: {
            vsm: "px-2 h-6 text-sm",
            sm: "px-3 h-6 text-sm",
            md: "px-5 h-8",
            lg: "px-6 h-10",
        }
    };

    const statusStyles = {
        danger: "border-red-500 text-red-500 hover:bg-red-600 hover:text-white hover:icon-white",
        success: "border-green-500 text-green-500 hover:bg-green-600 hover:text-white hover:icon-white",
        warning: "border-yellow-500 text-yellow-500 hover:bg-yellow-600 hover:text-white hover:icon-white",
    };

    const baseColor =
        status
            ? "bg-transparent"
            : isActive
                ? "bg-brown-dark text-dark"
                : "bg-white text-text-dark";

    return (
        <button
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${sizes[variant][size]}
                ${baseColor}
                ${className ? className : ""}
                ${status ? statusStyles[status] : ""}
            `}
            onClick={onClick}>

            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {text}
            {iconRight && (
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    {iconRight}
                </span>
            )}
        </button>

    );
};

export default Button;



