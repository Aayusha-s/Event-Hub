import React from 'react'
type HowItWorksProps = {
    icon: React.ReactNode;
    step:number;
    title:string;
    description:string;
};

const HowItWorksStep = (
    {
        icon,
        step, 
        title,
        description 
    }: HowItWorksProps
) => {
    
    return (
        <div className="flex flex-col items-center justify-center">
                                {/* box */}
                                <div className="
                                    relative
                                    mb-4
                                    z-10
                                    w-24 h-24 
                                    border border-brown-normal rounded-[10px] 
                                    flex items-center justify-center
                                    bg-white">
                                    <div className="flex flex-row items-center justify-center ">
                                        <i className={`${icon} text-4xl`}></i>
                                    </div>

                                    {/* number circle */}
                                    <div className="
                                        absolute -top-2 -right-2
                                        w-7 h-7 rounded-full
                                        bg-brown-normal text-white
                                        text-sm font-semibold
                                        flex items-center justify-center">
                                        1
                                    </div>
                                </div>

                                <h3 className="text-center font-semibold">{title}</h3>
                                <p className="mt-2 text-sm text-center w-34">{description}</p>
                            </div>
    )
}

export default HowItWorksStep
