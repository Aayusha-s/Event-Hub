import React from "react";

type HowItWorksProps = {
    icon: string;
    step: number;
    title: string;
    description: string;
};

const HowItWorksStep = ({ icon, step, title, description }: HowItWorksProps) => {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="relative mb-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-brown-normal/60 bg-white shadow-sm">
                    <i className={`${icon} text-2xl text-brown-dark`} aria-hidden="true"></i>
                </div>
                <div
                    className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white"
                    aria-hidden="true"
                >
                    {step}
                </div>
            </div>

            <h3 className="text-base font-semibold text-text-dark">{title}</h3>
            <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-text-light">
                {description}
            </p>
        </div>
    );
};

export default HowItWorksStep;
