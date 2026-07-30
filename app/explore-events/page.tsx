"use client";
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import Button from '@/components/Button';
import { ListFilter, MapPin, Clock, Calendar, X } from 'lucide-react'

const ExploreEventsContent = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('query')?.trim().toLowerCase() ?? '';
    const searchLocation = searchParams.get('location')?.trim().toLowerCase() ?? '';

    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        dateRange: '',
        timeRange: '',
        distance: '',
        price: '',
        location: ''
    });

    const handleFilterChange = (filterType: string, value: string) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearAllFilters = () => {
        setSelectedFilters({
            category: '',
            dateRange: '',
            timeRange: '',
            distance: '',
            price: '',
            location: ''
        });
    };

    const events = useMemo(() => [
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
    ], [])

    const [showFilterBar, setShowFilterBar] = useState(() => searchParams.get('filters') === 'open');

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesQuery = !searchQuery || [
                event.title,
                event.organizer,
                event.location,
                ...event.tags,
                ...event.descriptions,
            ]
                .join(' ')
                .toLowerCase()
                .includes(searchQuery);

            const matchesLocation = !searchLocation || event.location.toLowerCase().includes(searchLocation);

            const matchesSelectedLocation =
                !selectedFilters.location || event.location.toLowerCase().includes(selectedFilters.location);

            const matchesCategory =
                !selectedFilters.category || event.tags.join(' ').toLowerCase().includes(selectedFilters.category);

            return matchesQuery && matchesLocation && matchesSelectedLocation && matchesCategory;
        });
    }, [events, searchLocation, searchQuery, selectedFilters.category, selectedFilters.location]);
    
    return (
        <section className='text-text-dark my-10 mx-5 px-4'>
            {/* title */}
            <div className="flex flex-row items-center">
                <h2 className="text-3xl font-semibold text-text-dark font-dynapuff">
                    Explore Events
                </h2>
            </div>

            {/* view style */}
            <div className='flex justify-end gap-4 mb-4 mt-2 cursor-pointer'>
                <ListFilter onClick={() => setShowFilterBar(!showFilterBar)} />
                {/* <i className="fa-solid fa-table-cells text-2xl"></i>
                <i className="fa-solid fa-list text-2xl"></i> */}
            </div>


            {showFilterBar && (
                <>
                    {/* FILTERS BAR */}
                    <div className="flex flex-col gap-4 mb-6 p-4 border border-brown-normal rounded-xl bg-brown-light">

                        {/* Row 1: Main Filters */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Category Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-dark mb-1">
                                    Category
                                </label>
                                <select
                                    value={selectedFilters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm"
                                >
                                    <option value="">All Categories</option>
                                    <option value="music">Music</option>
                                    <option value="art">Art</option>
                                    <option value="tech">Tech</option>
                                    <option value="food">Food</option>
                                    <option value="health">Health</option>
                                    <option value="business">Business</option>
                                </select>
                            </div>

                            {/* Date Range Filter */}
                            <div className="flex-1">
                                <label className="text-sm font-medium text-text-dark mb-1 flex items-center gap-1">
                                    <Calendar size={14} />
                                    Date Range
                                </label>
                                <select
                                    value={selectedFilters.dateRange}
                                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm"
                                >
                                    <option value="">Any Date</option>
                                    <option value="today">Today</option>
                                    <option value="tomorrow">Tomorrow</option>
                                    <option value="this-weekend">This Weekend</option>
                                    <option value="this-week">This Week</option>
                                    <option value="next-week">Next Week</option>
                                    <option value="this-month">This Month</option>
                                    <option value="next-month">Next Month</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                            </div>

                            {/* Time Range Filter */}
                            <div className="flex-1">
                                <label className="text-sm font-medium text-text-dark mb-1 flex items-center gap-1">
                                    <Clock size={14} />
                                    Time of Day
                                </label>
                                <select
                                    value={selectedFilters.timeRange}
                                    onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm"
                                >
                                    <option value="">Any Time</option>
                                    <option value="morning">Morning (6AM-12PM)</option>
                                    <option value="afternoon">Afternoon (12PM-5PM)</option>
                                    <option value="evening">Evening (5PM-9PM)</option>
                                    <option value="night">Night (9PM-6AM)</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 2: Distance, Price, Location */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Distance Within Filter */}
                            <div className="flex-1">
                                <label className="text-sm font-medium text-text-dark mb-1 flex items-center gap-1">
                                    <MapPin size={14} />
                                    Distance Within
                                </label>
                                <select
                                    value={selectedFilters.distance}
                                    onChange={(e) => handleFilterChange('distance', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm"
                                >
                                    <option value="">Any Distance</option>
                                    <option value="1km">Within 1 km</option>
                                    <option value="5km">Within 5 km</option>
                                    <option value="10km">Within 10 km</option>
                                    <option value="25km">Within 25 km</option>
                                    <option value="50km">Within 50 km</option>
                                    <option value="100km">Within 100 km</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-dark mb-1">
                                    Price Range
                                </label>
                                <select
                                    value={selectedFilters.price}
                                    onChange={(e) => handleFilterChange('price', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm">
                                    <option value="">Any Price</option>
                                    <option value="free">Free Events</option>
                                    <option value="under-500">Under Rs. 500</option>
                                    <option value="500-1000">Rs. 500 - 1,000</option>
                                    <option value="1000-2000">Rs. 1,000 - 2,000</option>
                                    <option value="2000+">Above Rs. 2,000</option>
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-text-dark mb-1">
                                    Location
                                </label>
                                <select
                                    value={selectedFilters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    className="w-full border border-brown-normal rounded-lg px-3 py-2 bg-white text-sm"
                                >
                                    <option value="">All Locations</option>
                                    <option value="kathmandu">Kathmandu Valley</option>
                                    <option value="pokhara">Pokhara</option>
                                    <option value="lalitpur">Lalitpur</option>
                                    <option value="bhaktapur">Bhaktapur</option>
                                    <option value="chitwan">Chitwan</option>
                                    <option value="biratnagar">Biratnagar</option>
                                    <option value="butwal">Butwal</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 border-t border-brown-normal/50">
                            {/* Active Filters Display */}
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(selectedFilters)
                                    .filter(([, value]) => value !== '')
                                    .map(([key, value]) => (
                                        <span
                                            key={key}
                                            className="px-3 py-1 bg-brown-light rounded-full text-sm flex items-center gap-1">
                                            {key}: {value}

                                            <button
                                                onClick={() => handleFilterChange(key, '')}
                                                className="ml-1 hover:text-brown-darker">
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))
                                }
                            </div>

                            {/* Action Buttons */}
                            <div className="flex  gap-3">
                                <Button text="Clear All Filters" variant="cta" onClick={clearAllFilters}></Button>

                                <Button text={`Apply Filters (${Object.values(selectedFilters).filter(v => v !== '').length})`} variant="cta"
                                    onClick={() => { }} />
                            </div>
                        </div>
                    </div>

                </>
            )}
            {/* contents */}
            <div className='grid grid-cols-1 gap-y-9 gap-x-17 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 2xl:grid-cols-4'>
                {filteredEvents.map((event, index) => (
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

const Page = () => (
    <Suspense fallback={<div className="px-5 py-10 text-text-muted">Loading events…</div>}>
        <ExploreEventsContent />
    </Suspense>
);

export default Page