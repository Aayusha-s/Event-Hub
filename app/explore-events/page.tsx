import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import React from 'react'

const page = () => {
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
        {
            eventId: 7,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 8,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 9,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 10,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 11,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 12,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 13,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 14,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 15,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 16,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 17,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 18,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 19,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 20,
            tags: ["Business", "Networking"],
            imageUrl: "/images/Business.png",
            imageAlt: "Business Networking Event",
            title: "Business Networking Event",
            organizer: "Chamber of Commerce",
            descriptions: ["Networking opportunities", "All professionals welcome"],
            location: "Business Center, Kathmandu",
            price: "Rs.400",
        },
        {
            eventId: 21,
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
        <section className='text-text-dark my-10 mx-5 px-4' >
            {/* title */}
            <div className="flex flex-row items-center ">
                <h2 className="text-3xl 
                font-semibold 
                text-text-dark">
                    Explore Events
                </h2>
            </div>

            {/* view style */}
            <div className='flex justify-end gap-4 mb-4 mt-2 cursor-pointer'>
                <i className="fa-solid fa-table-cells text-2xl"></i>
                <i className="fa-solid fa-list text-2xl"></i>
            </div>

            {/* contents */}
            <div className='grid grid-cols-1 gap-y-9 gap-x-17 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>

            {/* pagination */}
            <div className='mt-6'>
                <Pagination />
            </div>
        </section>
    )
}

export default page
