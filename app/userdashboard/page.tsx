'use client'
import Button from '@/components/Button';
import DashboardBox from '@/components/DashboardBox';
import PastEventsCard from '@/components/PastEventsCard';
import ReviewPopup from '@/components/ReviewPopup';
import SavedEventsCard from '@/components/SavedEventsCard';
import SharePopup from '@/components/SharePopup';
import TicketPopup from '@/components/TicketPopup';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import UserCards from '@/components/UserCards';
import VendorCards from '@/components/VendorCards';
import { Calendar, Heart, Star, Ticket, History, CalendarCheck, Bookmark, MessageSquare } from 'lucide-react';
import { useState } from 'react';
const Page = () => {

    const [viewTicket, setViewTicket] = useState(false)
    const [viewReview, setViewReview] = useState(false)


    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            {/* welcome message */}
            <DashboardBox
                title='Welcome to your dashboard'
                description='You have 5 upcoming events and 4 saved favorites'
                buttonText='Explore New Events'
            >
            </DashboardBox>

            {/* 4 cards */}
            <div className='flex flex-col gap-2 md:flex-row md:gap-4 lg:gap-6 justify-between mt-10'>
                
                {/* card 1 */}
                <VendorCards
                    icon1={<Ticket className=' text-green-500' />}
                    count={"12"}
                    label="Total Events Attended"
                    subLabel='All-time attendance'
                    icon2={<History className='inline mr-2 text-blue-500' />}
                />

                {/* card 2 */}
                <VendorCards
                    icon1={<Calendar className=' text-blue-500' />}
                    count={"3"}
                    label="Upcoming Events"
                    subLabel='Booked & Confirmed'
                    icon2={<CalendarCheck className='inline mr-2 text-purple-500' />}
                />

                {/* card 3 */}
                <VendorCards
                    icon1={<Heart className=' text-red-500' />}
                    count={"8"}
                    label="Favourite Events"
                    subLabel='Saved by You'
                    icon2={<Bookmark className='inline mr-2 text-yellow-500' />}
                />

                {/* card 4 */}
                <VendorCards
                    icon1={<Star className=' text-yellow-500' />}
                    count={"4.8"}
                    label="Average Rating"
                    subLabel='Based on Reviews'
                    icon2={<MessageSquare className='inline mr-2 text-green-500' />}
                />
                
            </div>

            {/* upcoming events */}
            <div className='flex flex-row justify-between items-center mt-10'>
                <h2 className='font-dynapuff text-xl md:text-xl lg:text-2xl font-semibold'>
                    Your Upcoming Events
                </h2>
                <Button text='View All'
                    variant='cta'
                    iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>

                </Button>
            </div>
            <div className='border border-brown-normal rounded-xl mt-6 p-4 px-6 py-6 
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-items-center'>
                {/* card 1 */}
                <UpcomingEventCard
                    img="/images/party.png"
                    imgAlt='Summer Music Festival'
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    time='6:00 PM - 11:00 PM'
                    tickets='2 x VIP Pass'
                    onOpen={() => setViewTicket(true)}

                >
                </UpcomingEventCard>

                {/* card 2 */}
                <UpcomingEventCard
                    img="/images/party.png"
                    imgAlt='Summer Music Festival'
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    time='6:00 PM - 11:00 PM'
                    tickets='2 x VIP Pass'
                    onOpen={() => setViewTicket(true)}
                >
                </UpcomingEventCard>

                <UpcomingEventCard
                    img="/images/party.png"
                    imgAlt='Summer Music Festival'
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    time='6:00 PM - 11:00 PM'
                    tickets='2 x VIP Pass'
                    onOpen={() => setViewTicket(true)}
                >
                </UpcomingEventCard>

                <UpcomingEventCard
                    img="/images/party.png"
                    imgAlt='Summer Music Festival'
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    time='6:00 PM - 11:00 PM'
                    tickets='2 x VIP Pass'
                    onOpen={() => setViewTicket(true)}

                >
                </UpcomingEventCard>


                <TicketPopup
                    isOpen={viewTicket}
                    onClose={() => setViewTicket(false)}
                />

            </div>


            {/* past events */}
            <div className='flex flex-row justify-between items-center mt-10'>
                <h2 className='font-dynapuff text-xl md:text-xl lg:text-2xl font-semibold'>
                    Past Events
                </h2>
                <Button text='View All'
                    variant='cta'
                    iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>

                </Button>
            </div>
            <div className='border border-brown-normal rounded-xl mt-6 p-4 
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center'>

                <PastEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    rating={4.5}
                    onOpen={() => setViewReview(true)}
                >
                </PastEventsCard>

                <PastEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    rating={4.5}
                    onOpen={() => setViewReview(true)}
                >
                </PastEventsCard>
                <PastEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    rating={4.5}
                    onOpen={() => setViewReview(true)}

                >
                </PastEventsCard>
                <PastEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    rating={4.5}
                    onOpen={() => setViewReview(true)}

                >
                </PastEventsCard>

                <ReviewPopup
                    isOpen={viewReview}
                    onclose={() => setViewReview(false)}
                />

            </div>


            {/* SAVED EVENTS */}
            <div className='flex flex-row justify-between items-center mt-10'>
                <h2 className='font-dynapuff text-xl md:text-xl lg:text-2xl font-semibold'>
                    Saved Events
                </h2>
                <Button text='View All'
                    variant='cta'
                    iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                </Button>
            </div>

            <div className='border border-brown-normal  rounded-xl mt-6 p-4 px-6 py-6
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center'>
                {/* card 1 */}

                <SavedEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    price={400}
                >
                </SavedEventsCard>

                <SavedEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    price={375}
                >
                </SavedEventsCard>

                <SavedEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    price={350}
                >
                </SavedEventsCard>

                <SavedEventsCard
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    price={800}
                >
                </SavedEventsCard>
            </div>

        </section>

    )
}

export default Page
