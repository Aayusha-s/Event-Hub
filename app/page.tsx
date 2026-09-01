import { Suspense } from "react";
import Link from "next/link";
import { Sparkles, Calendar, Users, Trophy, ArrowRight, TrendingUp } from "lucide-react";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import TrendingNearYou from "@/components/TrendingNearYou";
import BrowseInterest from "@/components/BrowseInterest";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Searchbar from "@/components/Searchbar";
import SectionContainer from "@/components/SectionContainer";

export default function Home() {
    return (
        <main className="bg-background">
            {/* Enhanced Premium Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brown-light via-background to-background py-12 sm:py-16 md:py-20 lg:py-28 xl:py-32">
                {/* Animated background elements */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brown-normal/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brown-normal/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>

                <SectionContainer className="relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-brown-normal/30 bg-brown-normal/5 px-4 py-2 backdrop-blur-sm">
                                <Sparkles className="w-4 h-4 text-brown-normal" />
                                <span className="text-sm font-medium text-brown-dark">Welcome to Vivnt - Your Event Discovery Platform</span>
                            </div>
                        </div>

                        {/* Main Headline */}
                        <h1 className="mb-6 text-center font-dynapuff text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Discover <span className="bg-gradient-to-r from-brown-normal to-brown-dark bg-clip-text text-transparent">Extraordinary</span> Moments
                        </h1>

                        {/* Subheadline */}
                        <p className="mx-auto mb-8 max-w-3xl text-center text-base text-gray-600 sm:text-lg md:text-xl">
                            From intimate gatherings to massive festivals, find the perfect event that matches your interests. Connect with communities, discover local talent, and create unforgettable memories.
                        </p>

                        {/* Search Bar */}
                        <div className="mb-12">
                            <Suspense fallback={<div className="h-16 rounded-full border border-border bg-surface shadow-lg" />}>
                                <Searchbar compact showLocation={true} placeholder="Search events, organizers, or people..." />
                            </Suspense>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-200 py-6 sm:gap-6 md:grid-cols-4 md:py-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-brown-dark">10K+</div>
                                <div className="text-sm text-gray-600 mt-1">Active Events</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-brown-dark">50K+</div>
                                <div className="text-sm text-gray-600 mt-1">Community Members</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-brown-dark">98%</div>
                                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-brown-dark">24/7</div>
                                <div className="text-sm text-gray-600 mt-1">Support Available</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Link href="/explore-events">
                                <Button
                                    text="Explore Events"
                                    variant="cta"
                                    size="lg"
                                    iconRight={<ArrowRight className="w-5 h-5" />}
                                />
                            </Link>
                            <Link href="/create-event/step-1">
                                <Button
                                    text="Host an Event"
                                    variant="secondary"
                                    size="lg"
                                />
                            </Link>
                        </div>
                    </div>
                </SectionContainer>
            </section>

            {/* Value Propositions Section */}
            <section className="py-16 md:py-24 bg-white">
                <SectionContainer>
                    <h2 className="font-dynapuff text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Vivnt?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <Calendar className="w-8 h-8 text-brown-normal" />,
                                title: "Diverse Event Categories",
                                description: "From music and tech to food and community events - find exactly what you're looking for",
                            },
                            {
                                icon: <Users className="w-8 h-8 text-brown-normal" />,
                                title: "Vibrant Communities",
                                description: "Connect with like-minded people and grow your network through shared interests",
                            },
                            {
                                icon: <Trophy className="w-8 h-8 text-brown-normal" />,
                                title: "Seamless Experience",
                                description: "From discovery to booking, every step is designed for your convenience",
                            },
                        ].map((item, index) => (
                            <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:border-brown-normal hover:shadow-lg transition-all duration-300">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="font-dynapuff font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </SectionContainer>
            </section>

            {/* Trending Near You */}
            <TrendingNearYou />

            {/* Browse by Interest */}
            <BrowseInterest />

            {/* Featured Discovery */}
            <section className="py-16 md:py-24 bg-gradient-to-r from-brown-light to-background">
                <SectionContainer>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="font-dynapuff text-3xl md:text-4xl font-bold mb-6">Don't Know Where to Start?</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Explore our curated collections and trending events. Whether you're looking for a quick night out or a weekend getaway, we've got something for everyone.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {["Today's Trending", "This Weekend", "Next Week", "Popular Venues", "New Events"].map((tag) => (
                                <Link key={tag} href={`/explore-events?sort=trending`}>
                                    <span className="px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-brown-normal hover:text-brown-normal cursor-pointer transition-colors">
                                        {tag}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </SectionContainer>
            </section>

            {/* How It Works */}
            <HowItWorks />

            {/* Final CTA */}
            <CallToAction />
        </main>
    );
}
