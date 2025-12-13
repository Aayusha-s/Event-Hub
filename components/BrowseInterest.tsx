import Button from "./Button";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

const BrowseInterest = () => {
    const categories = [
        {
            title: "Music",
            icon: <i className="fa-solid fa-music text-4xl"></i>,
            description: "Live performances and festivals"
        },

        {
            title: "Art",
            icon: <i className="fa-solid fa-palette text-4xl"></i>,
            description: "Exhibitions, galleries, and creative workshops"
        },
        {
            title: "Tech",
            icon: <i className="fa-solid fa-laptop-code text-4xl"></i>,
            description: "Conferences, hackathons, and coding bootcamps"
        },

        {
            title: "Sports",
            icon: <i className="fa-solid fa-basketball text-4xl"></i>,
            description: "Games, tournaments, and fitness events"
        },
        {
            title: "Food & Drink",
            icon: <i className="fa-solid fa-utensils text-4xl"></i>,
            description: "Tastings, festivals, and culinary classes"
        },
        {
            title: "Health & Wellness",
            icon: <i className="fa-solid fa-heart-pulse text-4xl"></i>,
            description: "Yoga, meditation, and wellness retreats"
        },
        {
            title: "Business",
            icon: <i className="fa-solid fa-briefcase text-4xl"></i>,
            description: "Networking events, seminars, and workshops"
        },
        {
            title: "Education",
            icon: <i className="fa-solid fa-graduation-cap text-4xl"></i>,
            description: "Lectures, courses, and learning communities"
        },
        {
            title: "Travel",
            icon: <i className="fa-solid fa-plane text-4xl"></i>,
            description: "Tours, adventures, and travel meetups"
        },
        {
            title: "Gaming",
            icon: <i className="fa-solid fa-gamepad text-4xl"></i>,
            description: "Tournaments, conventions, and gaming nights"
        }
        // ,
        // {
        //     title: "Fashion",
        //     icon: <i className="fa-solid fa-tshirt text-4xl"></i>,
        //     description: "Shows, expos, and style workshops"
        // }
        // ,{
        //     title: "Film & Theater",
        //     icon: <i className="fa-solid fa-film text-4xl"></i>,
        //     description: "Screenings, plays, and acting classes"
        // },
        // {
        //     title: "Networking",
        //     icon: <i className="fa-solid fa-users text-4xl"></i>,
        //     description: "Meetups, mixers, and professional gatherings"
        // },
        // {
        //     title: "Charity & Causes",
        //     icon: <i className="fa-solid fa-hand-holding-heart text-4xl"></i>,
        //     description: "Fundraisers, awareness events, and volunteer opportunities"
        // },
        // {
        //     title: "Outdoors & Adventure",
        //     icon: <i className="fa-solid fa-tree text-4xl"></i>,
        //     description: "Hiking, camping, and nature excursions"
        // }
    ]
    return (
        <>
            <section className="my-10 mx-5 px-4">

                {/* title and sub-title */}
                <div className="flex flex-col items-center justify-center mb-8 ">
                    <h2 className="text-3xl font-semibold text-text-dark font-dynapuff">
                        Browse by Interest
                    </h2>
                    <p className="mt-8 max-w-100 text-center">Find events that match your passion.
                        From live music to tech talks, there's something for everyone.</p>

                </div>
                {/* cards */}
                <Link href="/categories">
                <div className="grid grid-cols-5 gap-y-4 gap-x-11 justify-center ">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            title={category.title}
                            icon={category.icon}
                            description={category.description} />
                    ))}

                </div>
                </Link>
                <div className="flex justify-center mx-5 mt-5 ">
                    <Button text="View All Categories"
                        variant="cta"
                        icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                    </Button>
                </div>


            </section>
        </>
    )
}

export default BrowseInterest;