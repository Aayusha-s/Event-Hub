'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Bell, ChevronDown, CirclePlus, CircleUserRound, LogOut, Settings, User } from 'lucide-react';
import Image from 'next/image';
import ManageRoles from './ManageRoles';
import Logout from './Logout';
import Searchbar from './Searchbar';

const HeaderLoggedIn = () => {
    const [open, setOpen] = useState(false);
    const [isRolePopupOpen, setIsRolePopupOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-surface/95 text-text-dark shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="nav-left">
                    <Link href="/">
                        <div className="relative h-[60px] w-[120px] cursor-pointer">
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

                <div className="hidden flex-1 max-w-3xl md:flex mx-6">
                    <Searchbar />
                </div>

                <div className="nav-right flex items-center gap-2 text-text-dark cursor-pointer">
                    <Link href="/create-event/step-1" className="rounded-full p-2 transition-colors hover:bg-surface-hover hover:text-primary">
                        <CirclePlus size={22} />
                    </Link>

                    <button type="button" onClick={() => setIsNotificationOpen(!isNotificationOpen)} className="rounded-full p-2 transition-colors hover:bg-surface-hover hover:text-primary" aria-label="Toggle notifications">
                        <Bell size={22} />
                    </button>

                    <button type="button" className="flex flex-row items-center gap-1 rounded-full p-1.5 transition-colors hover:bg-surface-hover" onClick={() => setOpen(!open)}>
                        <CircleUserRound size={32} strokeWidth={1.3} />
                        <ChevronDown size={18} />
                    </button>
                </div>

                {isNotificationOpen && (
                    <div className="absolute right-6 top-[72px] z-50 w-80 rounded-2xl border border-border bg-surface shadow-lg md:right-20">
                        <div className="px-4 pt-4">
                            <p className="mb-2 text-lg font-semibold text-text-dark">Notifications</p>
                            <div className="border-t border-divider"></div>
                        </div>

                        <div className="max-h-70 overflow-y-auto p-4">
                            <div className="flex cursor-pointer flex-col rounded-xl p-3 transition-colors duration-200 ease-in-out hover:bg-surface-hover">
                                <p className="text-md text-text-dark">Your ticket for Summer Music Festival is confirmed.</p>
                                <p className="mt-2 text-sm text-gray-500">2 hours ago</p>
                            </div>
                            <div className="my-2 border-t border-divider"></div>
                            <div className="flex cursor-pointer flex-col rounded-xl p-3 transition-colors duration-200 ease-in-out hover:bg-surface-hover">
                                <p className="text-md text-text-dark">New Event: Tech Summit 2025</p>
                                <p className="mt-2 text-sm text-gray-500">5 hours ago</p>
                            </div>
                            <div className="my-2 border-t border-divider"></div>
                            <div className="flex cursor-pointer flex-col rounded-xl p-3 transition-colors duration-200 ease-in-out hover:bg-surface-hover">
                                <p className="text-md text-text-dark">Event Reminder: Jazz Night tomorrow at 7 PM</p>
                                <p className="mt-2 text-sm text-gray-500">1 day ago</p>
                            </div>
                            <div className="my-2 border-t border-divider"></div>
                            <div className="flex cursor-pointer flex-col rounded-xl p-3 transition-colors duration-200 ease-in-out hover:bg-surface-hover">
                                <p className="text-md text-text-dark">Check out this new event happening near you!</p>
                                <p className="mt-2 text-sm text-gray-500">2 days ago</p>
                            </div>
                        </div>

                        <div className="mx-4 border-t border-divider"></div>
                        <div className="flex cursor-pointer justify-center rounded-b-2xl px-4 pt-4 transition-colors duration-200 ease-in-out hover:bg-surface-hover">
                            <p className="mb-2 text-md font-semibold text-primary">View All Notifications</p>
                        </div>
                    </div>
                )}

                {open && (
                    <div className="absolute right-5 top-[72px] w-45 rounded-2xl border border-border bg-surface shadow-lg">
                        <p className="px-4 py-3 text-lg font-semibold text-text-dark">John Doe</p>
                        <div className="my-0.5 border-t border-divider"></div>

                        <div className="cursor-pointer px-4 py-3 transition duration-200 ease-in-out hover:bg-surface-hover" onClick={() => { setOpen(false); setIsRolePopupOpen(true); }}>
                            <div className="flex flex-row items-center gap-1">
                                <User size={18} />
                                <p>Manage Roles</p>
                            </div>
                        </div>

                        <Link href="/settings/profile" onClick={() => setOpen(false)}>
                            <div className="flex cursor-pointer flex-row items-center gap-1 px-4 py-3 transition duration-200 ease-in-out hover:bg-surface-hover">
                                <Settings size={18} />
                                <p>Settings</p>
                            </div>
                        </Link>

                        <div className="cursor-pointer px-4 py-3 transition duration-200 ease-in-out hover:bg-surface-hover" onClick={() => { setOpen(false); setIsLogoutOpen(true); }}>
                            <div className="flex flex-row items-center gap-1 text-error">
                                <LogOut size={18} />
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                )}

                <Logout
                    isOpen={isLogoutOpen}
                    onClose={() => {
                        setIsLogoutOpen(false);
                        setOpen(false);
                    }}
                />
                <ManageRoles
                    isOpen={isRolePopupOpen}
                    onClose={() => {
                        setIsRolePopupOpen(false);
                        setOpen(false);
                    }}
                />
            </div>
        </header>
    );
};

export default HeaderLoggedIn;
