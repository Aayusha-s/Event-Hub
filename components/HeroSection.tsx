"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "./Button";
import SectionContainer from "./SectionContainer";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { cn } from "@/lib/utils";

const FLOATING_EVENTS = [
    {
        image: "/images/party.png",
        alt: "Music festival preview",
        className: "left-[4%] top-[18%] hidden lg:block",
        depth: 0.6,
        floatClass: "motion-float",
        floatDelay: "0ms",
        size: "w-32 h-24",
    },
    {
        image: "/images/ArtExhibition.png",
        alt: "Art exhibition preview",
        className: "right-[5%] top-[22%] hidden lg:block",
        depth: 0.8,
        floatClass: "motion-float-slow",
        floatDelay: "1000ms",
        size: "w-28 h-20",
    },
    {
        image: "/images/FoodFestival.png",
        alt: "Food festival preview",
        className: "left-[8%] bottom-[16%] hidden xl:block",
        depth: 0.5,
        floatClass: "motion-float-slow",
        floatDelay: "500ms",
        size: "w-28 h-20",
    },
    {
        image: "/images/ReactWorkshop.png",
        alt: "Tech workshop preview",
        className: "right-[7%] bottom-[14%] hidden xl:block",
        depth: 0.7,
        floatClass: "motion-float",
        floatDelay: "1500ms",
        size: "w-28 h-20",
    },
] as const;

const HeroSection = () => {
    const { containerRef, offset, prefersReducedMotion } = useMouseParallax(12);

    const lightX = prefersReducedMotion ? 50 : 50 + offset.x * 8;
    const lightY = prefersReducedMotion ? 40 : 40 + offset.y * 8;

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden"
            aria-label="Hero section"
        >
            {/* Cursor-reactive ambient light */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                aria-hidden="true"
                style={{
                    background: prefersReducedMotion
                        ? undefined
                        : `radial-gradient(600px circle at ${lightX}% ${lightY}%, rgba(203, 183, 153, 0.12), transparent 60%)`,
                }}
            />

            {/* Floating event previews */}
            {!prefersReducedMotion &&
                FLOATING_EVENTS.map((item) => (
                    <div
                        key={item.image}
                        className={cn(
                            "pointer-events-none absolute z-0",
                            item.className,
                            item.floatClass
                        )}
                        style={
                            {
                                "--float-delay": item.floatDelay,
                                transform: `translate(${offset.x * item.depth}px, ${offset.y * item.depth}px)`,
                                transition: "transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                            } as React.CSSProperties
                        }
                        aria-hidden="true"
                    >
                        <div
                            className={cn(
                                "overflow-hidden rounded-2xl border border-border bg-surface shadow-sm",
                                item.size
                            )}
                            style={{
                                transform: `rotate(${offset.x * 0.4}deg)`,
                                transition: "transform 200ms ease-out",
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.alt}
                                width={144}
                                height={96}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                ))}

            <SectionContainer className="relative z-10 py-10 md:py-16 lg:py-20">
                <div className="surface-elevated mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-10 text-center md:px-10 md:py-14 lg:py-16">
                    <div
                        className="motion-hero-enter mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-text-light shadow-sm"
                        style={{ "--hero-delay": "0ms" } as React.CSSProperties}
                    >
                        <Sparkles className="h-3.5 w-3.5 text-brown-normal" aria-hidden="true" />
                        <span>10,000+ events happening near you</span>
                    </div>

                    <h1
                        className="motion-hero-enter text-4xl font-semibold leading-tight tracking-tight text-text-dark sm:text-5xl md:text-6xl"
                        style={{ "--hero-delay": "80ms" } as React.CSSProperties}
                    >
                        Find your next{" "}
                        <span className="font-dynapuff text-brown-dark">unforgettable</span>{" "}
                        experience
                    </h1>

                    <p
                        className="motion-hero-enter mt-5 max-w-xl text-base leading-relaxed text-text-light sm:text-lg"
                        style={{ "--hero-delay": "160ms" } as React.CSSProperties}
                    >
                        Discover events, connect with communities, and create memories that last a
                        lifetime. From concerts to conferences, find what moves you.
                    </p>

                    <div
                        className="motion-hero-enter mt-8 flex flex-col items-center gap-3 sm:flex-row"
                        style={{ "--hero-delay": "240ms" } as React.CSSProperties}
                    >
                        <Link href="/explore-events">
                            <Button
                                text="Explore Events"
                                variant="cta"
                                size="lg"
                                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                            />
                        </Link>
                    </div>

                    <p
                        className="motion-hero-enter mt-8 text-sm text-text-light"
                        style={{ "--hero-delay": "320ms" } as React.CSSProperties}
                    >
                        Quick search · Personalized results · Secure booking
                    </p>
                </div>
            </SectionContainer>
        </div>
    );
};

export default HeroSection;
