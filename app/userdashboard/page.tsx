import Button from '@/components/Button';
import PastEventsCard from '@/components/PastEventsCard';
import SavedEventsCard from '@/components/SavedEventsCard';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import UserCards from '@/components/UserCards';
const page = () => {
    return (
        <section className='font-cause text-text-dark my-10 mx-5 px-4 flex flex-col'>
            {/* welcome message */}
            <div className='w-full border border-brown-normal rounded-xl px-10 py-6 space-y-1 flex flex-col justify-start gap-4'>
                <h2 className='font-dynapuff text-3xl font-semibold '>
                    Welcome to Your Dashboard
                </h2>
                <p className='text-lg'>
                    You have 2 upcoming events and 4 saved favourites
                </p>
                <div>
                    <Button text="Explore New Events" variant="cta" icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                    </Button>
                </div>
            </div>

            {/* 4 cards */}
            <div className='flex flex-row mt-10 justify-between'>
                {/* card 1 */}
                <UserCards
                    icon={<i className="fa-solid fa-ticket text-3xl"></i>}
                    count={12}
                    label="Total Events Attended"
                >
                </UserCards>

                {/* card 2 */}
                <UserCards
                    icon={<i className="fa-solid fa-calendar text-3xl"></i>}
                    count={12}
                    label="Upcoming Events"
                >
                </UserCards>

                {/* card 3 */}

                <UserCards
                    icon={<i className="fa-solid fa-heart text-3xl"></i>}
                    count={12}
                    label="Favourite Events"
                >
                </UserCards>

                {/* card 4 */}
                <UserCards
                    icon={<i className="fa-solid fa-star text-3xl"></i>}
                    count={4.5}
                    label="Average Rating"
                >
                </UserCards>
            </div>

            {/* upcoming events */}
            <div className='flex flex-row justify-between items-center mt-10'>
                <h2 className='font-dynapuff text-2xl font-semibold'>
                    Your Upcoming Events
                </h2>
                <Button text='View All'
                    variant='cta'
                    icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}>

                </Button>
            </div>
            <div className='border border-brown-normal rounded-xl mt-10 p-4 px-6 py-6 
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 justify-items-center'>
                {/* card 1 */}
                <UpcomingEventCard
                    img="/images/party.png"
                    imgAlt='Summer Music Festival'
                    title='Summer Music Festival'
                    date='July 24, 2024'
                    location='Central Park, New York'
                    time='6:00 PM - 11:00 PM'
                    tickets='2 x VIP Pass'
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
                >
                </UpcomingEventCard>

            </div>


            {/* past events */}
            <div className='flex flex-row justify-between'>

                <div>
                    <div className='border border-brown-normal rounded-xl mt-10 p-4 px-6 py-6 w-[550px]
                grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6 justify-items-center'>
                        {/* card 1 */}
                        <div className='flex flex-row justify-between items-center w-[550px] px-6'>
                            <h2 className='font-dynapuff text-2xl font-semibold'>
                                Past Events
                            </h2>
                            <Button text='View All'
                                variant='cta'
                                icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                            </Button>
                        </div>

                        <PastEventsCard
                            title='Summer Music Festival'
                            date='July 24, 2024'
                            location='Central Park, New York'
                            rating={4.5}
                        >
                        </PastEventsCard>

                        <PastEventsCard
                            title='Summer Music Festival'
                            date='July 24, 2024'
                            location='Central Park, New York'
                            rating={4.5}
                        >
                        </PastEventsCard>

                    </div>
                </div>


                {/* SAVED EVENTS */}
                <div>
                    <div className='border border-brown-normal rounded-xl mt-10 p-4 px-6 py-6 w-[550px]
                    grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-6 justify-items-center'>
                        {/* card 1 */}
                        <div className='flex flex-row justify-between items-center w-[550px] px-6'>
                            <h2 className='font-dynapuff text-2xl font-semibold'>
                                Saved Events
                            </h2>
                            <Button text='View All'
                                variant='cta'
                                icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                            </Button>
                        </div>

                        <SavedEventsCard
                            title='Summer Music Festival'
                            date='July 24, 2024'
                            location='Central Park, New York'
                            rating={4.5}
                        >
                        </SavedEventsCard>

                        <SavedEventsCard
                            title='Summer Music Festival'
                            date='July 24, 2024'
                            location='Central Park, New York'
                            rating={4.5}
                        >
                        </SavedEventsCard>
                        

                    </div>
                </div>
            </div>
        </section >
    )
}

export default page
