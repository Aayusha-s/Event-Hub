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

    const stepsMaps = {
        attendees: attendeeSteps,
        organizers: organizerSteps,
        vendors: vendorSteps
    };

    return (
        <section className="text-text-dark px-4 py-10">
            {/* Title */}
            <div className="flex justify-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold font-dynapuff">
                    How It Works
                </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
                <div className="
                    flex flex-wrap justify-center gap-3
                    border border-brown-normal
                    rounded-xl p-2
                    max-w-full sm:max-w-[700px]"
                >
                    <Button
                        text="For Attendees"
                        variant="cta"
                        size="sm"
                        isActive={activeTab === "attendees"}
                        onClick={() => setActiveTab("attendees")}
                    />

                    <Button
                        text="For Organizers"
                        variant="cta"
                        size="sm"
                        isActive={activeTab === "organizers"}
                        onClick={() => setActiveTab("organizers")}
                    />

                    <Button
                        text="For Vendors"
                        variant="cta"
                        size="sm"
                        isActive={activeTab === "vendors"}
                        onClick={() => setActiveTab("vendors")}
                    />
                </div>
            </div>

            {/* Steps */}
            <div className="relative mt-10 flex items-center justify-center">
                
                <div className="lg:block absolute
                    top-12 left-1/4 right-1/4
                    lg:top-12 lg:left-1/3 lg:right-1/3   
                    2xl:top-12 2xl:left-1/3 2xl:right-1/3
                    h-0.5 bg-brown-normal"
                />

                <div className="
                    grid grid-cols-3
                    gap-4
                    max-w-6xl"
                >
                    {stepsMaps[activeTab].map((step, index) => (
                        <HowItWorksStep
                            key={index}
                            step={index + 1}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );

};

export default HowItWorks;