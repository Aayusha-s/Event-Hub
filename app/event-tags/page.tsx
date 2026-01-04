// import "./page.module.css";
import Button from '@/components/Button'
import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import { Music, TrendingUp } from 'lucide-react'
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
      <div className="flex flex-col mb-2">
        <h1 className='font-dynapuff text-2xl md:text-3xl font-bold'>
          Browse Events by Tags
        </h1>
      </div>


      <div className='bg-brown-light w-full rounded-xl mb-4 p-4 space-y-2 '>
        <div className='flex flex-row items-center gap-2 '>
          <TrendingUp />
          <h3 className='text-xl font-semibold mb-2'>
            Trending Now
          </h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button text='Music' variant='tag'></Button>
          <Button text='Festivals' variant='tag'></Button>
          <Button text='Food and Drinks' variant='tag'></Button>
          <Button text='NightLife' variant='tag'></Button>
        </div>
      </div>


      {/* contents */}
      <h3 className='font-bold mb-4 '>Featured Events</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <h3 className='font-bold my-4'>All Events</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      {/* pagination */}
      <div className='mt-7'>
        <Pagination />
      </div>

    </section>
  )
}

export default page
