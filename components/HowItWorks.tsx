"use client";
import React, { useState } from "react";
import Button from "./Button"; 
import HowItWorksStep from "./HowItWorksStep";


const HowItWorks = () => {

    const attendeeSteps = [
        {
            icon: "fa-solid fa-magnifying-glass",
            title: "Discover Events",
            description: "Browse events that match your interests.",
        },
        {
            icon: "fa-solid fa-ticket",
            title: "Book Your Spot",
            description: "Buy tickets easily and securely.",
        },
        {
            icon: "fa-solid fa-gift",
            title: "Enjoy & Connect",
            description: "Attend events and meet people.",
        },
    ];

    const organizerSteps = [
        {
            icon: "fa-solid fa-plus",
            title: "Create Event",
            description: "Create your event in minutes.",
        },
        {
            icon: "fa-solid fa-user-group",
            title: "Reach Audience",
            description: "Reach people who care.",
        },
        {
            icon: "fa-solid fa-chart-column",
            title: "Manage & Grow",
            description: "Track and improve your events.",
        },
    ];

    const vendorSteps = [
        {
            icon: "fa-solid fa-store",
            title: "Create Profile",
            description: "Showcase your services.",
        },
        {
            icon: "fa-solid fa-file",
            title: "Apply to Events",
            description: "Apply to suitable events.",
        },
        {
            icon: "fa-solid fa-handshake",
            title: "Grow Business",
            description: "Build long-term partnerships.",
        },
    ];

    const [activeTab, setActiveTab] = useState<"attendees" | "organizers" | "vendors">("attendees");
    
    const stepsMaps ={
        attendees: attendeeSteps,
        organizers: organizerSteps,
        vendors: vendorSteps
    }
    return (
        <section className="text-text-dark">
            {/* title */}
            <div>
                <div className="flex flex-col items-center justify-centermx-5 mb-15 mt-15 px-4 ">
                    <h2 className="text-3xl font-semibold text-text-dark font-dynapuff">
                        How It Works
                    </h2>
                </div>

                {/* tabs */}
                <div className="
                    flex flex-row items-center justify-center 
                    gap-8 border 
                    border-brown-normal
                    rounded-[10px]
                    p-2 mx-94 max-w-[800px] h-[60px]">

                    <Button
                        text="For Attendees"
                        variant="cta"
                        size="md"
                        isActive={activeTab === "attendees"}
                        onClick={() => setActiveTab("attendees")}>
                    </Button>

                    <Button
                        text="For Organizers"
                        variant="cta"
                        size="md"
                        isActive={activeTab === "organizers"}
                        onClick={() => setActiveTab("organizers")}>
                    </Button>

                    <Button
                        text="For Vendors"
                        variant="cta"
                        size="md"
                        isActive={activeTab === "vendors"}
                        onClick={() => setActiveTab("vendors")}>
                    </Button>
                </div>

                {/* contents of each tabs */}
                <div>
                    {/* ATTENDEE TAB */}
                    {
                        <div className="relative flex items-center justify-center gap-40  my-10">

                            {/* connecting line*/}
                            <div className="
                                    absolute 
                                    top-[50px] 
                                    left-80
                                    right-80
                                    h-0.5
                                    bg-brown-normal
                                    " />

                            {stepsMaps[activeTab].map((step, index)=> (
                                <HowItWorksStep
                                    key={index}
                                    step={index + 1}
                                    icon={step.icon}
                                    title={step.title}
                                    description={step.description}
                                />
                            ))}
                        </div>
                    }


                    
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;