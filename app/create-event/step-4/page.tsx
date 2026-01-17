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
                        Review and Publish
                    </h2>

                    {/* event information */}
                    <h3 className='font-bold'>Event Information</h3>
                    <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                        <p><strong>Title:</strong></p>
                        <p><strong>Category:</strong> </p>
                        <p><strong>Description:</strong></p>

                    </div>


                    {/* date and location */}
                    <h3 className='font-bold'>Date and Location </h3>
                    <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                        <p><strong>Start Time:</strong></p>
                        <p><strong>End Time:</strong> </p>
                        <p><strong>Venue:</strong></p>
                        <p><strong>Capacity:</strong></p>

                    </div>


                    {/* ticket */}
                    <h3 className='font-bold'>Tickets (2)</h3>
                    
                        <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                            <p><strong>General Admission</strong></p>
                            <p>Quantity: 100</p>
                            <p>Price: $50.00</p>
                        </div>
                        <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                            <p><strong>VIP</strong></p>
                            <p>Quantity: 50</p>
                            <p>Price: $150.00</p>
                        </div>
















                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 4 of 4</p>
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
                            <Link href=''>
                                <Button text="Publish Event" variant='cta' size='sm'></Button>
                            </Link>
                        </div></div>
                </div>
            </section>
        </div>
    )
}

export default page