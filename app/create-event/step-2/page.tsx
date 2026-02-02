'use client';
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venueName, setVenueName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [eventCapacity, setEventCapacity] = useState('');
    const router = useRouter();

    useEffect(()=> {
        const savedEventDetails = localStorage.getItem('EventDetails');

        if (savedEventDetails) {
            const data = JSON.parse(savedEventDetails);
            setStartDate(data.startDate || '');
            setEndDate(data.endDate || '');
            setStartTime(data.startTime || '');
            setEndTime(data.endTime || '');
            setVenueName(data.venueName || '');
            setStreetAddress(data.streetAddress || '');
            setCity(data.city || '');
            setState(data.state || '');
            setEventCapacity(data.eventCapacity || '');
        }
    },[])

    const handleNext = () => {
        if (!startDate || !endDate || !startTime || !endTime || !venueName || !streetAddress || !city || !state || !eventCapacity) {
            alert('Please fill in all required fields.');
            return;
        }
        const EventDetails = {
            startDate,
            endDate,
            startTime,
            endTime,
            venueName,
            streetAddress,
            city,
            state,
            eventCapacity,
        }

        localStorage.setItem(
            'EventDetails',
            JSON.stringify(EventDetails)
        )

        router.push('/create-event/step-3');

    }


    return (
        <div>
            <section className='flex flex-col'>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='text-lg md:text-xl lg:text-xl font-bold'>
                        Event Details
                    </h2>


                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        {/* Start Date */}
                        <div>
                            <h2 className="font-bold">Start Date *</h2>
                            <input
                                type="date"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <h2 className="font-bold">End Date *</h2>
                            <input
                                type="date"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>



                        {/* Start Time */}
                        <div>
                            <h2 className="font-bold">Start Time *</h2>
                            <input
                                type="time"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>


                        {/* End Time */}
                        <div>
                            <h2 className="font-bold">End Time *</h2>
                            <input
                                type="time"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Venue Name */}
                        <div>
                            <h2 className="font-bold">Venue Name *</h2>
                            <input
                                type="text"
                                placeholder="e.g., Central Park"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={venueName}
                                onChange={(e) => setVenueName(e.target.value)}
                            />
                        </div>


                        {/* Street Address*/}
                        <div>
                            <h2 className="font-bold">Street Address *</h2>
                            <input
                                type="text"
                                placeholder="e.g., 123 Main Street"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{/* City*/}

                        {/* city */}
                        <div>
                            <h2 className="font-bold">City *</h2>
                            <input
                                type="text"
                                placeholder="e.g., New York"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        {/*State*/}
                        <div>
                            <h2 className="font-bold">State *</h2>
                            <input
                                type="text"
                                placeholder="e.g., NY"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>

                        {/* Event Capacity*/}
                        <div>
                            <h2 className="font-bold">Event Capacity *</h2>
                            <input
                                type='number'
                                min={1}
                                placeholder="e.g., 500"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                                value={eventCapacity}
                                onChange={(e) => setEventCapacity(e.target.value)}
                            />
                        </div>
                    </div>



                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 2 of 4</p>
                    </div>


                    <div className='flex justify-between'>
                        {/* previous button */}
                        <div className='flex justify-end'>
                            <Link href='/create-event/step-1'>
                                <Button text="Previous Step" variant='cta' size='sm'></Button>
                            </Link>
                        </div>


                        {/* next button */}
                        <div className='flex justify-end'>

                            <Button 
                            text="Next Step" 
                            variant='cta' 
                            size='sm'
                            onClick={handleNext}></Button>

                        </div></div>
                </div>
            </section>
        </div>
    )
}

export default Page