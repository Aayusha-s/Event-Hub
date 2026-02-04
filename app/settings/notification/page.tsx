'use client'
import React, { useState } from 'react'
import SettingsHeading from '@/components/SettingsHeading'
import SettingsTab from '../../../components/SettingsTab'
import Button from '../../../components/Button';

import {
    ToggleRight
} from 'lucide-react';
import ToggleSwitch from '@/components/ToggleSwitch';

const Page = () => {
    const [notifications, setNotifications] = useState(
        {
            email: true,
            push: false,
            reminders: true,
            tickets: false,
            promotions: false,
            weekly: true,
            vendor: false,
            organizer: true,
        }
    )

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key],
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
                        <h3 className='font-dynapuff text-xl'>Notification</h3>
                        <p className='text-lg font-bold'>Choose how you want to be notified about events and updates</p>
                    </div>


                    {/* main tabs */}
                    {/* tab 1 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Email Notifications</h4>
                            <p>Receive notification via email</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.email}
                            onChange={() => toggleNotification('email')} />

                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>



                    {/* tab 2 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Push Notifications</h4>
                            <p>Receive push notification on your device</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.push}
                            onChange={() => toggleNotification('push')} />
                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>


                    {/* tab 3 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Event Reminders</h4>
                            <p>Get reminded about incoming events</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.reminders}
                            onChange={() => toggleNotification('reminders')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>


                    {/* tab 4 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Ticket Updates</h4>
                            <p>Updates about your upcoming events</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.tickets}
                            onChange={() => toggleNotification('tickets')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>



                    {/* tab 5 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Promotions & Offers</h4>
                            <p>Special deals and promotional emails</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.promotions}
                            onChange={() => toggleNotification('promotions')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>



                    {/* tab 6 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Weekly Digest</h4>
                            <p>Weekly summary of new events</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.weekly}
                            onChange={() => toggleNotification('weekly')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>



                    {/* tab 7 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Vendor Updates</h4>
                            <p>Notifications about your vendor activities</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.vendor}
                            onChange={() => toggleNotification('vendor')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>



                    {/* tab 8 */}
                    <div className='flex flex-row items-center justify-between'>
                        <div>
                            <h4 className='font-bold mt-4 mb-2'>Organizer News</h4>
                            <p>Updates for event organizers</p>
                        </div>
                        <ToggleSwitch
                            checked={notifications.organizer}
                            onChange={() => toggleNotification('organizer')} />                    </div>

                    {/* divider */}
                    <div className='w-full h-0.5 bg-brown-light-active mt-3'></div>

                    {/* button */}
                    <div className='mt-4 flex justify-end'>
                        <Button text="Save Changes" variant="cta"></Button>
                    </div>
                </div>



            </div>
        </section>
    )
}


export default Page
