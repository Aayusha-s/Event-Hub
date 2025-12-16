import EventCard from "./EventCard"
import Button from "./Button"

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
        }


    ]
    return (
        <section className="my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div className="flex items-center flex-wrap gap-2 md:gap-3 my-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl 
                        font-semibold text-text-dark leading-tight">
                    Trending Near
                    <span className="font-dynapuff"> KATHMANDU</span>
                    <i className="fa-solid fa-caret-down cursor-pointer text-3xl ml-3 "></i>
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-y-9 lg:gap-x-4 lg:justify-center ">
                {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>

            <div className="flex justify-center mx-5 mt-7 px-4  ">
                <Button
                    text="View All Events"
                    iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}
                    variant="cta"
                />
            </div>
        </section>
    )
}

export default TrendingNearYou