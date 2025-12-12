"use client";
import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import Map from '@/components/Map';

const page = () => {
    const location = [
        {
            id: 1,
            url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.92705071464!2d85.32951860884417!3d27.69468421903402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c2eaf9%3A0xc5670a9173e161de!2sNew%20Baneshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1765466794417!5m2!1sen!2snp"
        },
    ];

    const eventDetailsTitle = {
        id: 1,
        imgSrc: "/images/party.png",
        imgAlt: "Summer Music Festival",
        eventTitle: "Summer Music Festival",
        eventRating: 4.8,
        attendeeCount: 2450,
        organizerName: "Nikhil KC"
    };

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
    ]

    return (
        <section className='my-10 mx-5 px-4 text-text-dark font-cause'>

            {/* image and titles */}
            <div className='flex flex-row gap-10'>
                <div className='relative w-[400px] h-[250px]'>
                    <div className='absolute inset-0 bg-brown-normal rotate-3 rounded-xl'></div>
                    <img
                        src={eventDetailsTitle.imgSrc}
                        alt={eventDetailsTitle.imgAlt}
                        className='absolute inset-0 w-full h-full rounded-xl'
                    />
                </div>

                {/* title descriptions */}
                <div className='flex flex-col gap-4'>
                    <h1 className='text-4xl font-bold mt-5 font-dynapuff'>{eventDetailsTitle.eventTitle}</h1>
                    <div className='flex flex-row gap-3 items-center'>
                        <i className="fa-solid fa-star text-yellow-500 text-xl"></i>
                        <p>{`${eventDetailsTitle.eventRating} • ${eventDetailsTitle.attendeeCount} attendees`}</p>
                    </div>

                    <div className='flex flex-row items-center'>
                        <div className='border-2 border-brown-normal rounded-[50%] p-3 flex items-center justify-center'>
                            <i className="fa-solid fa-user text-2xl"></i>
                        </div>
                        <p className='ml-2'>Hosted by <span className='font-semibold font-dynapuff'>{eventDetailsTitle.organizerName}</span></p>
                    </div>

                    <div>
                        <Button
                            text="Book Now"
                            icon={<i className="fa-solid fa-arrow-right"></i>}
                            variant="cta"
                        />
                    </div>
                </div>
            </div>

            {/* Main content grid: left= event details + map, right= description */}
            <div className='flex flex-row gap-8 mt-5'>

                {/* Left column: event details + map */}
                <div>
                    {/* event card */}
                    <div className='w-[400px] border-2 border-brown-normal rounded-xl mt-5 p-4'>
                        <h2 className='text-lg font-dynapuff mb-4'>Event Details</h2>

                        <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                            <div className="flex items-center gap-3">
                                <div className="border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center w-[50px]">
                                    <i className="fa-solid fa-calendar text-2xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Date</h4>
                                    <p className="text-sm">August 15, 2024</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'>
                                <div className='border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center w-[50px]'>
                                    <i className="fa-solid fa-clock text-2xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Time</h4>
                                    <p className='text-sm'>3:00 PM - 11:00 PM</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'>
                                <div className='border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center w-[60px]'>
                                    <i className="fa-solid fa-location-dot text-2xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Location</h4>
                                    <p className='text-sm'>Central Park, New York City</p>
                                </div>
                            </div>

                            <div className='flex items-center gap-3'>
                                <div className='border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center w-[50px]'>
                                    <i className="fa-solid fa-user text-2xl"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold">Organizer</h4>
                                    <p className='text-sm'>Nikhil KC</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map directly under event details */}
                    {location.map((loc) => (
                        <Map key={loc.id} mapId={loc.id} mapUrl={loc.url} />
                    ))}

                    {/* tags */}
                    <div className='mt-5'>
                        <h2 className='text-lg font-dynapuff mb-4'>Tags</h2>
                        <div className='flex flex-wrap gap-2 w-[400px]'>

                            <Button
                                text='Concert'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='Festivals'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='Music'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='h'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='o'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='Concert'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='Concert'
                                variant='tag'
                                size='md'
                            ></Button>

                            <Button
                                text='Concert'
                                variant='tag'
                                size='md'
                            ></Button>

                        </div>
                    </div>
                </div>

                {/* Right column: Event Description */}
                <div className=' w-[800px] h-[450px] border-2 border-brown-normal rounded-xl p-6 mt-5 text-justify'>
                    <h2 className='text-lg font-dynapuff mb-4'>Event Description</h2>
                    <p className='leading-7 mb-4'>
                        Join us for the biggest summer music festival of the year! Experience an unforgettable evening filled with incredible performances from top artists, amazing food vendors, and a vibrant atmosphere.
                    </p>
                    <p className='leading-7 mb-4'>
                        This year's lineup features chart-topping artists and emerging talents across multiple genres. From pop to rock, electronic to indie, there's something for every music lover.
                    </p>
                    <p className='leading-7 mb-6 font-semibold'>What to Expect</p>
                    <ul className='list-disc list-inside space-y-1'>
                        <li>Live performances from 10+ artists</li>
                        <li>Food trucks and beverage stations</li>
                        <li>Interactive art installations</li>
                        <li>Professional photography zones</li>
                        <li>Merchandise booths</li>
                    </ul>
                </div>
            </div>

            {/* Photos*/}
            <div>
                <div className='flex flex-row items-center justify-between mt-5 mb-4'>
                    <h2 className='text-lg font-dynapuff my-4'>Photos</h2>
                    <Button
                        text='View Group Photos'
                        variant='cta'
                        icon={<i className="fa-solid fa-arrow-right"></i>}>

                    </Button>
                </div>

                <div className='flex gap-11 flex-wrap cursor-pointer'>
                    <div className='relative w-[200px] h-[150px] transform transition-all duration-300 ease-in-out hover:rotate-3 hover:scale-105'>
                        <div className='absolute inset-0 bg-red-200 rotate-5 rounded-xl '></div>
                        <img
                            src={eventDetailsTitle.imgSrc}
                            alt={eventDetailsTitle.imgAlt}
                            className='absolute inset-0 w-full h-full rounded-xl'
                        />
                    </div>

                    <div className='relative w-[200px] h-[150px] transform transition-all duration-300 ease-in-out hover:-rotate-3 hover:scale-105'>
                        <div className='absolute inset-0 bg-green-200 rotate-5 rounded-xl'></div>
                        <img
                            src={eventDetailsTitle.imgSrc}
                            alt={eventDetailsTitle.imgAlt}
                            className='absolute inset-0 w-full h-full rounded-xl'
                        />
                    </div>

                    <div className='relative w-[200px] h-[150px] transform transition-all duration-300 ease-in-out hover:rotate-3 hover:scale-105'>
                        <div className='absolute inset-0 bg-blue-200 rotate-5 rounded-xl'></div>
                        <img
                            src={eventDetailsTitle.imgSrc}
                            alt={eventDetailsTitle.imgAlt}
                            className='absolute inset-0 w-full h-full rounded-xl'
                        />
                    </div>

                    <div className='relative w-[200px] h-[150px] transform transition-all duration-300 ease-in-out hover:-rotate-3 hover:scale-105'>
                        <div className='absolute inset-0 bg-yellow-200 rotate-5 rounded-xl'></div>
                        <img
                            src={eventDetailsTitle.imgSrc}
                            alt={eventDetailsTitle.imgAlt}
                            className='absolute inset-0 w-full h-full rounded-xl'
                        />
                    </div>

                    <div className='relative w-[200px] h-[150px] transform transition-all duration-300 ease-in-out hover:rotate-3 hover:scale-105'>
                        <div className='absolute inset-0 bg-purple-200 rotate-5 rounded-xl'></div>
                        <img
                            src={eventDetailsTitle.imgSrc}
                            alt={eventDetailsTitle.imgAlt}
                            className='absolute inset-0 w-full h-full rounded-xl'
                        />
                    </div>

                </div>
            </div>

            {/* similar evnets */}
            <div className='mt-5'>
                <div className='flex flex-row items-center justify-between mt-5 mb-4'>
                    <h2 className='text-lg font-dynapuff my-4'>Similar Events</h2>
                    <Button
                        text='View Group Photos'
                        variant='cta'
                        icon={<i className="fa-solid fa-arrow-right"></i>}>
                    </Button>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-9 gap-x-15'>
                    {events.map((event, index) => (
                        <EventCard key={index} {...event}/>
                    ))}

                </div>

            </div>


        </section>
    );
};

export default page;
