import React from 'react'
import { ArrowLeft, Check } from 'lucide-react';
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
                            Organizer Application
                        </h2>
                        <p className='text-base md:text-md lg:text-md'>
                            Tell us about your organization
                        </p>
                    </div>
                </div>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-medium'>
                        Event Experience & Planning
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        Share your event plaaning background and goals
                    </p>


                    {/* organization type   */}
                        <h2 className='font-bold text-md'>Type of Events You Organize</h2>
                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-10 gap-4'>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="checkbox" id="music" name="event_type" value="music" />
                            <label htmlFor="music" className='cursor-pointer'>Music</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="checkbox" id="business" name="event_type" value="business" />
                            <label htmlFor="business" className='cursor-pointer'>Business</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="checkbox" id="fooddrink" name="event_type" value="fooddrink" />
                            <label htmlFor="fooddrink" className='cursor-pointer'>Food & Drink</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3 border border-brown-normal rounded-md cursor-pointer">
                            <input type="checkbox" id="comedy" name="event_type" value="comedy" />
                            <label htmlFor="comedy" className='cursor-pointer'>Comedy</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="nightlife" name="event_type" value="nightlife" />
                            <label htmlFor="nightlife" className='cursor-pointer'>NightLife</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="arttheatre" name="event_type" value="arttheatre" />
                            <label htmlFor="arttheatre" className='cursor-pointer'>Art & Theatre</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="creative" name="event_type" value="creative" />
                            <label htmlFor="creative" className='cursor-pointer'>Creative</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="learning" name="event_type" value="learning" />
                            <label htmlFor="learning" className='cursor-pointer'>Learning</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="festivals" name="event_type" value="festivals" />
                            <label htmlFor="festivals" className='cursor-pointer'>Festivals</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="community" name="event_type" value="community" />
                            <label htmlFor="community" className='cursor-pointer'>Community</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="social" name="event_type" value="social" />
                            <label htmlFor="social" className='cursor-pointer'>Social</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="sports_fitness" name="event_type" value="sports_fitness" />
                            <label htmlFor="sports_fitness" className='cursor-pointer'>Sports & Fitness</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="wellness" name="event_type" value="wellness" />
                            <label htmlFor="wellness" className='cursor-pointer'>Wellness</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="gaming" name="event_type" value="gaming" />
                            <label htmlFor="gaming" className='cursor-pointer'>Gaming</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full border border-brown-normal rounded-md p-3 cursor-pointer">
                            <input type="checkbox" id="family" name="event_type" value="family" />
                            <label htmlFor="family" className='cursor-pointer'>Family</label>
                        </div>
                    </div>
                    


                    {/* past experience */}
                    <div>
                        <h3 className='font-bold'>Past Experience</h3>
                        <textarea
                            placeholder='Describe your past event organizing experience, include name, date and attendance number'
                            className='w-full border border-brown-normal rounded-md p-2 mt-1 h-32 resize-none'
                        ></textarea>
                    </div>

                    

                    {/* divider and steps */}

                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 2 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-between'>
                        <Link href='/organizer/organizerapplication-1' >
                        <Button text="Previous Step" variant='cta' size='sm'></Button>
                        </Link>
                        <Link href='/organizer/organizerapplication-3-individual'>
                        <Button text="Next Step" variant='cta' size='sm'></Button>
                        </Link>
                    </div>



                </div>


            </section>

        </div>
    )
}

export default page
