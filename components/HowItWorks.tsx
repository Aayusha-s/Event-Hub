"use client";

import React, { useState } from "react";
import Button from "./Button";
import HowItWorksStep from "./HowItWorksStep";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import FadeInView from "./motion/FadeInView";
import { cn } from "@/lib/utils";

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
        vendors: vendorSteps,
    };

    const tabs = [
        { id: "attendees" as const, label: "For Attendees" },
        { id: "organizers" as const, label: "For Organizers" },
        { id: "vendors" as const, label: "For Vendors" },
    ];

    return (
        <SectionContainer className="border-t border-brown-normal/30 py-10 md:py-14">
            <FadeInView>
                <SectionHeader
                    title="How it works"
                    description="Whether you're attending, organizing, or vending — Vivnt makes it simple."
                    align="center"
                    accent
                />
            </FadeInView>

            <FadeInView delay={100}>
                <div className="flex justify-center">
                <div
                    className="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-brown-normal/50 bg-brown-light p-1.5"
                    role="tablist"
                    aria-label="How it works audience"
                >
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            text={tab.label}
                            variant="cta"
                            size="sm"
                            isActive={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                activeTab !== tab.id &&
                                    "!border-transparent !bg-transparent !text-text-dark !shadow-none hover:!bg-white/60"
                            )}
                        />
                    ))}
                </div>
            </div>
            </FadeInView>

            <div className="relative mt-10 md:mt-12">
                <div
                    className="absolute left-[16.67%] right-[16.67%] top-12 hidden h-px bg-brown-normal/40 md:block"
                    aria-hidden="true"
                />

                <div
                    key={activeTab}
                    className="motion-tab-enter grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
                >
                    {stepsMaps[activeTab].map((step, index) => (
                        <HowItWorksStep
                            key={step.title}
                            step={index + 1}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};

export default HowItWorks;
