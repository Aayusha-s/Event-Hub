import React from 'react'
import { ArrowLeft, Check, Upload } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';

const page = () => {
    return (
        <div>
            <section className='flex flex-col
                my-4 mx-2 px-4 font-cause text-text-dark 
                md:my-3 md:mx-3 md:px-3
                lg:my-4 lg:mx-4 lg:px-4
                xl:my-6 xl:mx-6 xl:px-6
                2xl:my-8 2xl:mx-8 2xl:px-8'>

                {/* back to dashboard button */}
                <div className='mb-4'>
                    <Button text="Back to Dashboard" variant='cta' size='sm' iconLeft={<ArrowLeft />}></Button>
                </div>

                {/* title and subtitle */}
                <div className='flex flex-row items-center gap-4 mb-4'>
                    <div className='relative bg-brown-normal p-4 rounded-md w-12 h-12 flex items-center justify-center'>
                        <Check strokeWidth={4} className='absolute text-white' />
                    </div>

                    <div className='flex flex-col'>
                        <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-semibold '>
                            Vendor Application
                        </h2>
                        <p className='text-base md:text-md lg:text-md'>
                            Join EventHub as a verified vendor
                        </p>
                    </div>
                </div>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-medium'>
                        Products & services
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        What will you be offering at events?
                    </p>

                    {/* business type */}

                    <div>
                        <h2 className="font-bold">Business Type *</h2>
                        <select name="business_type" id="business_type" className="w-full border border-brown-normal rounded-md p-3 mt-1">
                            <option value="">Select an option</option>
                            <option value="music_concerts">Music Concerts</option>
                            <option value="concert_parties">Concert/Parties</option>
                            <option value="business_events">Business Events</option>
                            <option value="workshops_seminars">Workshops/Seminars</option>
                            <option value="sports_events">Sports Events</option>
                            <option value="community_events">Community Events</option>
                            <option value="festivals_fairs">Festivals/Fairs</option>
                            <option value="charity_nonprofit_events">Charity/Non-Profit Events</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    {/* past experience */}
                    <div>
                        <h3 className='font-bold'>Product/Service List</h3>
                        <textarea
                            placeholder='List all products or services you plan to offer at events. Example: Food and beverages, merchandise, promotional items, etc.'
                            className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'
                        ></textarea>
                    </div>

                    {/* price range */}
                    <div>
                        <h2 className="font-bold">Price Range *</h2>
                        <select name="price_range" id="price_range" className="w-full border border-brown-normal rounded-md p-3 mt-1">
                            <option value="">Select an option</option>
                            <option value="under_50">Under $50</option>
                            <option value="50_100">$50 - $100</option>
                            <option value="100_500">$100 - $500</option>
                            <option value="500_1000">$500 - $1000</option>
                            <option value="1000_plus">Over $1000</option>
                            <option value="other">Other</option>
                        </select>
                    </div>


                    {/* Booth setup requirements */}
                    <div>
                        <h3 className='font-bold'>Booth Setup Requirements</h3>
                        <textarea
                            placeholder='Describe your booth setup need (electricity, water, space requirements, equipment etc.)'
                            className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'></textarea>
                    </div>

                    {/* booth photos */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">Booth Photos (Optional) *</label>
                        <div
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">Upload photos of your booth setup or products</p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">PDF, JPG, or PNG (Max 5 images)</p>
                        </div>
                    </div>


                    {/* divider and steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 2 of 3</p>
                    </div>


                    {/* next button */}
                    <div className='flex justify-between'>
                        <Link href='/vendor/vendorapplication-1' >
                            <Button text="Previous Step" variant='cta' size='sm'></Button>
                        </Link>
                        <Link href='/vendor/vendorapplication-3'>
                            <Button text="Next Step" variant='cta' size='sm'></Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page
