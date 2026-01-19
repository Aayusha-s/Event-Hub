import React from 'react'
import Button from '@/components/Button';
import Link from 'next/link';

const page = () => {
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
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <h2 className="font-bold">End Date *</h2>
                            <input
                                type="date"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                            />
                        </div>



                        {/* Start Time */}
                        <div>
                            <h2 className="font-bold">Start Time *</h2>
                            <input
                                type="time"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
                            />
                        </div>


                        {/* End Time */}
                        <div>
                            <h2 className="font-bold">End Time *</h2>
                            <input
                                type="time"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
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
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>{/* City*/}
                        <div>
                            <h2 className="font-bold">City *</h2>
                            <input
                                type="text"
                                placeholder="e.g., New York"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                required
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
                            <Link href='/create-event/step-3'>
                                <Button text="Next Step" variant='cta' size='sm'></Button>
                            </Link>
                        </div></div>
                </div>
            </section>
        </div>
    )
}

export default page