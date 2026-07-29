import Button from "./Button";

import CategoryCard from "./CategoryCard";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import SectionContainer from "./SectionContainer";

import SectionHeader from "./SectionHeader";

import FadeInView from "./motion/FadeInView";

import StaggerGrid from "./motion/StaggerGrid";



const BrowseInterest = () => {

    const categories = [

        {

            title: "Music",

            icon: <i className="fa-solid fa-music text-2xl" aria-hidden="true"></i>,

            description: "Live performances and festivals",

        },

        {

            title: "Art",

            icon: <i className="fa-solid fa-palette text-2xl" aria-hidden="true"></i>,

            description: "Exhibitions, galleries, and creative workshops",

        },

        {

            title: "Tech",

            icon: <i className="fa-solid fa-laptop-code text-2xl" aria-hidden="true"></i>,

            description: "Conferences, hackathons, and coding bootcamps",

        },

        {

            title: "Sports",

            icon: <i className="fa-solid fa-basketball text-2xl" aria-hidden="true"></i>,

            description: "Games, tournaments, and fitness events",

        },

        {

            title: "Food & Drink",

            icon: <i className="fa-solid fa-utensils text-2xl" aria-hidden="true"></i>,

            description: "Tastings, festivals, and culinary classes",

        },

        {

            title: "Health & Wellness",

            icon: <i className="fa-solid fa-heart-pulse text-2xl" aria-hidden="true"></i>,

            description: "Yoga, meditation, and wellness retreats",

        },

        {

            title: "Business",

            icon: <i className="fa-solid fa-briefcase text-2xl" aria-hidden="true"></i>,

            description: "Networking events, seminars, and workshops",

        },

        {

            title: "Education",

            icon: <i className="fa-solid fa-graduation-cap text-2xl" aria-hidden="true"></i>,

            description: "Lectures, courses, and learning communities",

        },

        {

            title: "Travel",

            icon: <i className="fa-solid fa-plane text-2xl" aria-hidden="true"></i>,

            description: "Tours, adventures, and travel meetups",

        },

        {

            title: "Gaming",

            icon: <i className="fa-solid fa-gamepad text-2xl" aria-hidden="true"></i>,

            description: "Tournaments, conventions, and gaming nights",

        },

    ];



    return (

        <SectionContainer className="border-t border-brown-normal/30 py-10 md:py-14">

            <FadeInView>

                <SectionHeader

                    title="Browse by interest"

                    description="Find events that match your passion. From live music to tech talks, there's something for everyone."

                    align="center"

                    accent

                />

            </FadeInView>



            <StaggerGrid

                className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"

                staggerMs={60}

            >

                {categories.map((category) => (

                    <CategoryCard

                        key={category.title}

                        title={category.title}

                        icon={category.icon}

                        description={category.description}

                    />

                ))}

            </StaggerGrid>



            <FadeInView delay={150} className="mt-10 flex justify-center">

                <Link href="/categories">

                    <Button

                        text="View All Categories"

                        variant="cta"

                        iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}

                    />

                </Link>

            </FadeInView>

        </SectionContainer>

    );

};



export default BrowseInterest;

