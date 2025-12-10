"use client";
import React, { useState } from "react";
import Button from "./Button"; ``

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState("attendees");
    return (
        <section className="text-text-dark">
            {/* title */}
            <div>
                <div className="flex flex-col items-center justify-center
            mx-5 mb-15 mt-15 px-4 ">
                    <h2 className="text-3xl 
                font-semibold 
                text-text-dark">
                        How It Works
                    </h2>
                </div>

                {/* tabs */}
                <div className="
                    flex flex-row items-center justify-center 
                    gap-8 border 
                    border-brown-normal
                    rounded-[10px]
                    p-2
                    mx-94
                    max-w-[800px]
                    h-[60px]">

                    <Button
                        text="For Attendees"
                        variant="cta"
                        size="md"
                        onClick={() => setActiveTab("attendees")}>
                    </Button>

                    <Button
                        text="For Organizers"
                        variant="cta"
                        size="md"
                        onClick={() => setActiveTab("organizers")}>
                    </Button>

                    <Button
                        text="For Vendors"
                        variant="cta"
                        size="md"
                        onClick={() => setActiveTab("vendors")}>
                    </Button>
                </div>

                {/* contents of each tabs */}
                <div>
                    {
                        activeTab === "attendees" &&
                        <div>
                            <div className="relative flex items-center justify-center 
                            gap-10 mx-16 my-10">
                                {/* connecting line*/}
                                <div className="
                                    absolute 
                                    top-1/2 
                                    left-28 
                                    right-28 
                                    h-0.5
                                    bg-brown-normal
                                    " />
                                <div className="
                                    border border-brown-normal rounded-[10px] 
                                    p-6 mx-16 
                                    max-w-24 w-full 
                                    max-h-24 
                                    my-10">
                                    <div className="flex flex-row items-center justify-center ">
                                        <i className="fa-solid fa-ticket text-4xl"></i>
                                    </div>
                                </div>

                                <div className="
                                    border border-brown-normal rounded-[10px] 
                                    p-6 mx-16 
                                    max-w-24 w-full 
                                    max-h-24 
                                    my-10">
                                    <div className="flex flex-row items-center justify-center ">
                                        <i className="fa-solid fa-magnifying-glass text-4xl"></i>
                                    </div>
                                </div>

                                <div className="
                                    border border-brown-normal rounded-[10px] 
                                    p-6 mx-16 
                                    max-w-24 w-full 
                                    max-h-24 
                                    my-10">
                                    <div className="flex flex-row items-center justify-center ">
                                        <i className="fa-solid fa-gift text-4xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        activeTab === "organizers" &&
                        <div>

                        </div>
                    }

                    {
                        activeTab === "vendors" &&
                        <div>

                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;