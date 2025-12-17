"use client";
import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import Map from '@/components/Map';
import Link from 'next/link';

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
        {
            eventId: 4,
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
        <section className='my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            
            <div className='flex flex-col gap-8 lg:flex-row lg:gap-12'>
                
                <div className='hidden lg:block relative w-full lg:w-2/5 xl:w-2/5'>
                    <div className='absolute inset-0 bg-brown-normal rotate-3 rounded-xl'></div>
                    <img
                        src={eventDetailsTitle.imgSrc}
                        alt={eventDetailsTitle.imgAlt}
                        className='absolute inset-0 w-full h-full object-cover rounded-xl'
                    />
                </div>

                {/* Title and Details */}
                <div className='flex flex-col gap-4 lg:w-3/5'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2 lg:mt-5 font-dynapuff'>
                        {eventDetailsTitle.eventTitle}
                    </h1>
                    <div className='flex flex-row gap-3 items-center'>
                        <i className="fa-solid fa-star text-yellow-500 text-lg md:text-xl"></i>
                        <p className='text-base md:text-lg'>{`${eventDetailsTitle.eventRating} • ${eventDetailsTitle.attendeeCount} attendees`}</p>
                    </div>

                    <div className='flex flex-row items-center gap-3'>
                        <div className='border-2 border-brown-normal rounded-full p-2 md:p-3 flex items-center justify-center w-12 h-12 md:w-14 md:h-14'>
                            <Link href="/userprofile"> 
                                <i className="fa-solid fa-user text-xl md:text-2xl"></i>
                            </Link>
                        </div>
                        <p className='ml-2 text-base md:text-lg'>
                            Hosted by{" "}
                            <Link href="/userprofile">
                                <span className='font-semibold font-dynapuff hover:text-brown-dark'>
                                    {eventDetailsTitle.organizerName}
                                </span>
                            </Link>
                        </p>
                    </div>

                    <div className='mt-4'>
                        <Button
                            text="Book Now"
                            iconRight={<i className="fa-solid fa-arrow-right"></i>}
                            variant="cta"
                            size="lg"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className='flex flex-col gap-8 mt-8 lg:flex-row lg:gap-12'>
                {/* Left Column: Event Details + Map + Tags */}
                <div className='lg:w-1/3'>
                    {/* Event Details Card */}
                    <div className='w-full border-2 border-brown-normal rounded-xl p-4 md:p-6'>
                        <h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-4 md:mb-6'>
                            Event Details
                        </h2>

                        <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 '>
                            {[
                                { icon: "fa-solid fa-calendar", title: "Date", text: "August 15, 2024" },
                                { icon: "fa-solid fa-clock", title: "Time", text: "3:00 PM - 11:00 PM" },
                                { icon: "fa-solid fa-location-dot", title: "Location", text: "Central Park, New York City" },
                                { icon: "fa-solid fa-user", title: "Organizer", text: "Nikhil KC" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3 md:gap-4">
                                    <div className="border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center shrink-0">
                                        <i className={`${item.icon} text-xl md:text-2xl`}></i>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-semibold text-base md:text-lg">{item.title}</h4>
                                        <p className="text-sm md:text-base text-text-dark/80">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map */}
                    <div className='mt-6 md:mt-8'>
                        {location.map((loc) => (
                            <Map key={loc.id} mapId={loc.id} mapUrl={loc.url} />
                        ))}
                    </div>

                    {/* Tags */}
                    <div className='mt-6 md:mt-8'>
                        <h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 md:mb-4'>
                            Tags
                        </h2>
                        <div className='flex flex-wrap gap-2'>
                            {["Concert", "Festivals", "Music", "Live Performance", "Outdoor", "Summer", "Entertainment", "Party"].map((tag, index) => (
                                <Button
                                    key={index}
                                    text={tag}
                                    variant='tag'
                                    size='sm'
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Event Description */}
                <div className='w-full lg:w-2/3 border-2 border-brown-normal rounded-xl p-4 md:p-6 mt-5 lg:mt-0'>
                    <h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-4 md:mb-6'>
                        Event Description
                    </h2>
                    <div className='space-y-4'>
                        <p className='leading-relaxed text-base md:text-lg'>
                            Join us for the biggest summer music festival of the year! Experience an unforgettable evening filled with incredible performances from top artists, amazing food vendors, and a vibrant atmosphere.
                        </p>
                        <p className='leading-relaxed text-base md:text-lg'>
                            This year's lineup features chart-topping artists and emerging talents across multiple genres. From pop to rock, electronic to indie, there's something for every music lover.
                        </p>
                        <p className='leading-relaxed text-base md:text-lg font-semibold'>What to Expect</p>
                        <ul className='list-disc list-inside space-y-2 text-base md:text-lg'>
                            <li>Live performances from 10+ artists</li>
                            <li>Food trucks and beverage stations</li>
                            <li>Interactive art installations</li>
                            <li>Professional photography zones</li>
                            <li>Merchandise booths</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Photos Section */}
            <div className='mt-8 md:mt-12'>
                <div className='flex flex-row sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6'>
                    <h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 sm:mb-0'>
                        Photos
                    </h2>
                    <Button
                        text='View All'
                        variant='cta'
                        size='sm'
                        iconRight={<i className="fa-solid fa-arrow-right"></i>}
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div 
                            key={item} 
                            className='relative w-full h-48 md:h-56 lg:h-48 xl:h-56 
                                transform transition-all duration-300 ease-in-out 
                                hover:scale-105 hover:shadow-lg cursor-pointer'
                        >
                            <div className={`absolute inset-0 rotate-3 rounded-xl 
                                ${item === 1 ? 'bg-red-200' : 
                                    item === 2 ? 'bg-green-200' : 
                                  item === 3 ? 'bg-blue-200' : 
                                  item === 4 ? 'bg-yellow-200' : 'bg-purple-200'}`} 
                            />
                            <img
                                src={eventDetailsTitle.imgSrc}
                                alt={`${eventDetailsTitle.imgAlt} ${item}`}
                                className='absolute inset-0 w-full h-full object-cover rounded-xl'
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Similar Events */}
            <div className='mt-10 md:mt-16'>
                <div className='flex flex-row sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6'>
                    <h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 sm:mb-0'>
                        Similar Events
                    </h2>
                    <Button
                        text='View More'
                        variant='cta'
                        size='sm'
                        iconRight={<i className="fa-solid fa-arrow-right"></i>}
                    />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
                    {events.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default page;