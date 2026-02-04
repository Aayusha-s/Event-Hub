'use client';
import React, { useState } from 'react'
import SettingsHeading from '@/components/SettingsHeading'
import SettingsTab from '../../../components/SettingsTab'
import Button from '../../../components/Button';

import {
    Save,
    ToggleRight
} from 'lucide-react';
import ToggleSwitch from '@/components/ToggleSwitch';

const page = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        number:false,
        events:false,
        messages:true,
    })

    const toggleNotification =(key: keyof typeof notifications)=>{
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }
    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            <SettingsHeading />

            <div className='flex flex-col gap-6 lg:flex-row lg:gap-12'>
                

                    <SettingsTab />

                {/* main tab */}
                <div className='border border-brown-normal rounded-xl p-4 w-full
                    lg:p-6
                    xl:p-8
                    2xl:p-10'>

                    {/* titles */}
                    <div className='space-y-2'>
                        <h3 className='font-dynapuff text-xl'>Privacy Settings</h3>
                        <p className='text-lg font-bold'>Control who can see your information and activities</p>
                    </div>


                    {/* main tabs */}

                    {/* heading */}
                    <h4 className='font-bold mt-4 mb-2'>Profile Visibility</h4>


                    <div className='flex flex-col gap-3 md:gap-4'>
                        {/* public tab */}
                        <label className='flex flex-row items-center gap-3 md:gap-4 
                        border border-brown-normal rounded-lg p-3 md:p-4 
                        hover:bg-brown-light transition-colors cursor-pointer'>
                            <input type="radio" name="profile-visibility" value="public"
                                className='mt-1 w-4 h-4 text-brown-dark cursor-pointer' />
                            <div className='flex-1'>
                                <p className='font-medium'>Public</p>
                                <p className='text-text-dark/70 text-sm md:text-base'>Anyone can see your profile</p>
                            </div>
                        </label>


                        {/* friends tab */}
                        <label className='flex flex-row items-center gap-3 md:gap-4 
                        border border-brown-normal rounded-lg p-3 md:p-4 
                        hover:bg-brown-light transition-colors cursor-pointer'>
                            <input type="radio" name="profile-visibility" value="friends"
                                className='mt-1 w-4 h-4 text-brown-dark cursor-pointer' />
                            <div className='flex-1'>
                                <p className='font-medium'>Friends Only</p>
                                <p className='text-text-dark/70 text-sm md:text-base'>Only people you follow can see</p>
                            </div>
                        </label>


                        {/* private tab */}
                        <label className='flex flex-row items-center gap-3 md:gap-4 
                        border border-brown-normal rounded-lg p-3 md:p-4 
                        hover:bg-brown-light transition-colors cursor-pointer'>
                            <input type="radio" name="profile-visibility" value="private"
                                className='mt-1 w-4 h-4 text-brown-dark cursor-pointer' />
                            <div className='flex-1'>
                                <p className='font-medium'>Private</p>
                                <p className='text-text-dark/70 text-sm md:text-base'>Only you can see your profile</p>
                            </div>
                        </label>

                    </div>


                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active my-4 md:my-8 '></div>


                    {/* Toggle Settings */}
                    <div className='space-y-4 md:space-y-6'>

                        {/* Email toggle */}
                        <div className='flex flex-row sm:flex-row items-center justify-between gap-3'>
                            <div className='flex-1'>
                                <h4 className='font-bold text-lg mb-1'>Show Email Address</h4>
                                <p className='text-text-dark/70 text-md md:text-base'>Display email on your public profile</p>
                            </div>
                            <button className='sm:w-auto w-full max-w-[120px] flex justify-end sm:justify-center'>
                                
                                <ToggleSwitch
                                checked={notifications.email}
                                onChange={()=> toggleNotification('email')}
                                />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* Phone toggle */}
                        <div className='flex flex-row items-center justify-between gap-3'>
                            <div className='flex-1'>
                                <h4 className='font-bold text-lg mb-1'>Show Phone Number</h4>
                                <p className='text-text-dark/70 text-md md:text-base'>Display phone on your public profile</p>
                            </div>
                            <button className='sm:w-auto w-full max-w-[120px] flex justify-end sm:justify-center'>
                                <ToggleSwitch
                                checked={notifications.number}
                                onChange={()=> toggleNotification('number')}
                                />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* Events toggle */}
                        <div className='flex flex-row items-center justify-between gap-3'>
                            <div className='flex-1'>
                                <h4 className='font-bold text-lg mb-1'>Show Attending Events</h4>
                                <p className='text-text-dark/70 text-md md:text-base'>Let others see events you're attending</p>
                            </div>
                            <button className='sm:w-auto w-full max-w-[120px] flex justify-end sm:justify-center'>
                                <ToggleSwitch
                                checked={notifications.events}
                                onChange={()=> toggleNotification('events')}
                                />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className='w-full h-0.5 bg-brown-light-active'></div>

                        {/* Messages toggle */}
                        <div className='flex flex-row items-center justify-between gap-3'>
                            <div className='flex-1'>
                                <h4 className='font-bold text-lg mb-1'>Allow Direct Messages</h4>
                                <p className='text-text-dark/70 text-md md:text-base'>Let other users message you</p>
                            </div>
                            <button className='sm:w-auto w-full max-w-[120px] flex justify-end sm:justify-center'>
                                <ToggleSwitch
                                checked={notifications.messages}
                                onChange={()=> toggleNotification('messages')}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='w-full h-0.5 bg-brown-light-active my-6 md:my-8'></div>

                    {/* button */}
                    <div className='flex justify-end'>
                        <Button text="Save Settings" variant="cta" iconLeft={<Save />} ></Button>
                    </div>
                </div>



            </div>
        </section>
    )
}

export default page
