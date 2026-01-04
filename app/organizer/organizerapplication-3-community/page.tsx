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
                        Documentation
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        Upload required documents based on your organizer type
                    </p>


                    {/* organization type   */}
                    <div className='border border-brown-normal rounded-md p-2 bg-white flex flex-col gap-2'>
                        <h2 className='text-sm md:text-md lg:text-md font-bold'>Individual/Community Organizer Requirements</h2>
                        <p className='text-sm md:text-md lg:text-md'>Please provide the following documents</p>
                    </div>

                    {/* upload id proof */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">Upload ID Proof *</label>
                        <div className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">Upload government-issued ID</p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">PDF, JPG, or PNG (Max 5MB)</p>
                        </div>


                    </div>



                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">Previous Event Photos (3+) *</label>
                        <div
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">Upload at least 3 photos from past events</p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">Multiple files accepted (JPG or PNG)</p>
                        </div>


                    </div>

                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">References (Optional)</label>
                        <textarea
                            rows={3}
                            className="text-sm md:text-md lg:text-md w-full px-4 py-3 border border-brown-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-dark"
                            placeholder="Provide contact information for references who can vouch for your event organizing experience..."
                        />
                    </div>

                    {/* divider and steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 3 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-between'>
                        <Link href='/organizer/organizerapplication-2' >
                            <Button text="Previous Step" variant='cta' size='sm'></Button>
                        </Link>
                        <Link href='/organizer/organizerapplication-4'>
                            <Button text="Next Step" variant='cta' size='sm'></Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page
