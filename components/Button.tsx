import React from "react";

type ButtonProps = {
    text: string;
    icon?: React.ReactNode;
    variant?: "cta" | "tag";
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    isActive?: boolean;
};

const Button = ({ text, icon, variant = "cta", size = "md", onClick, isActive }: ButtonProps) => {
    const baseStyles =
        "group border border-brown-dark bg-transparent text-text-light hover:bg-brown-light-active hover:border-brown-dark-hover hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer flex items-center justify-center";

    const variants = {
        cta: "rounded-[10px]",
        tag: "rounded-[40px] ",
    };

    const sizes = {
        cta: {
            sm: "px-4 h-10",
            md: "px-5 h-10",
            lg: "px-6 h-12",
        },
        tag: {
            sm: "px-3 h-6",
            md: "px-5 h-8",
            lg: "px-5 h-10",
        },
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${sizes[variant][size]} ${isActive ? "text-white" : "text-text-dark bg-white"}
        hover:bg-brown-dark`}
            style={isActive ? { backgroundColor: "#988973" } : {}}
            onClick={onClick}
        >
            {text}
            {icon && <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
        </button>
    );
};

export default Button;



