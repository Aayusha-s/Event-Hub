'use client'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
    Camera,
    CheckCircle,
    Clock,
    Crown,
    Heart,
    Link2,
    Mail,
    MessageCircle,
    MessageSquare,
    Plus,
    Share2,
    Sparkles,
    Star,
    TrendingUp,
    Users,
    Utensils,
    Music,
    Laptop,
    X,
} from 'lucide-react'
import Button from '@/components/Button'
import EventCard from '@/components/EventCard'

type ProfileResponse = {
    user: {
        _id: string;
        name?: string;
        email?: string;
        phone?: string;
        role?: string;
        profileImage?: string;
        bio?: string;
        website?: string;
        location?: string;
        username?: string;
        interests?: string[];
    };
    owner: boolean;
    relationship: { isFollowing: boolean; followsViewer: boolean; friend: boolean; mutualFriends: number };
    counts: { followers: number; following: number; friends: number };
    events: {
        hosted: Array<{ _id: string; title: string; venue: string; images: string[]; tags: string[]; description: string; ticketTypes: { price: number }[] }>;
        archived: Array<{ _id: string; title: string; venue: string; images: string[]; tags: string[]; description: string; ticketTypes: { price: number }[] }>;
        attended: Array<{ _id: string; title?: string; venue?: string; startDate?: string; endDate?: string; images?: string[]; ticketTypes?: { price: number }[]; organizer?: { name?: string } }>;
        upcoming: Array<{ _id: string; title?: string; venue?: string; startDate?: string; endDate?: string; images?: string[]; ticketTypes?: { price: number }[]; organizer?: { name?: string } }>;
        past: Array<{ _id: string; title?: string; venue?: string; startDate?: string; endDate?: string; images?: string[]; ticketTypes?: { price: number }[]; organizer?: { name?: string } }>;
        saved: Array<{ _id?: string; title?: string; venue?: string; images?: string[]; ticketTypes?: { price: number }[]; startDate?: string; endDate?: string; organizer?: { name?: string } }>;
    };
    reviews: Array<{ _id: string; rating: number; text?: string; createdAt?: string; user?: { name?: string; profileImage?: string }; event?: { _id?: string; title?: string; images?: string[] } }>;
    photos: Array<{ _id: string; imageUrl: string; caption?: string; likes?: string[]; comments?: Array<{ text?: string }> }>;
    activity: Array<{ _id: string; title: string; description?: string; link?: string; createdAt: string }>;
};
type FollowUser = { _id: string; name?: string; username?: string; profileImage?: string; role?: string };

const fallbackImage = '/images/party.png';

const ProfilePage = () => {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'events' | 'archived' | 'reviews' | 'photos' | 'activity'>('events');
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionError, setActionError] = useState('');
    const [followList, setFollowList] = useState<{ type: 'followers' | 'following'; users: FollowUser[] } | null>(null);
    const [followListError, setFollowListError] = useState('');

    const identifier = useMemo(() => {
        const queryIdentifier = searchParams.get('userId') ?? searchParams.get('username');
        return queryIdentifier || session?.user?.id || '';
    }, [searchParams, session?.user?.id]);

    const loadProfile = async () => {
        if (!identifier) {
            setError('Profile not found.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/profiles/${encodeURIComponent(identifier)}`, { cache: 'no-store' });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || 'Unable to load profile.');
            }
            setProfile(result.data as ProfileResponse);
            setError('');
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : 'Unable to load profile.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [identifier]);

    const toggleFollow = async () => {
        if (!identifier || !profile || profile.owner) return;
        try {
            setActionError('');
            const response = await fetch(`/api/profiles/${encodeURIComponent(identifier)}/follow`, {
                method: profile.relationship.isFollowing ? 'DELETE' : 'POST',
            });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || 'Unable to update follow status.');
            }
            await loadProfile();
        } catch (followError) {
            setActionError(followError instanceof Error ? followError.message : 'Unable to update follow status.');
        }
    };

    const openFollowList = async (type: 'followers' | 'following') => {
        try {
            setFollowListError('');
            const response = await fetch(`/api/profiles/${encodeURIComponent(identifier)}/follow?type=${type}`, { cache: 'no-store' });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load list.');
            setFollowList({ type, users: result.data as FollowUser[] });
        } catch (listError) {
            setFollowListError(listError instanceof Error ? listError.message : 'Unable to load list.');
        }
    };

    useEffect(() => {
        if (!followList) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [followList]);

    const shareProfile = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: profile?.user.name ?? 'Profile', url }).catch(() => undefined);
            return;
        }
        await navigator.clipboard.writeText(url);
    };

    const formatDate = (value?: string) => (value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : 'Recently');
    const formatMoney = (value?: number) => `Rs. ${(value ?? 0).toLocaleString()}`;
    const organizerHref = profile?.user.username ? `/userprofile?username=${encodeURIComponent(profile.user.username)}` : `/userprofile?userId=${profile?.user._id ?? ''}`;

    if (loading) {
        return <section className='my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>Loading profile…</section>;
    }

    if (error || !profile) {
        return <section className='my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'><h1 className='font-dynapuff text-2xl font-bold'>Profile not found</h1><p className='mt-2 text-red-600'>{error || 'The requested profile could not be loaded.'}</p></section>;
    }

    const isOwner = profile.owner;
    const profileImage = profile.user.profileImage ?? '/images/user-avatar.png';

    return (
        <section className='my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                <div className='shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg w-24 h-24 md:w-28 md:h-28'>
                    <img src={profileImage} alt={profile.user.name ?? 'Profile'} className='h-full w-full object-cover' />
                </div>

                <div className='flex-1 space-y-3'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold'>{profile.user.name ?? 'User'}</h1>
                        <p className='text-gray-500 text-lg capitalize'>{profile.user.role ?? 'attendee'}</p>
                    </div>

                    <div className='flex flex-wrap items-center gap-4 text-base md:text-lg'>
                        <div className='flex flex-col items-center'>
                            <span className='font-bold text-gray-900'>{profile.events.hosted.length}</span>
                            <span className='text-gray-500 text-sm'>Events</span>
                        </div>
                        <div className='w-px h-6 bg-gray-300'></div>
                        <button type='button' className='flex flex-col items-center' onClick={() => openFollowList('followers')}>
                            <span className='font-bold text-gray-900'>{profile.counts.followers}</span>
                            <span className='text-gray-500 text-sm'>Followers</span>
                        </button>
                        <div className='w-px h-6 bg-gray-300'></div>
                        <button type='button' className='flex flex-col items-center' onClick={() => openFollowList('following')}>
                            <span className='font-bold text-gray-900'>{profile.counts.following}</span>
                            <span className='text-gray-500 text-sm'>Following</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className='mt-6 space-y-4'>
                <p className='text-gray-700'>
                    {profile.user.bio || (profile.user.phone ? `Phone: ${profile.user.phone}` : 'Add your contact details and profile image to personalize your account.')}
                </p>

                <div className='flex flex-wrap gap-4'>
                    {profile.user.website && (
                        <a href={profile.user.website} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline'>
                            <Link2 size={18} />
                            <span>{profile.user.website.replace(/^https?:\/\//, '')}</span>
                        </a>
                    )}
                    {profile.user.email && (
                        <a href={`mailto:${profile.user.email}`} className='flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline'>
                            <Mail size={18} />
                            <span>{profile.user.email}</span>
                        </a>
                    )}
                    {profile.user.location && <span className='flex items-center gap-2 text-gray-600'><Sparkles size={18} />{profile.user.location}</span>}
                </div>

                <div className='flex flex-wrap gap-3'>
                    {!isOwner && (
                        <Button text={profile.relationship.isFollowing ? 'Following' : 'Follow'} variant='cta' size='md' onClick={toggleFollow} />
                    )}
                    <Button text='Message' variant='cta' size='md' iconLeft={<MessageCircle size={18} />} />
                    <Button text='Share' variant='cta' size='md' iconLeft={<Share2 size={18} />} onClick={shareProfile} />
                    {isOwner && <Button text='Edit Settings' variant='secondary' size='md' onClick={() => router.push('/settings/profile')} />}
                </div>
                {actionError && <p className='rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>{actionError}</p>}
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            <div className='mb-8'>
                <h2 className='font-dynapuff text-xl md:text-2xl font-bold mb-4'>Badges</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                    {[
                        { icon: <Sparkles />, title: 'Early Adopter', rarity: 'Legendary' },
                        { icon: <Star />, title: 'VIP Attendee', rarity: 'Epic' },
                        { icon: <Music />, title: 'Music Lover', rarity: 'Rare' },
                        { icon: <Utensils />, title: 'Foodie Explorer', rarity: 'Rare' },
                        { icon: <Laptop />, title: 'Tech Pioneer', rarity: 'Rare' },
                        { icon: <Crown />, title: 'Community Champion', rarity: 'Epic' },
                    ].map((badge, index) => (
                        <div key={index} className='flex flex-col items-center justify-center p-4 border border-brown-normal rounded-xl hover:shadow-md transition-shadow'>
                            <div className='text-brown-normal mb-2'>{badge.icon}</div>
                            <p className='text-sm font-medium text-center mb-2'>{badge.title}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.rarity === 'Legendary' ? 'bg-purple-100 text-purple-700' : badge.rarity === 'Epic' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {badge.rarity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            <div className='mb-8'>
                <h2 className='font-dynapuff text-xl md:text-2xl font-bold mb-4'>Interests</h2>
                <div className='flex flex-wrap gap-2'>
                    {(profile.user.interests?.length ? profile.user.interests : ['Music', 'Technology', 'Food & Wine', 'Art', 'Networking', 'Travel', 'Sports', 'Photography']).map((interest) => (
                        <Button key={interest} variant='tag' size='md' text={interest} />
                    ))}
                </div>
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            <div className='flex flex-wrap gap-2 mb-6'>
                {['events', ...(profile.user.role === 'organizer' && profile.owner ? ['archived'] : []), 'reviews', 'photos', 'activity'].map((tab) => (
                    <Button text={tab.charAt(0).toUpperCase() + tab.slice(1)} key={tab} variant={activeTab === tab ? 'secondary' : 'cta'} size='md' onClick={() => setActiveTab(tab as typeof activeTab)} />
                ))}
            </div>

            {activeTab === 'events' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Hosted Events</h3>
                        <Button text='Explore More' variant='cta' size='sm' iconLeft={<Plus size={16} />} onClick={() => router.push(`/explore-events?organizer=${profile.user._id}`)} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {profile.events.hosted.length ? profile.events.hosted.map((event) => (
                            <EventCard
                                key={event._id}
                                eventId={event._id}
                                tags={event.tags ?? []}
                                imageUrl={event.images?.[0] ?? fallbackImage}
                                imageAlt={event.title}
                                title={event.title}
                                organizer={`By ${profile.user.name ?? 'Event organizer'}`}
                                descriptions={[event.description]}
                                location={event.venue}
                                price={event.ticketTypes?.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`}
                            />
                        )) : <p className='text-gray-500'>No hosted events yet.</p>}
                    </div>
                </div>
            )}

            {activeTab === 'archived' && profile.user.role === 'organizer' && profile.owner && (
                <div><h3 className='mb-4 font-dynapuff text-lg font-semibold'>Archived Events</h3><div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>{profile.events.archived.length ? profile.events.archived.map((event) => <EventCard key={event._id} eventId={event._id} tags={event.tags ?? []} imageUrl={event.images?.[0] ?? fallbackImage} imageAlt={event.title} title={event.title} organizer={`By ${profile.user.name ?? 'Event organizer'}`} descriptions={[event.description]} location={event.venue} price={event.ticketTypes?.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`} />) : <p className='text-gray-500'>No archived events yet.</p>}</div></div>
            )}

            {activeTab === 'reviews' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Recent Reviews</h3>
                        <span className='text-gray-500'>Average rating: {profile.reviews.length ? (profile.reviews.reduce((total, review) => total + review.rating, 0) / profile.reviews.length).toFixed(1) : '0.0'} ★</span>
                    </div>
                    <div className='space-y-4'>
                        {profile.reviews.length ? profile.reviews.map((review) => (
                            <div key={review._id} className='border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow'>
                                <div className='flex gap-4'>
                                    <div className='w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 bg-brown-light'>
                                        <img src={review.event?.images?.[0] ?? fallbackImage} alt={review.event?.title ?? 'Review'} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex flex-col md:flex-row md:items-start justify-between'>
                                            <div>
                                                <h3 className='font-bold text-gray-900'>{review.event?.title ?? 'Review'}</h3>
                                                <p className='text-sm text-gray-500'>By {review.user?.name ?? 'Vivnt member'}</p>
                                                <div className='flex flex-wrap items-center gap-2 mt-1'>
                                                    <div className='flex'>
                                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />)}
                                                    </div>
                                                    <span className='text-sm text-gray-500'>{formatDate(review.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 mt-2'>{review.text}</p>
                                    </div>
                                </div>
                            </div>
                        )) : <p className='text-gray-500'>No reviews yet.</p>}
                    </div>
                </div>
            )}

            {activeTab === 'photos' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Photo Gallery</h3>
                        <Button text='Upload Photos' variant='cta' size='sm' iconLeft={<Camera size={16} />} />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {profile.photos.length ? profile.photos.map((photo) => (
                            <div key={photo._id} className='group relative overflow-hidden rounded-lg cursor-pointer'>
                                <img src={photo.imageUrl} alt={photo.caption ?? 'Photo'} className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300' />
                                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <div className='absolute bottom-3 left-3 right-3 text-white'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-2'>
                                                <Heart size={14} />
                                                <span className='text-sm'>{photo.likes?.length ?? 0}</span>
                                                <MessageSquare size={14} className='ml-2' />
                                                <span className='text-sm'>{photo.comments?.length ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <p className='text-gray-500'>No photos uploaded yet.</p>}
                    </div>
                </div>
            )}

            {activeTab === 'activity' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Recent Activity</h3>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <Clock size={16} />
                            <span className='text-sm'>Live from MongoDB</span>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        {profile.activity.length ? profile.activity.map((activity) => (
                            <div key={activity._id} className='flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                                <div className='p-2 rounded-full bg-brown-light'>
                                    <CheckCircle size={18} className='text-green-500' />
                                </div>

                                <div className='flex-1'>
                                    <div className='flex flex-col md:flex-row md:items-start justify-between'>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>{activity.title}</h4>
                                            <p className='text-sm text-gray-600 mt-1'>{activity.description}</p>
                                        </div>
                                        <span className='text-sm text-gray-500 mt-2 md:mt-0'>{formatDate(activity.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        )) : <p className='text-gray-500'>No activity yet.</p>}
                    </div>
                </div>
            )}
            {followList && <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4' role='dialog' aria-modal='true'>
                <div className='w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-xl'>
                    <div className='flex items-center justify-between'><h2 className='font-dynapuff text-xl font-semibold'>{followList.type === 'followers' ? 'Followers' : 'Following'}</h2><button type='button' onClick={() => setFollowList(null)} aria-label='Close'><X size={20} /></button></div>
                    {followListError && <p className='mt-3 text-sm text-red-600'>{followListError}</p>}
                    <div className='mt-4 max-h-96 space-y-3 overflow-y-auto'>{followList.users.length ? followList.users.map((user) => <Link key={user._id} href={user.username ? `/userprofile?username=${encodeURIComponent(user.username)}` : `/userprofile?userId=${user._id}`} className='flex items-center gap-3 rounded-lg p-2 hover:bg-surface-hover'><img src={user.profileImage ?? '/images/user-avatar.png'} alt={user.name ?? 'User'} className='h-10 w-10 rounded-full object-cover' /><span><strong className='block'>{user.name ?? 'User'}</strong><small className='text-text-light'>{user.username ? `@${user.username}` : user.role ?? ''}</small></span></Link>) : <p className='py-6 text-center text-text-light'>No {followList.type} yet.</p>}</div>
                </div>
            </div>}
        </section>
    )
}

export default function Page() { return <Suspense fallback={<section className='px-4 py-8 text-text-dark'>Loading profile…</section>}><ProfilePage /></Suspense>; }
