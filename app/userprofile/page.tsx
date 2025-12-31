'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { 
    Calendar, MapPin, Share2, Link2, Mail, Sparkles, Star, Utensils, 
    Music, Laptop, Crown, MessageCircle, Heart, Camera, Users, 
    ThumbsUp, Map, BookOpen, TrendingUp, Clock, Image, Award, 
    MessageSquare, CheckCircle, Plus
} from 'lucide-react'
import Button from '@/components/Button'
import EventCard from '@/components/EventCard'

const Page = () => {
    const [activeTab, setActiveTab] = useState('events')

    const events = [
        {
            eventId: 1,
            tags: ["Music", "Trending"],
            imageUrl: "/images/party.png",
            imageAlt: "Summer Music Festival",
            title: "Summer Music Festival 2025",
            organizer: "By Department of Festivals",
            descriptions: ["Musical Events", "All University students can join"],
            location: "Central Park, New York",
            price: "Rs.360",
        },
        {
            eventId: 2,
            tags: ["Art", "Featured"],
            imageUrl: "/images/ArtExhibition.png",
            imageAlt: "Art Exhibition",
            title: "Annual Art Exhibition",
            organizer: "City Art Council",
            descriptions: ["Art displays", "Open to all"],
            location: "Gallery Hall, Kathmandu",
            price: "Rs.200",
        },
        {
            eventId: 3,
            tags: ["Tech", "Workshop"],
            imageUrl: "/images/ReactWorkshop.png",
            imageAlt: "Tech Workshop",
            title: "React Workshop",
            organizer: "Tech Group Nepal",
            descriptions: ["Hands-on sessions", "Bring your laptop"],
            location: "Tech Hub, Kathmandu",
            price: "Rs.500",
        }
    ]

    const reviews = [
        {
            id: 1,
            eventName: "Food & Wine Expo 2024",
            eventImage: "/images/FoodFestival.png",
            rating: 5,
            date: "2 weeks ago",
            comment: "Amazing variety of vendors and delicious tastings throughout the day!",
            likes: 24,
            category: "Food Festival"
        },
        {
            id: 2,
            eventName: "Summer Music Festival",
            eventImage: "/images/party.png",
            rating: 4,
            date: "1 month ago",
            comment: "Incredible lineup and amazing energy! Sound quality was perfect.",
            likes: 42,
            category: "Music"
        },
        {
            id: 3,
            eventName: "Tech Conference",
            eventImage: "/images/ReactWorkshop.png",
            rating: 4.5,
            date: "3 weeks ago",
            comment: "Great networking opportunities and insightful sessions.",
            likes: 18,
            category: "Technology"
        },
        {
            id: 4,
            eventName: "Art Exhibition",
            eventImage: "/images/ArtExhibition.png",
            rating: 5,
            date: "1 week ago",
            comment: "Beautiful collection of contemporary art. Highly recommended!",
            likes: 31,
            category: "Art"
        }
    ]

    const photos = [
        { id: 1, src: "/images/party.png", alt: "Music Festival", likes: 45, comments: 8, category: "Music" },
        { id: 2, src: "/images/FoodFestival.png", alt: "Food Festival", likes: 32, comments: 5, category: "Food" },
        { id: 3, src: "/images/ArtExhibition.png", alt: "Art Exhibition", likes: 28, comments: 3, category: "Art" },
        { id: 4, src: "/images/ReactWorkshop.png", alt: "Tech Workshop", likes: 51, comments: 12, category: "Tech" },
        { id: 5, src: "/images/party.png", alt: "Concert", likes: 67, comments: 15, category: "Music" },
        { id: 6, src: "/images/FoodFestival.png", alt: "Food Tasting", likes: 39, comments: 6, category: "Food" },
        { id: 7, src: "/images/ArtExhibition.png", alt: "Art Gallery", likes: 22, comments: 4, category: "Art" },
        { id: 8, src: "/images/ReactWorkshop.png", alt: "Conference", likes: 43, comments: 9, category: "Tech" },
        { id: 9, src: "/images/party.png", alt: "Night Festival", likes: 58, comments: 11, category: "Music" },
    ]

    const activities = [
        {
            id: 1,
            type: "event_attended",
            icon: <CheckCircle size={18} />,
            color: "text-green-500",
            title: "Attended Summer Music Festival",
            description: "Checked in at Central Park, New York",
            time: "2 hours ago",
            image: "/images/party.png"
        },
        {
            id: 2,
            type: "review_posted",
            icon: <MessageSquare size={18} />,
            color: "text-blue-500",
            title: "Posted a review",
            description: "Rated Food & Wine Expo 5 stars",
            time: "1 day ago",
            image: "/images/FoodFestival.png"
        },
        {
            id: 3,
            type: "badge_earned",
            icon: <Award size={18} />,
            color: "text-yellow-500",
            title: "Earned VIP Attendee badge",
            description: "For attending 50+ events",
            time: "2 days ago",
            image: null
        },
        {
            id: 4,
            type: "photo_uploaded",
            icon: <Camera size={18} />,
            color: "text-purple-500",
            title: "Uploaded 3 photos",
            description: "From Tech Conference 2024",
            time: "3 days ago",
            image: "/images/ReactWorkshop.png"
        },
        {
            id: 5,
            type: "following",
            icon: <Users size={18} />,
            color: "text-pink-500",
            title: "Started following John Smith",
            description: "Event organizer and music enthusiast",
            time: "1 week ago",
            image: null
        },
        {
            id: 6,
            type: "trending",
            icon: <TrendingUp size={18} />,
            color: "text-orange-500",
            title: "Review trending in Music category",
            description: "Your festival review got 42 likes",
            time: "1 week ago",
            image: "/images/party.png"
        }
    ]

    return (
        <section className='my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
            {/* Profile Header */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-6'>
                <Link href="/user/jane-doe" className='shrink-0'>
                    <div className='w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg'>
                        <span className='text-2xl md:text-3xl font-bold '>JD</span>
                    </div>
                </Link>

                <div className='flex-1 space-y-3'>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold'>Jane Doe</h1>
                        <p className='text-gray-500 text-lg'>@jane_doe</p>
                    </div>
                    
                    <div className='flex flex-wrap items-center gap-4 text-base md:text-lg'>
                        <div className='flex flex-col items-center'>
                            <span className='font-bold text-gray-900'>127</span>
                            <span className='text-gray-500 text-sm'>Events</span>
                        </div>
                        <div className='w-px h-6 bg-gray-300'></div>
                        <div className='flex flex-col items-center'>
                            <span className='font-bold text-gray-900'>2,345</span>
                            <span className='text-gray-500 text-sm'>Followers</span>
                        </div>
                        <div className='w-px h-6 bg-gray-300'></div>
                        <div className='flex flex-col items-center'>
                            <span className='font-bold text-gray-900'>834</span>
                            <span className='text-gray-500 text-sm'>Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bio & Links */}
            <div className='mt-6 space-y-4'>
                <p className='text-gray-700'>
                    Passionate about music festivals, tech conferences, and food events.
                    Always looking for the next great experience! 🎵🍕💡
                </p>

                <div className='flex flex-wrap gap-4'>
                    <a href="https://johndoe.com" className='flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline'>
                        <Link2 size={18} />
                        <span>johndoe.com</span>
                    </a>
                    <a href="mailto:johndoe@gmail.com" className='flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline'>
                        <Mail size={18} />
                        <span>johndoe@gmail.com</span>
                    </a>
                </div>

                <div className='flex flex-wrap gap-3'>
                    <Button text='Follow' variant="cta" size="md"></Button>
                    <Button text='Message' variant="cta" size="md" iconLeft={<MessageCircle size={18} />}></Button>
                    <Button text='Share' variant="cta" size="md" iconLeft={<Share2 size={18} />}></Button>
                </div>
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            {/* Badges Section */}
            <div className='mb-8'>
                <h2 className='font-dynapuff text-xl md:text-2xl font-bold mb-4'>Badges</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                    {[
                        { icon: <Sparkles />, title: "Early Adopter", rarity: "Legendary" },
                        { icon: <Star />, title: "VIP Attendee", rarity: "Epic" },
                        { icon: <Music />, title: "Music Lover", rarity: "Rare" },
                        { icon: <Utensils />, title: "Foodie Explorer", rarity: "Rare" },
                        { icon: <Laptop />, title: "Tech Pioneer", rarity: "Rare" },
                        { icon: <Crown />, title: "Community Champion", rarity: "Epic" },
                    ].map((badge, index) => (
                        <div key={index} className='flex flex-col items-center justify-center p-4 border border-brown-normal rounded-xl hover:shadow-md transition-shadow'>
                            <div className='text-brown-normal mb-2'>{badge.icon}</div>
                            <p className='text-sm font-medium text-center mb-2'>{badge.title}</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                badge.rarity === 'Legendary' ? 'bg-purple-100 text-purple-700' :
                                badge.rarity === 'Epic' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                            }`}>
                                {badge.rarity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            {/* Interests */}
            <div className='mb-8'>
                <h2 className='font-dynapuff text-xl md:text-2xl font-bold mb-4'>Interests</h2>
                <div className='flex flex-wrap gap-2'>
                    {["Music", "Technology", "Food & Wine", "Art", "Networking", "Travel", "Sports", "Photography"].map((interest) => (
                        <Button key={interest} variant="tag" size="md" text={interest}></Button>
                    ))}
                </div>
            </div>

            <div className='h-px bg-gray-200 my-6'></div>

            {/* Navigation Tabs */}
            <div className='flex flex-wrap gap-2 mb-6'>
                {['events', 'reviews', 'photos', 'activity'].map((tab) => (
                    <Button
                        text={tab.charAt(0).toUpperCase() + tab.slice(1)}
                        key={tab}
                        variant={activeTab === tab ? "secondary" : "cta"}
                        size="md"
                        onClick={() => setActiveTab(tab)}
                    >
                        
                    </Button>
                ))}
            </div>

            {/* EVENTS TAB */}
            {activeTab === 'events' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Recent Events</h3>
                        <Button text='Create Event' variant="cta" size="sm" iconLeft={<Plus size={16} />}>
                        </Button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {events.map((event) => (
                            <EventCard key={event.eventId} {...event} />
                        ))}
                    </div>
                </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Recent Reviews</h3>
                        <span className='text-gray-500'>Average rating: 4.6 ★</span>
                    </div>
                    <div className='space-y-4'>
                        {reviews.map((review) => (
                            <div key={review.id} className='border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow'>
                                <div className='flex gap-4'>
                                    <img 
                                        src={review.eventImage} 
                                        alt={review.eventName}
                                        className='w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shrink-0'
                                    />
                                    <div className='flex-1'>
                                        <div className='flex flex-col md:flex-row md:items-start justify-between'>
                                            <div>
                                                <h3 className='font-bold text-gray-900'>{review.eventName}</h3>
                                                <div className='flex items-center gap-2 mt-1'>
                                                    <div className='flex'>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i}
                                                                size={16}
                                                                className={i < Math.floor(review.rating) 
                                                                    ? "fill-yellow-400 text-yellow-400" 
                                                                    : "text-gray-300"
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className='text-sm text-gray-600 ml-2'>{review.rating}</span>
                                                    <span className='text-gray-300 mx-1'>•</span>
                                                    <span className='text-sm text-gray-500'>{review.date}</span>
                                                    <span className='text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full ml-2'>
                                                        {review.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 mt-2'>{review.comment}</p>
                                        <div className='flex items-center gap-4 mt-3 pt-3 border-t border-gray-100'>
                                            <button className='flex items-center gap-1 text-gray-600 hover:text-red-500'>
                                                <Heart size={16} />
                                                <span className='text-sm'>{review.likes} likes</span>
                                            </button>
                                            <button className='flex items-center gap-1 text-gray-600 hover:text-blue-500'>
                                                <MessageCircle size={16} />
                                                <span className='text-sm'>Comment</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PHOTOS TAB */}
            {activeTab === 'photos' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Photo Gallery</h3>
                        <Button text='Upload Photos' variant="cta" size="sm" iconLeft={<Camera size={16} />}></Button>
                    </div>
                    
                    {/* Photo Albums */}
                    <div className='mb-8'>
                        <h4 className='font-semibold text-gray-900 mb-3'>Albums</h4>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {[
                                { name: "Music Festivals", count: 24, cover: "/images/party.png" },
                                { name: "Food Events", count: 18, cover: "/images/FoodFestival.png" },
                                { name: "Art Exhibitions", count: 12, cover: "/images/ArtExhibition.png" },
                                { name: "Tech Conferences", count: 15, cover: "/images/ReactWorkshop.png" },
                            ].map((album, index) => (
                                <div key={index} className='group cursor-pointer'>
                                    <div className='relative overflow-hidden rounded-lg mb-2'>
                                        <img 
                                            src={album.cover} 
                                            alt={album.name}
                                            className='w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300'
                                        />
                                        <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors'></div>
                                    </div>
                                    <h5 className='font-medium text-gray-900'>{album.name}</h5>
                                    <p className='text-sm text-gray-500'>{album.count} photos</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* All Photos Grid */}
                    <div>
                        <h4 className='font-semibold text-gray-900 mb-3'>All Photos</h4>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {photos.map((photo) => (
                                <div key={photo.id} className='group relative overflow-hidden rounded-lg cursor-pointer'>
                                    <img 
                                        src={photo.src} 
                                        alt={photo.alt}
                                        className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300'
                                    />
                                    <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'>
                                        <div className='absolute bottom-3 left-3 right-3 text-white'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center gap-2'>
                                                    <Heart size={14} />
                                                    <span className='text-sm'>{photo.likes}</span>
                                                    <MessageSquare size={14} className='ml-2' />
                                                    <span className='text-sm'>{photo.comments}</span>
                                                </div>
                                                <span className='text-xs bg-white/20 px-2 py-1 rounded-full'>
                                                    {photo.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ACTIVITY TAB */}
            
            
            {activeTab === 'activity' && (
                <div>
                    <div className='flex justify-between items-center mb-4'>
                        <h3 className='font-dynapuff text-lg md:text-xl font-semibold'>Recent Activity</h3>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <Clock size={16} />
                            <span className='text-sm'>Last 30 days</span>
                        </div>
                    </div>
                    
                    <div className='space-y-4'>
                        {activities.map((activity) => (
                            <div key={activity.id} className='flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                                <div className={`p-2 rounded-full ${activity.color.replace('text', 'bg')} bg-opacity-10`}>
                                    <div className={activity.color}>
                                        {activity.icon}
                                    </div>
                                </div>
                                
                                <div className='flex-1'>
                                    <div className='flex flex-col md:flex-row md:items-start justify-between'>
                                        <div>
                                            <h4 className='font-medium text-gray-900'>{activity.title}</h4>
                                            <p className='text-sm text-gray-600 mt-1'>{activity.description}</p>
                                        </div>
                                        <span className='text-sm text-gray-500 mt-2 md:mt-0'>{activity.time}</span>
                                    </div>
                                </div>
                                
                                {activity.image && (
                                    <img 
                                        src={activity.image} 
                                        alt="Activity"
                                        className='w-16 h-16 rounded-lg object-cover shrink-0'
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    
                </div>
            )}
        </section>
    )
}

export default Page