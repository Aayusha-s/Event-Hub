'use client';
import Button from '@/components/Button'
import UserAvatar from '@/components/UserAvatar';
import { EllipsisVertical, PhoneCall, Search, User, Video } from 'lucide-react'
import React from 'react'
import { useState } from 'react';

const Page = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'attendees' | 'vendors' | 'organizers'>("all");
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            <div className='grid md:grid-cols-[2fr_3fr] gap-4'>

                {/* left side */}
                <div className='border bg-white p-4 rounded-xl'>
                    <div className='border rounded-xl p-2 flex items-center gap-3'>
                        <Search className="w-4 h-4 text-text-light " />
                        <input
                            type="text"
                            placeholder='Search messages...'
                            className='w-full bg-transparent text-text-light placeholder:text-text-light/70 focus:outline-none'
                        />
                    </div>

                    <div className='flex justify-between gap-2 mt-4'>
                        <Button
                            text="All"
                            variant='cta'
                            size='sm'
                            onClick={() => setActiveTab("all")}
                        />
                        <Button
                            text="Attendees"
                            variant='cta'
                            size='sm'
                            onClick={() => setActiveTab("attendees")}
                        />
                        <Button
                            text="Vendors"
                            variant='cta'
                            size='sm'
                            onClick={() => setActiveTab("vendors")}
                        />
                        <Button
                            text="Organizers"
                            variant='cta'
                            size='sm'
                            onClick={() => setActiveTab("organizers")}
                        />
                    </div>

                    {/* divider */}
                    <div className='border my-4 '></div>

                    {activeTab === "all" && (

                        <div className='flex flex-col gap-4'>
                            {/* message 1 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='AS' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Alice Smith</h3>
                                            <button className='text-xs bg-orange-100 rounded-xl px-2 py-1 text-orange-600'>organizer</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>

                            {/* message 2 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='MC' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Mike Chen</h3>
                                            <button className='text-xs bg-blue-100 rounded-xl px-2 py-1 text-blue-600'>attendee</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>


                            {/* message 3 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='ED' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Emma Davis</h3>
                                            <button className='text-xs bg-orange-100 rounded-xl px-2 py-1 text-orange-600'>organizer</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>


                            {/* message 4 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='DW' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>David Wilson</h3>
                                            <button className='text-xs bg-green-100 rounded-xl px-2 py-1 text-green-600'>vendor</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>
                        </div>
                    )}

                    {activeTab === "attendees" && (

                        <div className='flex flex-col gap-4'>
                            {/* message 1 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='MC' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Mike Chen</h3>
                                            <button className='text-xs bg-blue-100 rounded-xl px-2 py-1 text-blue-600'>attendee</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>

                        </div>
                    )}


                    {activeTab === "vendors" && (

                        <div className='flex flex-col gap-4'>
                            {/* message 1 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='DW' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>David Wilson</h3>
                                            <button className='text-xs bg-green-100 rounded-xl px-2 py-1 text-green-600'>vendor</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>
                        </div>


                    )}


                    {activeTab === "organizers" && (

                        <div className='flex flex-col gap-4'>

                            {/* message 1 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='AS' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Alice Smith</h3>
                                            <button className='text-xs bg-orange-100 rounded-xl px-2 py-1 text-orange-600'>organizer</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>

                            {/* message 2 */}
                            <div className='flex items-center gap-2'>
                                <UserAvatar width={15} height={15} nameAbv='ED' />
                                <div className='flex flex-col flex-1 gap-1'>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <h3 className='font-semibold'>Emma Davis</h3>
                                            <button className='text-xs bg-orange-100 rounded-xl px-2 py-1 text-orange-600'>organizer</button>
                                        </div>
                                        <p className='text-sm'>Just Now</p>
                                    </div>


                                    <p className='text-text-light text-sm'>Hey! Looking forward to the event.</p>
                                </div>

                            </div>

                        </div>

                    )}

                </div>



                {/* right side  */}
                <div className='hidden md:block border bg-white p-2 rounded-xl'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                        <UserAvatar width={15} height={15} nameAbv='AS' />

                        <div className='flex items-center gap-2 '>
                            <h2 className='font-semibold text-lg'>Alice Smith</h2>
                            <button className='text-xs bg-orange-100 rounded-xl px-2 py-1 text-orange-600'>organizer</button>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <PhoneCall className='text-text-light cursor-pointer' />
                        <Video className='text-text-light cursor-pointer' />
                        <EllipsisVertical className=' text-text-light cursor-pointer' />

                    </div>
                    </div>

                    {/* divider */}
                    <div className='border my-4 '></div>
                    

                </div>
            </div>
        </section>
    )
}

export default Page
