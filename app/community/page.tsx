'use client'

import { useEffect, useState } from 'react'
import { Camera, Plus, Users, Calendar, TrendingUp, Star, PaintBucket, Palette, Utensils, Briefcase, Music, Heart } from 'lucide-react'
import Button from '@/components/Button'
import FeedPost from '@/components/FeedPost'
import TrendingTopics from '@/components/TrendingTopics'
import MeetUp from '@/components/MeetUp'
import FeaturedMember from '@/components/FeaturedMember'
import EventCard from '@/components/EventCard'

type CommunityData = {
    feed: Array<{ id: string; nameAbv?: string; name?: string; userType?: string; timeAgo?: string; postContent?: string; imgUrl?: string; profileUrl?: string; likes?: number; comments?: number; shares?: number }>;
    photos: Array<{ id: string; src: string; alt: string; likes: number; comments: number; category: string }>;
    events: Array<{ _id: string; title: string; description: string; venue: string; tags: string[]; images: string[]; ticketTypes: { price: number }[]; organizer?: { name?: string } }>;
    trendingTopics: Array<{ title: string; postCount: number }>;
    meetups: Array<{ title: string; relatedEvent: string; date: string; time: string; location: string; attendeesCount: string; totalSpots: string }>;
    members: Array<{ name: string; role?: string; tags?: string[]; followersCount?: number; followingCount?: number; profileUrl?: string }>;
}

const categoryPalette = [
    { hoverColor: 'hover:border-purple-500', iconBoxColor: 'bg-purple-100', icon: <Music className='text-purple-500' /> },
    { hoverColor: 'hover:border-blue-500', iconBoxColor: 'bg-blue-100', icon: <Briefcase className='text-blue-500' /> },
    { hoverColor: 'hover:border-green-500', iconBoxColor: 'bg-green-100', icon: <Camera className='text-green-500' /> },
    { hoverColor: 'hover:border-yellow-500', iconBoxColor: 'bg-yellow-100', icon: <PaintBucket className='text-yellow-500' /> },
    { hoverColor: 'hover:border-orange-500', iconBoxColor: 'bg-orange-100', icon: <Utensils className='text-orange-500' /> },
    { hoverColor: 'hover:border-red-500', iconBoxColor: 'bg-red-100', icon: <Palette className='text-red-500' /> },
]

const Page = () => {
    const [activeTab, setActiveTab] = useState<'feed' | 'photos' | 'events' | 'trending' | 'meetups' | 'members'>('feed')
    const [data, setData] = useState<CommunityData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        fetch('/api/community', { cache: 'no-store' })
            .then(async (response) => {
                const result = await response.json()
                if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load community.')
                if (active) setData(result.data as CommunityData)
            })
            .catch((loadError) => { if (active) setError(loadError instanceof Error ? loadError.message : 'Unable to load community.') })
            .finally(() => { if (active) setLoading(false) })

        return () => { active = false }
    }, [])

    if (loading) {
        return <section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>Loading community…</section>
    }

    if (error || !data) {
        return <section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'><h1 className='font-dynapuff text-2xl font-bold'>Community</h1><p className='mt-2 text-red-600'>{error || 'Unable to load community.'}</p></section>
    }

    return (
        <section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                <div className='space-y-2'>
                    <h1 className='font-dynapuff text-2xl md:text-3xl font-bold'>Community</h1>
                    <p className='text-base md:text-lg max-w-2xl'>Connect with event lovers, share experiences, and discover new opportunities</p>
                </div>

                <div className='flex justify-between gap-2'>
                    <Button text='Photos' variant='cta' size='sm' iconLeft={<Camera />} onClick={() => setActiveTab('photos')} />
                    <Button text='Members' variant='cta' size='sm' iconLeft={<Users />} onClick={() => setActiveTab('members')} />
                    <Button text='New Post' variant='cta' size='sm' iconLeft={<Plus />} onClick={() => setActiveTab('feed')} />
                </div>
            </div>

            <div className='mt-6 border-b border-gray-200'>
                <div className='flex gap-2 py-4 overflow-x-auto'>
                    <Button text='Feed' variant='cta' size='sm' iconLeft={<Calendar size={16} />} onClick={() => setActiveTab('feed')} isActive={activeTab === 'feed'} />
                    <Button text='Photos' variant='cta' size='sm' iconLeft={<Camera size={16} />} onClick={() => setActiveTab('photos')} isActive={activeTab === 'photos'} />
                    <Button text='Events' variant='cta' size='sm' iconLeft={<Calendar size={16} />} onClick={() => setActiveTab('events')} isActive={activeTab === 'events'} />
                    <Button text='Trending Topics' variant='cta' size='sm' iconLeft={<TrendingUp size={16} />} onClick={() => setActiveTab('trending')} isActive={activeTab === 'trending'} />
                    <Button text='MeetUps' variant='cta' size='sm' iconLeft={<Star size={16} />} onClick={() => setActiveTab('meetups')} isActive={activeTab === 'meetups'} />
                    <Button text='Featured Members' variant='cta' size='sm' iconLeft={<Star size={16} />} onClick={() => setActiveTab('members')} isActive={activeTab === 'members'} />
                </div>
            </div>

            <div className='mt-8'>
                {activeTab === 'feed' && (
                    <div className='space-y-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 grid-template-2fr-auto'>
                            {data.feed.map((post) => (
                                <FeedPost
                                    key={post.id}
                                    nameAbv={post.nameAbv}
                                    name={post.name}
                                    userType={post.userType}
                                    timeAgo={post.timeAgo}
                                    postContent={post.postContent}
                                    imgUrl={post.imgUrl}
                                    profileUrl={post.profileUrl}
                                    likes={post.likes}
                                    comments={post.comments}
                                    shares={post.shares}
                                />
                            ))}
                        </div>

                        <div>
                            <div className='flex flex-row items-center justify-between mb-4'>
                                <h2 className='font-dynapuff text-xl md:text-2xl font-semibold'>Latest Photos</h2>
                                <Button text='View Photos' variant='secondary' size='sm' onClick={() => setActiveTab('photos')} />
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                {data.photos.slice(0, 8).map((photo) => (
                                    <div key={photo.id} className='group relative overflow-hidden rounded-lg cursor-pointer'>
                                        <img src={photo.src} alt={photo.alt} className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300' />
                                        <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <div className='absolute bottom-3 left-3 right-3 text-white flex justify-between items-center'>
                                                <div className='flex items-center gap-2'>
                                                    <Heart size={14} />
                                                    <span className='text-sm'>{photo.likes}</span>
                                                    <span className='ml-2 text-sm'>{photo.comments} comments</span>
                                                </div>
                                                <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>{photo.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className='flex flex-row items-center justify-between mb-4'>
                                <h2 className='font-dynapuff text-xl md:text-2xl font-semibold'>Upcoming Events</h2>
                                <Button text='View Events' variant='secondary' size='sm' onClick={() => setActiveTab('events')} />
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {data.events.slice(0, 6).map((event) => (
                                    <EventCard
                                        key={event._id}
                                        eventId={event._id}
                                        tags={event.tags}
                                        imageUrl={event.images[0] ?? '/images/party.png'}
                                        imageAlt={event.title}
                                        title={event.title}
                                        organizer={`By ${event.organizer?.name ?? 'Event organizer'}`}
                                        descriptions={[event.description]}
                                        location={event.venue}
                                        price={event.ticketTypes.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'photos' && (
                    <div>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Photo Gallery</h3>
                            <Button text='Back to Feed' variant='secondary' size='sm' onClick={() => setActiveTab('feed')} />
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {data.photos.map((photo) => (
                                <div key={photo.id} className='group relative overflow-hidden rounded-lg cursor-pointer'>
                                    <img src={photo.src} alt={photo.alt} className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300' />
                                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <div className='absolute bottom-3 left-3 right-3 text-white flex justify-between items-center'>
                                            <div className='flex items-center gap-2'>
                                                <Heart size={14} />
                                                <span className='text-sm'>{photo.likes}</span>
                                                <span className='ml-2 text-sm'>{photo.comments} comments</span>
                                            </div>
                                            <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>{photo.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div>
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Community Events</h3>
                            <Button text='Back to Feed' variant='secondary' size='sm' onClick={() => setActiveTab('feed')} />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {data.events.map((event) => (
                                <EventCard
                                    key={event._id}
                                    eventId={event._id}
                                    tags={event.tags}
                                    imageUrl={event.images[0] ?? '/images/party.png'}
                                    imageAlt={event.title}
                                    title={event.title}
                                    organizer={`By ${event.organizer?.name ?? 'Event organizer'}`}
                                    descriptions={[event.description]}
                                    location={event.venue}
                                    price={event.ticketTypes.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'trending' && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {data.trendingTopics.map((topic, index) => {
                            const palette = categoryPalette[index % categoryPalette.length]
                            return <TrendingTopics key={topic.title} hoverColor={palette.hoverColor} iconBoxColor={palette.iconBoxColor} icon={palette.icon} title={topic.title} postCount={topic.postCount} />
                        })}
                    </div>
                )}

                {activeTab === 'meetups' && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6'>
                        {data.meetups.map((meetup) => <MeetUp key={`${meetup.title}-${meetup.date}`} {...meetup} />)}
                    </div>
                )}

                {activeTab === 'members' && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {data.members.map((member) => <FeaturedMember key={member.name} {...member} />)}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Page