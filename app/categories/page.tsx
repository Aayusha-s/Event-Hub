// import "./page.module.css";
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
        }

    ]
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            {/* title */}
            <div className="flex flex-col">
                
                <h2 className="text-3xl font-semibold text-text-dark font-dynapuff leading-12">
                    Community Events
                </h2>
                <p className='text-xl leading-8'>
                    Discover amazing community events
                </p>
                <p className='text-md leading-12 mt-5'>
                    Showing 12 results
                </p>
            </div>

            {/* view style */}
            <div className='flex justify-end gap-4 mb-6 mt-1 cursor-pointer'>
                <i className="fa-solid fa-table-cells text-2xl"></i>
                <i className="fa-solid fa-list text-2xl"></i>
            </div>

            

            

            {/* contents */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>

            {/* pagination */}
            <div className='mt-7'>
            <Pagination/>
            </div>

        </section>
    )
}

export default page
