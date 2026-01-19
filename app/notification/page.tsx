'use client';
import Button from '@/components/Button';
import NotificationCard from '@/components/NotificationCard';
import { Award, Badge, Bell, Calendar, CheckCheck, CircleAlert, CreditCard, DollarSign, EllipsisVertical, Filter, Gift, ListFilter, MapPin, MessageSquare, Settings, Star, Ticket, TrendingUp, Users } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

const Page = () => {

    const [isFilterOpen, setFilterOpen] = useState(true);
    const [activeFilter, setActiveFilter] = useState<'all' | 'event-reminders' | 'bookings' | 'messages' | 'event-updates' | 'reviews' | 'payments' | 'booth-updates' | 'ticket-sales' | 'achievements' | 'community' | 'promotions'>('all');
    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            {/* heading and sub-heading */}
            <div className='flex-wrap md:flex items-center justify-between mb-4'>
                <div className='space-y-2 mb-4'>
                <h1 className='font-dynapuff text-2xl md:text-3xl font-bold flex items-center gap-2'>
                    <Bell strokeWidth={3} /> Notification
                </h1>
                <p className='text-base md:text-lg max-w-2xl'>
                    3 unread notifications
                </p>
            </div>

            <div className='flex items-center gap-2'>
                <Button
                text='Select'
                size='sm'
                variant='cta'
                />

                <Button
                text='Mark all as read'
                size='sm'
                variant='cta'
                iconLeft={<CheckCheck size={18} />}
                />
            </div></div>

            <div className='grid grid-cols-1 md:grid-cols-[2fr_3fr] lg:grid-cols-[1.5fr_3fr] gap-6'>
                <div className='md:sticky md:top-10'>
                    {/* search bar and filter */}
                    <div className='flex items-center justify-between gap-4 mb-4'>
                        <div className='w-full'>
                            <input type='text' name='search' id='search' placeholder='Search notifications...' className='w-full p-3 rounded-lg border border-brown-light-active focus:outline-none focus:ring-2 focus:ring-brown-light transition duration-300 ease-in-out' />
                        </div>

                        <ListFilter onClick={() => setFilterOpen(!isFilterOpen)} />
                    </div>

                    {isFilterOpen && (
                        <div >
                            {/* filter options */}
                            <div className='overflow-y-auto max-h-60 md:max-h-200 flex flex-col gap-1 mb-4 border border-brown-light-active rounded-lg'>

                                {/* all notification filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("all")}>

                                    <div className='flex gap-2'>
                                        <Bell />
                                        <p>All Notifications</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>12</span>
                                </div>


                                {/* event reminders filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("event-reminders")}>

                                    <div className='flex gap-2'>
                                        <Calendar />
                                        <p>Event Reminders</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>2</span>
                                </div>


                                {/* Booking filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("bookings")}>

                                    <div className='flex gap-2'>
                                        <Ticket />
                                        <p>Booking</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>


                                {/* Messages filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("messages")}>

                                    <div className='flex gap-2'>
                                        <MessageSquare />
                                        <p>Messages</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Event Update filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("event-updates")}>

                                    <div className='flex gap-2'>
                                        <CircleAlert />
                                        <p>Event Updates</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Reviews filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("reviews")}>

                                    <div className='flex gap-2'>
                                        <Star />
                                        <p>Reviews</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Payments filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("payments")}>

                                    <div className='flex gap-2'>
                                        <CreditCard />
                                        <p>Payments</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Booth Updates filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("booth-updates")}>

                                    <div className='flex gap-2'>
                                        <MapPin />
                                        <p>Booth Updates</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Ticket Sales filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("ticket-sales")}>

                                    <div className='flex gap-2'>
                                        <TrendingUp />
                                        <p>Ticket Sales</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Achievements filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("achievements")}>

                                    <div className='flex gap-2'>
                                        <Award />
                                        <p>Achievements</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>

                                {/* Community filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("community")}>

                                    <div className='flex gap-2'>
                                        <Users />
                                        <p>Community</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>2</span>
                                </div>

                                {/* Promotions filter */}
                                <div className='flex justify-between items-center hover:bg-brown-light p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out' onClick={() => setActiveFilter("promotions")}>

                                    <div className='flex gap-2'>
                                        <Gift />
                                        <p>Promotions</p>
                                    </div>

                                    <span className='border border-gray-300 rounded-xl px-3 py-1'>1</span>
                                </div>



                                {/* notification settings */}
                                <div className='border-t bg-white sticky top-0 bottom-0 p-3 flex justify-center cursor-pointer hover:underline rounded-lg transition duration-300 ease-in-out'>
                                    <p className="flex items-center gap-2 font-medium text-md "><Settings />Notification Settings</p>
                                    <div className="border-t border-brown-light-active"></div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                <div>
                    {activeFilter === "all" && (
                        <>
                            {/* notification list */}
                            <div className='flex flex-col space-y-4'>

                                {/* notification 1 */}
                                <NotificationCard
                                    title="Event Starting Soon!"
                                    time="5 min"
                                    tag="Event Reminder"
                                    subtitle="Tech Summit 2026"
                                    subtitleIcon={<Calendar size={20} />}
                                    message="Tech Summit 2026 starts in 2 hours. Get ready!"
                                    icon={<Calendar size={18} className='text-purple-700' />}
                                    iconColor='bg-purple-100'
                                    buttonText="View Event"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />

                                {/* notification 2 */}
                                <NotificationCard
                                    title="New Message"
                                    time="15 min"
                                    tag="Message"
                                    message="Sarah Johnson sent you a message about booth setup."
                                    subtitle="Sarah Johnson"
                                    icon={<MessageSquare size={18} className='text-blue-700' />}
                                    iconColor='bg-blue-100'
                                    buttonText="Reply"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />

                                {/* notification 3 */}
                                <NotificationCard
                                    title="Booking Confirmed"
                                    time="1 hour"
                                    tag="Booking Confirmed"
                                    message="Your VIP ticket for Summer Music Festival is confirmed."
                                    subtitle="Summer Music Festival"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<Ticket size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="View Ticket"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />

                                {/* notification 4 */}
                                <NotificationCard
                                    title="Achievement Unlocked!"
                                    time="2 hours"
                                    tag="Achievement"
                                    message="You've earned the 'Event Enthusiast' badge for attending 10 events!"
                                    icon={<Award size={18} className='text-red-700' />}
                                    iconColor='bg-red-100'
                                    buttonText="View Achievements"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />

                                {/* notification 5 */}
                                <NotificationCard
                                    title="Ticket Sold"
                                    time="3 hours"
                                    tag="Ticket Sold"
                                    message="5 new tickets sold for your event 'Tech Innovators Conference'."
                                    subtitle="Tech Innovators Conference"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<TrendingUp size={18} className='text-blue-700' />}
                                    iconColor='bg-blue-100'
                                    buttonText="View Sales"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />


                                {/* notification 6 */}
                                <NotificationCard
                                    title="New Review"
                                    time="5 hours"
                                    tag="Review"
                                    message="Someone left a 5-star review for your booth at Marketing Expo"
                                    subtitle="Marketing Expo"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<Star size={18} className='text-yellow-700' />}
                                    iconColor='bg-yellow-100'
                                    buttonText="Read Review"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />


                                {/* notification 7 */}
                                <NotificationCard
                                    title="Event Update"
                                    time="1 day"
                                    tag="Event Update"
                                    message="The venue for Web Dev Conference has been changed to Grand Hall."
                                    subtitle="Web Dev Conference"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<CircleAlert size={18} className='text-orange-700' />}
                                    iconColor='bg-orange-100'
                                    buttonText="View Details"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />


                                {/* notification 8 */}
                                <NotificationCard
                                    title="Booth Application Approved"
                                    time="1 day"
                                    tag="Booth Approved"
                                    message="Your booth application for Food & Wine Festival has been approved."
                                    subtitle="Food & Wine Festival"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<MapPin size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="Setup Booth"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />

                                {/* notification 9 */}
                                <NotificationCard
                                    title="Payment Received"
                                    time="2 days"
                                    tag="Payment"
                                    message="Payment of $500 received for your booth booking at Tech Summit."
                                    subtitle="$150"
                                    subtitleIcon={<DollarSign size={20} />}

                                    icon={<DollarSign size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="View Receipt"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />

                                {/* notification 10 */}
                                <NotificationCard
                                    title="Community Challenge"
                                    time="2 days"
                                    tag="Community"
                                    message="Join the 'Summer Events Explorer' challenge and win exclusive rewards!"
                                    icon={<Users size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="Join Challenge"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />

                                {/* notification 10 */}
                                <NotificationCard
                                    title="Special Offer"
                                    time="3 days"
                                    tag="Promotion"
                                    message="Upgrade to Premium and get 20% off your first month!"
                                    icon={<Gift size={18} className='text-red-700' />}
                                    iconColor='bg-red-100'
                                    buttonText="Learn More"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />

                                {/* notification 11 */}
                                <NotificationCard
                                    title="Don't Forget"
                                    time="3 days"
                                    tag="Event Reminder"
                                    subtitle='Jazz Night Under Stars'
                                    subtitleIcon={<Calendar size={20} />}
                                    message='Your saved event "Jazz Night Under Stars" is happening tomorrow.'
                                    icon={<Calendar size={18} className='text-purple-700' />}
                                    iconColor='bg-purple-100'
                                    buttonText="View Event"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />







                            </div>
                        </>
                    )}


                    {activeFilter === "event-reminders" && (
                        <>
                            {/* notification list for event reminders */}
                            <div className='flex flex-col space-y-4'>
                                {/* notification 1 */}
                                <NotificationCard
                                    title="Event Starting Soon!"
                                    time="5 min"
                                    tag="Event Reminder"
                                    subtitle="Tech Summit 2026"
                                    subtitleIcon={<Calendar size={20} />}
                                    message="Tech Summit 2026 starts in 2 hours. Get ready!"
                                    icon={<Calendar size={18} className='text-purple-700' />}
                                    iconColor='bg-purple-100'
                                    buttonText="View Event"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />

                                {/* notification 11 */}
                                <NotificationCard
                                    title="Don't Forget"
                                    time="3 days"
                                    tag="Event Reminder"
                                    subtitle='Jazz Night Under Stars'
                                    subtitleIcon={<Calendar size={20} />}
                                    message='Your saved event "Jazz Night Under Stars" is happening tomorrow.'
                                    icon={<Calendar size={18} className='text-purple-700' />}
                                    iconColor='bg-purple-100'
                                    buttonText="View Event"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>
                        </>
                    )}


                    {activeFilter === "bookings" && (
                        <>
                            {/* notification list for bookings */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Booking Confirmed"
                                    time="1 hour"
                                    tag="Booking Confirmed"
                                    message="Your VIP ticket for Summer Music Festival is confirmed."
                                    subtitle="Summer Music Festival"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<Ticket size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="View Ticket"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />
                            </div>

                        </>
                    )}


                    {activeFilter === "messages" && (
                        <>
                            {/* notification list for messages */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="New Message"
                                    time="15 min"
                                    tag="Message"
                                    message="Sarah Johnson sent you a message about booth setup."
                                    subtitle="Sarah Johnson"
                                    icon={<MessageSquare size={18} className='text-blue-700' />}
                                    iconColor='bg-blue-100'
                                    buttonText="Reply"
                                    unread='block'
                                    unreadStyle='border-l-4 border-l-brown-normal'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "event-updates" && (
                        <>
                            {/* notification list for event updates */}
                            <div className='flex flex-col space-y-4'>
                                {/* notification 7 */}
                                <NotificationCard
                                    title="Event Update"
                                    time="1 day"
                                    tag="Event Update"
                                    message="The venue for Web Dev Conference has been changed to Grand Hall."
                                    subtitle="Web Dev Conference"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<CircleAlert size={18} className='text-orange-700' />}
                                    iconColor='bg-orange-100'
                                    buttonText="View Details"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "reviews" && (
                        <>
                            {/* notification list for reviews */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="New Review"
                                    time="5 hours"
                                    tag="Review"
                                    message="Someone left a 5-star review for your booth at Marketing Expo"
                                    subtitle="Marketing Expo"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<Star size={18} className='text-yellow-700' />}
                                    iconColor='bg-yellow-100'
                                    buttonText="Read Review"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "payments" && (
                        <>
                            {/* notification list for payments */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Payment Received"
                                    time="2 days"
                                    tag="Payment"
                                    message="Payment of $500 received for your booth booking at Tech Summit."
                                    subtitle="$150"
                                    subtitleIcon={<DollarSign size={20} />}

                                    icon={<DollarSign size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="View Receipt"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "booth-updates" && (
                        <>
                            {/* notification list for booth updates */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Booth Application Approved"
                                    time="1 day"
                                    tag="Booth Approved"
                                    message="Your booth application for Food & Wine Festival has been approved."
                                    subtitle="Food & Wine Festival"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<MapPin size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="Setup Booth"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "ticket-sales" && (
                        <>
                            {/* notification list for ticket sales */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Ticket Sold"
                                    time="3 hours"
                                    tag="Ticket Sold"
                                    message="5 new tickets sold for your event 'Tech Innovators Conference'."
                                    subtitle="Tech Innovators Conference"
                                    subtitleIcon={<Calendar size={20} />}
                                    icon={<TrendingUp size={18} className='text-blue-700' />}
                                    iconColor='bg-blue-100'
                                    buttonText="View Sales"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "achievements" && (
                        <>
                            {/* notification list for achievements */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Achievement Unlocked!"
                                    time="2 hours"
                                    tag="Achievement"
                                    message="You've earned the 'Event Enthusiast' badge for attending 10 events!"
                                    icon={<Award size={18} className='text-red-700' />}
                                    iconColor='bg-red-100'
                                    buttonText="View Achievements"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "community" && (
                        <>
                            {/* notification list for community */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Community Challenge"
                                    time="2 days"
                                    tag="Community"
                                    message="Join the 'Summer Events Explorer' challenge and win exclusive rewards!"
                                    icon={<Users size={18} className='text-green-700' />}
                                    iconColor='bg-green-100'
                                    buttonText="Join Challenge"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                    {activeFilter === "promotions" && (
                        <>
                            {/* notification list for promotions */}
                            <div className='flex flex-col space-y-4'>
                                <NotificationCard
                                    title="Special Offer"
                                    time="3 days"
                                    tag="Promotion"
                                    message="Upgrade to Premium and get 20% off your first month!"
                                    icon={<Gift size={18} className='text-red-700' />}
                                    iconColor='bg-red-100'
                                    buttonText="Learn More"
                                    unread='hidden'
                                    unreadStyle='border-gray-200'
                                />
                            </div>

                        </>
                    )}

                </div>
            </div>


        </section >
    )
}

export default Page
