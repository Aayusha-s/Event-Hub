import EventCard from "./EventCard";

import Button from "./Button";

import Link from "next/link";

import { ArrowRight, ChevronDown, MapPin } from "lucide-react";

import SectionContainer from "./SectionContainer";

import SectionHeader from "./SectionHeader";

import FadeInView from "./motion/FadeInView";

import StaggerGrid from "./motion/StaggerGrid";



const TrendingNearYou = () => {

    const events = [

        {

            eventId: 1,

            tags: ["Music", "Trending"],

            imageUrl: "/images/party.png",

            imageAlt: "Summer Music Festival",

            title: "Summer Music Festival 2025",

            organizer: "By Department of Festivals",

            descriptions: ["Musical Events", "All University students can join"],

            location: "Central Park, New York",

            price: "Rs.360",

        },

        {

            eventId: 2,

            tags: ["Art", "Featured"],

            imageUrl: "/images/ArtExhibition.png",

            imageAlt: "Art Exhibition",

            title: "Annual Art Exhibition",

            organizer: "City Art Council",

            descriptions: ["Art displays", "Open to all"],

            location: "Gallery Hall, Kathmandu",

            price: "Rs.200",

        },

        {

            eventId: 3,

            tags: ["Tech", "Workshop"],

            imageUrl: "/images/ReactWorkshop.png",

            imageAlt: "Tech Workshop",

            title: "React Workshop",

            organizer: "Tech Group Nepal",

            descriptions: ["Hands-on sessions", "Bring your laptop"],

            location: "Tech Hub, Kathmandu",

            price: "Rs.500",

        },

        {

            eventId: 4,

            tags: ["Food", "Festival"],

            imageUrl: "/images/FoodFestival.png",

            imageAlt: "Food Festival",

            title: "Gourmet Food Festival",

            organizer: "Culinary Association",

            descriptions: ["Food tasting", "All food lovers welcome"],

            location: "Downtown Plaza, Kathmandu",

            price: "Rs.250",

        },

        {

            eventId: 5,

            tags: ["Health", "Wellness"],

            imageUrl: "/images/Wellness.png",

            imageAlt: "Wellness Retreat",

            title: "Wellness Retreat",

            organizer: "Health First",

            descriptions: ["Yoga sessions", "Meditation workshops"],

            location: "Mountain Resort, Kathmandu",

            price: "Rs.800",

        },

        {

            eventId: 6,

            tags: ["Business", "Networking"],

            imageUrl: "/images/Business.png",

            imageAlt: "Business Networking Event",

            title: "Business Networking Event",

            organizer: "Chamber of Commerce",

            descriptions: ["Networking opportunities", "All professionals welcome"],

            location: "Business Center, Kathmandu",

            price: "Rs.400",

        },

    ];



    return (

        <SectionContainer className="py-10 md:py-14">

            <FadeInView>

                <SectionHeader

                    title={

                        <span className="inline-flex flex-wrap items-center gap-2">

                            Trending near

                            <button

                                type="button"

                                className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-brown-normal/60 bg-white px-3 py-1 text-xl font-semibold text-brown-dark transition-all duration-200 hover:-translate-y-px hover:border-brown-normal hover:bg-brown-light hover:shadow-sm sm:text-2xl"

                                aria-label="Change location, currently Kathmandu"

                            >

                                <MapPin className="h-4 w-4 shrink-0 text-brown-normal" aria-hidden="true" />

                                Kathmandu

                                <ChevronDown className="h-4 w-4 shrink-0 text-text-light" aria-hidden="true" />

                            </button>

                        </span>

                    }

                    description="Popular events happening in your area right now."

                />

            </FadeInView>



            <StaggerGrid

                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"

                staggerMs={90}

            >

                {events.map((event) => (

                    <EventCard key={event.eventId} {...event} />

                ))}

            </StaggerGrid>



            <FadeInView delay={200} className="mt-10 flex justify-center">

                <Link href="/explore-events">

                    <Button

                        text="View All Events"

                        iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}

                        variant="cta"

                        size="md"

                    />

                </Link>

            </FadeInView>

        </SectionContainer>

    );

};



export default TrendingNearYou;

