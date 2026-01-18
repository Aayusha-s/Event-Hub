'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'
import { Bell, ChevronDown, CirclePlus, CircleUserRound, Filter, LogOut, Mic, Search, Settings, User } from 'lucide-react'
import Image from 'next/image'
import UserAvatar from './UserAvatar'
import ManageRoles from './ManageRoles';
import Logout from './Logout';

const HeaderLoggedIn = () => {
    const [open, setOpen] = useState(false);
    const [isRolePopupOpen, setIsRolePopupOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className='fixed top-0 left-0 right-0 w-full bg-brown-light z-50 shadow-sm text-text-dark'>

            <div className='mx-auto px-4 flex justify-between items-center h-[70px] max-w-7xl'>

                <div className='nav-left'>
                    <Link href="/">
                        <div className="relative w-[120px] h-[60px] cursor-pointer">

                            <Image
                                src="/images/logo.png"
                                alt="EventHub Logo"
                                fill
                                style={{ objectFit: 'contain' }}
                                sizes="130px"
                            />
                        </div>
                    </Link>
                </div>

                {/* Search Bar  */}
                <div className='hidden md:flex flex-1 max-w-xl mx-6'>

                    <div className='w-full h-[42px] bg-brown-light border border-brown-normal/80 rounded-lg flex items-center px-4'>

                        <div className='flex items-center gap-3 flex-1'>

                            <Search className="w-4 h-4 text-text-light" />
                            <input
                                type="text"
                                placeholder='Search events, venues, artists...'
                                className='w-full bg-transparent text-text-light placeholder:text-text-light/70 focus:outline-none'
                            />
                        </div>

                        <div className='flex items-center gap-3 border-l border-brown-normal pl-3'>
                            <button className="text-text-light hover:text-text-dark transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                            <button className="text-text-light hover:text-text-dark transition-colors">
                                <Mic className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>


                <div className='nav-right flex items-center gap-4 text-brown-dark cursor-pointer'>

                    {/* create event */}
                    <Link href="/create-event/step-1"><CirclePlus /></Link>

                    {/* notification */}
                    <Bell onClick={() => setIsNotificationOpen(!isNotificationOpen)} />

                    {/* user avatar and dropdown */}
                    <div className='flex flex-row items-center gap-1' onClick={() => setOpen(!open)}>
                        <CircleUserRound size={32} strokeWidth={1.3} />
                        <ChevronDown size={18} />
                    </div>

                </div>

                {isNotificationOpen && (
                    <>

                        <div className="absolute top-15 right-6 md:right-20 bg-white border rounded-lg w-80 z-50">
                            <div className='px-4 pt-4'>
                                <p className="font-bold text-lg mb-2">Notifications</p>
                                <div className="border-t border-brown-light-active"></div>
                            </div>


                            <div className='p-4  overflow-y-auto max-h-70 '>
                                {/* notification 1 */}
                                <div className='flex flex-col cursor-pointer hover:bg-brown-light p-2 rounded-lg transition duration-300 ease-in-out'>
                                    <p className="text-md ">Your ticket for Summer Music Festival is confirmed.</p>
                                    <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
                                </div>

                                {/* divider */}
                                <div className="border-t border-brown-light my-2"></div>

                                {/* notification 2 */}
                                <div className='flex flex-col cursor-pointer hover:bg-brown-light p-2 rounded-lg transition duration-300 ease-in-out'>
                                    <p className="text-md ">New Event: Tech Summit 2025</p>
                                    <p className="text-sm text-gray-500 mt-2">5 hours ago</p>
                                </div>

                                {/* divider */}
                                <div className="border-t border-brown-light my-2"></div>

                                {/* notification 3 */}
                                <div className='flex flex-col cursor-pointer hover:bg-brown-light p-2 rounded-lg transition duration-300 ease-in-out'>
                                    <p className="text-md ">Event Reminder: Jazz Night tomorrow at 7 PM</p>
                                    <p className="text-sm text-gray-500 mt-2">1 day ago</p>
                                </div>

                                {/* divider */}
                                <div className="border-t border-brown-light my-2"></div>

                                {/* notification 4 */}
                                <div className='flex flex-col cursor-pointer hover:bg-brown-light p-2 rounded-lg transition duration-300 ease-in-out'>
                                    <p className="text-md ">Check out this new event happening near you!</p>
                                    <p className="text-sm text-gray-500 mt-2">2 days ago</p>
                                </div>
                            </div>

                            {/* divider */}
                            <div className="border-t border-brown-light-active mx-4"></div>

                            {/* view all notification button */}

                            <div className='px-4 pt-4 flex justify-center cursor-pointer hover:underline p-2 rounded-lg transition duration-300 ease-in-out'>
                                <p className="font-bold text-md mb-2">View All Notifications</p>
                                <div className="border-t border-brown-light-active"></div>
                            </div>
                        </div>

                    </>
                )}

                {open && (
                    <div className="absolute top-15 right-5 bg-white border rounded-lg w-45">

                        <p className="px-4 py-3 text-lg font-bold">John Doe</p>
                        <div className="border-t border-brown-light-active my-0.5"></div>


                        <div className='px-4 py-3 flex flex-row items-center gap-1 hover:bg-gray-100 cursor-pointer 
                        transition 3s ease-in-out'
                            onClick={() => {
                                setOpen(false);
                                setIsRolePopupOpen(true)
                            }}>
                            <User size={18} />
                            <p >Manage Roles</p>
                        </div>


                        <Link href="/settings/profile" onClick={() => setOpen(false)}><div className='px-4 py-3 flex flex-row items-center gap-1 hover:bg-gray-100 cursor-pointer transition 3s ease-in-out'>
                            <Settings size={18} />
                            <p>Settings</p>
                        </div>
                        </Link>


                        <div className='px-4 py-3 flex flex-row items-center gap-1  text-red-500 hover:bg-gray-100 cursor-pointer transition 3s ease-in-out'
                            onClick={() => {
                                setOpen(false)
                                setIsLogoutOpen(true)

                            }}>
                            <LogOut size={18} />
                            <p>Logout</p>
                        </div>

                    </div>

                )}


                <Logout
                    isOpen={isLogoutOpen}
                    onClose={() => {
                        setIsLogoutOpen(false)
                        setOpen(false);

                    }} />
                <ManageRoles
                    isOpen={isRolePopupOpen}
                    onClose={() => {
                        setIsRolePopupOpen(false)
                        setOpen(false);
                    }} />

            </div>
        </header>
    )
}

export default HeaderLoggedIn
