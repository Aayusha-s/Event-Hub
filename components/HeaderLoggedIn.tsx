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
                    <CirclePlus />
                    <Bell />
                    <div className='flex flex-row items-center gap-1' onClick={() => setOpen(!open)}>
                        <CircleUserRound size={32} strokeWidth={1.3} />
                        <ChevronDown size={18} />
                    </div>

                </div>

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




                        <Link href="/settings/account" onClick={() => setOpen(false)}><div className='px-4 py-3 flex flex-row items-center gap-1 hover:bg-gray-100 cursor-pointer transition 3s ease-in-out'>
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
