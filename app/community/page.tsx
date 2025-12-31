'use client'
import { Camera, Check, Plus, Users, Calendar, TrendingUp, Star, PaintBucket, Palette, Utensils, Briefcase, Music } from 'lucide-react'
import Button from '@/components/Button'
import Link from 'next/link'
import FeedPost from '@/components/FeedPost'
import { useState } from 'react'
import TrendingTopics from '@/components/TrendingTopics'
import MeetUp from '@/components/MeetUp'
import UserAvatar from '@/components/UserAvatar'
import FeaturedMember from '@/components/FeaturedMember'

const Page = () => {

    const [activeTab, setActiveTab] = useState('feed');

    return (
        <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>

            {/* Header */}
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                <div className='space-y-2'>
                    <h1 className='font-dynapuff text-2xl md:text-3xl font-bold'>
                        Community
                    </h1>
                    <p className='text-base md:text-lg max-w-2xl'>
                        Connect with event lovers, share experiences, and discover new opportunities
                    </p>
                </div>

                <div className='flex justify-between gap-2'>
                    <Link href="/community/photos">
                        <Button text='Photos' variant="cta" size="sm" iconLeft={<Camera />}>

                        </Button>
                    </Link>
                    <Link href="/community/members">
                        <Button text='Members' variant="cta" size="sm" iconLeft={<Users />}>

                        </Button>
                    </Link>
                    <Link href="/community/create-post">
                        <Button text='New Post' variant="cta" size="sm" iconLeft={<Plus />}>

                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className='mt-6 border-b border-gray-200'>
                <div className='flex gap-2 py-4 overflow-x-auto'>
                    <Button text='Feed'
                        variant="cta"
                        size="sm"
                        iconLeft={<Calendar
                            size={16} />}
                        onClick={() => setActiveTab('feed')}
                    ></Button>

                    <Button
                        text='Trending Topics'
                        variant="cta"
                        size="sm"
                        iconLeft={<TrendingUp size={16} />}
                        onClick={() => setActiveTab('trending')}
                    ></Button>

                    <Button
                        text='MeetUps'
                        variant="cta"
                        size="sm"
                        iconLeft={<Star size={16} />}
                        onClick={() => setActiveTab('meetups')}
                    ></Button>

                    <Button
                        text="Featured Members"
                        variant="cta"
                        size="sm"
                        iconLeft={<Star size={16} />}
                        onClick={() => setActiveTab('members')}
                    ></Button>

                </div>
            </div>

            {/* Content Area */}
            <div className='mt-8'>

                {/* feed */}
                {activeTab === 'feed' && (
                    <>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 grid-template-2fr-auto'>
                            <FeedPost
                                nameAbv="JD"
                                name="Jane Doe"
                                userType="Event Organizer"
                                timeAgo="2 hours ago"
                                postContent="Just attended an amazing tech conference! Met so many inspiring people and learned about the latest trends in the industry. 
                                Can't wait to implement some of these ideas in my own projects."
                                imgUrl="/images/Business.png"
                            />

                            <FeedPost
                                nameAbv="MS"
                                name="Mark Smith"
                                userType="Event Enthusiast"
                                timeAgo="5 hours ago"
                                postContent="Had a fantastic time at the local art festival this weekend! The creativity and talent on display were truly inspiring. 
                                Looking forward to more events like this in the future."
                                imgUrl="/images/FoodFestival.png"
                            />
                        </div>
                    </>
                )}

                {/* trending topics */}

                {activeTab === 'trending' && (
                    <>
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                            <TrendingTopics
                                hoverColor='hover:border-purple-500'
                                iconBoxColor='bg-purple-100'
                                icon={<Music className={` ${'text-purple-500'}`} />}
                                title='Music Festivals'
                                postCount={124}
                            />

                            <TrendingTopics
                                hoverColor='hover:border-blue-500'
                                iconBoxColor='bg-blue-100'
                                icon={<Briefcase className={` ${'text-blue-500'}`} />}
                                title='Tech Conferences'
                                postCount={98}
                            />
                            <TrendingTopics
                                hoverColor='hover:border-green-500'
                                iconBoxColor='bg-green-100'
                                icon={<Camera className={` ${'text-green-500'}`} />}
                                title='Health & Wellness'
                                postCount={76}
                            />

                            <TrendingTopics
                                hoverColor='hover:border-yellow-500'
                                iconBoxColor='bg-yellow-100'
                                icon={<Camera className={` ${'text-yellow-500'}`} />}
                                title='Art Exhibitions'
                                postCount={54}
                            />
                            <TrendingTopics
                                hoverColor='hover:border-orange-500'
                                iconBoxColor='bg-orange-100'
                                icon={<Utensils className={` ${'text-orange-500'}`} />}
                                title='Food & Wine Expo'
                                postCount={189}
                            />
                            <TrendingTopics
                                hoverColor='hover:border-red-500'
                                iconBoxColor='bg-red-100'
                                icon={<Palette className={` ${'text-red-500'}`} />}
                                title='Art Exhibitions'
                                postCount={98}
                            />
                        </div>
                    </>
                )}

                {activeTab === 'meetups' && (
                    <>
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
                            <MeetUp
                                title='Pre-Festival Meetup'
                                relatedEvent='Summer Music Festival'
                                date='Jul 14, 2025'
                                time='5:00 PM'
                                location='Central Park, New York'
                                attendeesCount='24'
                                totalSpots='30'
                            />
                            <MeetUp
                                title='Foodie Group Gathering'
                                relatedEvent='Food & Wine Expo'
                                date='Aug 21, 2025'
                                time='6:30 PM'
                                location='Downtown Wine Bar, San Francisco'
                                attendeesCount='18'
                                totalSpots='25'
                            />
                            <MeetUp
                                title='Tech Networking Happy Hour'
                                relatedEvent='Tech Summit 2025'
                                date='Sep 10, 2025'
                                time='7:00 AM'
                                location='Innovatech Hub, Seattle'
                                attendeesCount='42'
                                totalSpots='50'
                            />
                            <MeetUp
                                title='Pre-Festival Meetup'
                                relatedEvent='Summer Music Festival'
                                date='Jul 14, 2025'
                                time='5:00 PM'
                                location='Central Park, New York'
                                attendeesCount='24'
                                totalSpots='50'
                            />
                            <MeetUp
                                title='Pre-Festival Meetup'
                                relatedEvent='Summer Music Festival'
                                date='Jul 14, 2025'
                                time='5:00 PM'
                                location='Central Park, New York'
                                attendeesCount='24'
                                totalSpots='50'
                            />
                        </div>

                    </>
                )}

                {activeTab === 'members' && (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                            <FeaturedMember
                            name='Alex Turner'
                            role='Photographer'
                            tags={['VIP Attendee','Music Lover','Foodie Explorer']}
                            followersCount={250}
                            followingCount={158}
                            />
                        </div>

                    </>
                )}

            </div>


        </section>

    )
}


export default Page