import React from 'react'
import {
    Camera
} from 'lucide-react';
import Button from '../../../components/Button';
import SettingsTab from '../../../components/SettingsTab'
import SettingsHeading from '@/components/SettingsHeading';

const page = () => {
    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark
        md:my-3 md:mx-3 md:px-3
        lg:my-4 lg:mx-4 lg:px-4
        xl:my-6 xl:mx-6 xl:px-6
        2xl:my-8 2xl:mx-8 2xl:px-8'>

            <SettingsHeading/>

            <div className='flex flex-col gap-6 lg:flex-row lg:gap-12'>
                {/* tab */}
                <SettingsTab />


                {/* main tab */}
                <div className='border border-brown-normal rounded-xl p-4 w-full
                lg:p-6
                    xl:p-8
                    2xl:p-10 
'>
                    {/* titles */}
                    <div className='space-y-2'>
                        <h3 className='font-dynapuff text-xl'>Profile Information</h3>
                        <p className='text-lg font-bold'>Update your personal information and profile picture</p>
                    </div>

                    {/* change photo  */}
                    <div className='flex flex-row items-center gap-6 mt-6'>
                        <span className='border border-brown-normal rounded-full w-24 h-24 flex items-center justify-center font-bold text-xl'>
                            JD
                        </span>

                        <div className='space-y-2'>
                            <Button text="Change Photo" variant="cta" iconLeft={<Camera />} size='sm'></Button>
                            <p>JPG, PNG or GIF. Max size 5MB</p>
                        </div>
                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* form */}
                    <div className='flex flex-col gap-4 mt-4 '>

                        {/* first and last name */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>First Name</label>
                                <input type="text" className='border border-brown-normal rounded-md p-2' placeholder='John Doe' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Last Name</label>
                                <input type="text" className='border border-brown-normal rounded-md p-2' placeholder='John Doe' />
                            </div>
                        </div>

                        {/* email and phone number */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Email Address</label>
                                <input type="email" placeholder='johndoe@gmail.com' className='border border-brown-normal rounded-md p-2' ></input>
                            </div>

                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Phone Number</label>
                                <input type="tel" className='border border-brown-normal rounded-md p-2' placeholder='9876543210' />
                            </div>
                        </div>

                        {/* bio */}
                        <div className='flex flex-col'>
                            <label className='font-bold mb-1'>Bio</label>
                            <textarea className='border border-brown-normal rounded-md p-2' rows={4} placeholder='Tell us about yourself...'></textarea>
                        </div>


                        {/* location and website */}
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Location</label>
                                <input type="text" placeholder='New York, NY' className='border border-brown-normal rounded-md p-2 ' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold mb-1'>Website</label>
                                <input type="url" className='border border-brown-normal rounded-md p-2' placeholder='https://' />
                            </div>
                        </div>
                        
                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-4'></div>

                    {/* button */}

                    <div className='mt-4 flex justify-end'>
                        <Button text="Save Changes" variant="cta"></Button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default page
