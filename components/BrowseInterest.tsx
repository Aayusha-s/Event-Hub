import Button from "./Button";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

const BrowseInterest = () => {
    const categories = [
        {
            title: "Music",
            icon: <i className="fa-solid fa-music text-3xl sm:text-4xl"></i>,
            description: "Live performances and festivals",
        },
        {
            title: "Art",
            icon: <i className="fa-solid fa-palette text-3xl sm:text-4xl"></i>,
            description: "Exhibitions, galleries, and creative workshops",
        },
        {
            title: "Tech",
            icon: <i className="fa-solid fa-laptop-code text-3xl sm:text-4xl"></i>,
            description: "Conferences, hackathons, and coding bootcamps",
        },
        {
            title: "Sports",
            icon: <i className="fa-solid fa-basketball text-3xl sm:text-4xl"></i>,
            description: "Games, tournaments, and fitness events",
        },
        {
            title: "Food & Drink",
            icon: <i className="fa-solid fa-utensils text-3xl sm:text-4xl"></i>,
            description: "Tastings, festivals, and culinary classes",
        },
        {
            title: "Health & Wellness",
            icon: <i className="fa-solid fa-heart-pulse text-3xl sm:text-4xl"></i>,
            description: "Yoga, meditation, and wellness retreats",
        },
        {
            title: "Business",
            icon: <i className="fa-solid fa-briefcase text-3xl sm:text-4xl"></i>,
            description: "Networking events, seminars, and workshops",
        },
        {
            title: "Education",
            icon: <i className="fa-solid fa-graduation-cap text-3xl sm:text-4xl"></i>,
            description: "Lectures, courses, and learning communities",
        },
        {
            title: "Travel",
            icon: <i className="fa-solid fa-plane text-3xl sm:text-4xl"></i>,
            description: "Tours, adventures, and travel meetups",
        },
        {
            title: "Gaming",
            icon: <i className="fa-solid fa-gamepad text-3xl sm:text-4xl"></i>,
            description: "Tournaments, conventions, and gaming nights",
        },
    ];

    return (
        <section
            className="
        my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">
            {/* Title */}
            <div className="flex flex-col items-center text-center my-6">
                <h2
                    className="
                    text-2xl 
                    sm:text-3xl 
                    lg:text-4xl 
                    font-semibold 
                    font-dynapuff 
                    text-text-dark">
                    Browse by Interest
                </h2>

                <p className="
                    mt-4 
                    max-w-xl 
                    text-sm 
                    sm:text-base 
                    text-text-dark">
                    Find events that match your passion. From live music to tech talks,
                    there's something for everyone.
                </p>
            </div>

            {/* Cards */}
            <div className="
                    grid 
                    grid-cols-2 
                    gap-4
                    sm:gap-6
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5">
                {categories.map((category, index) => (
                    <CategoryCard
                        key={index}
                        title={category.title}
                        icon={category.icon}
                        description={category.description}
                    />
                ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mt-10">
                <Link href="/categories">
                    <Button
                        text="View All Categories"
                        variant="cta"
                        iconRight={<i className="fa-solid fa-arrow-right ml-2"></i>}
                    />
                </Link>
            </div>
        </section>
    );
};

export default BrowseInterest;
