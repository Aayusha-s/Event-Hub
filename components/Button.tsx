
type ButtonProps = {
    text?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    variant?: "cta" | "tag";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    isActive?: boolean;
    status?: "danger" | "success" | "warning";

};

const Button = ({ text, iconLeft, iconRight, variant = "cta", size = "md", onClick, isActive, status }: ButtonProps) => {
    const baseStyles =
        "group border border-brown-dark bg-transparent hover:bg-brown-light-active hover:border-brown-dark-hover hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer flex items-center justify-center";

    const variants = {
        cta: "rounded-[10px]",
        tag: "rounded-[40px] ",
    };

    const sizes = {
        cta: {
            sm: "px-3 h-10 text-sm",
            md: "px-5 h-10",
            lg: "px-6 h-12",
        },
        tag: {
            sm: "px-3 h-6",
            md: "px-5 h-8",
            lg: "px-5 h-10",
        },
    };

    const statusStyles = {
        danger: "border-red-500  text-red-500 hover:bg-red-600 hover:text-white",
        success: "border-green-500 text-green-500 hover:bg-green-600 hover:text-white",
        warning: "border-yellow-500 text-yellow-500 hover:bg-yellow-600 hover:text-white",
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



