'use client';
import React, { useState } from 'react'
import Button from '@/components/Button';
import Link from 'next/link';
import { CircleX, Plus } from 'lucide-react';

const Page = () => {

    const [showTicketBox, setShowTicketBox] = useState(true);

    return (
        <div>
            <section className='flex flex-col'>
                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <div className='flex justify-between '>
                        <h2 className='text-lg md:text-xl lg:text-xl font-bold'>
                            Ticket & Pricing
                        </h2>

                        <Button
                            text='Add Ticket Type'
                            size='sm'
                            variant='cta'
                            iconLeft={<Plus />}>
                        </Button>
                    </div>


                    {showTicketBox && (
                        <div className='border border-brown-normal rounded-xl p-2'>
                            <div className='flex justify-end'>
                                <CircleX className='mb-2 cursor-pointer text-brown-dark hover:text-brown-normal' onClick={() => setShowTicketBox(false)} />
                            </div>

                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <label className='block mb-1 font-medium' htmlFor='ticket-name'>Ticket Name *</label>
                                    <select className='w-full p-2 border border-gray-300 rounded-md' id='ticket-name' name='ticket-name' required>
                                        <option value="">Select an option</option>
                                        <option value="general-admission">General Admission</option>
                                        <option value="vip">VIP</option>
                                        <option value="early-bird">Early Bird</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='block mb-1 font-medium' htmlFor='ticket-quantity'> Available Quantity *</label>
                                    <input className='w-full p-2 border border-gray-300 rounded-md' type='number' id='ticket-quantity' name='ticket-quantity' placeholder='e.g. 100' required />
                                </div>
                                <div>
                                    <label className='block mb-1 font-medium' htmlFor='ticket-price'>Price *</label>
                                    <input className='w-full p-2 border border-gray-300 rounded-md' type='number' id='ticket-price' name='ticket-price' placeholder='e.g. 50.00' required />
                                </div>
                                <div>
                                    <label className='block mb-1 font-medium' htmlFor='ticket-description'> Description *</label>
                                    <textarea className='w-full p-2 border border-gray-300 rounded-md' rows={4} id='ticket-description' name='ticket-description' placeholder="What's included in this ticket" required ></textarea>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 3 of 4</p>
                    </div>


                    <div className='flex justify-between'>
                        {/* previous button */}
                        <div className='flex justify-end'>
                            <Link href='/create-event/step-2'>
                                <Button text="Previous Step" variant='cta' size='sm'></Button>
                            </Link>
                        </div>


                        {/* next button */}
                        <div className='flex justify-end'>
                            <Link href='/create-event/step-4'>
                                <Button text="Next Step" variant='cta' size='sm'></Button>
                            </Link>
                        </div></div>
                </div>
            </section>
        </div>
    )
}

export default Page