'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Music,
    Utensils,
    Briefcase,
    Palette,
    Trophy,
    Heart,
    Code,
    BookOpen,
    Users,
    Zap,
    Camera,
    Gamepad2,
    MapPin,
    TrendingUp,
    Search,
} from 'lucide-react'
import EventCard from '@/components/EventCard'
import Pagination from '@/components/Pagination'
import Button from '@/components/Button'
import SectionContainer from '@/components/SectionContainer'

type Event = {
    _id: string
    title: string
    description: string
    venue: string
    tags: string[]
    images: string[]
    ticketTypes: { price: number }[]
    organizer?: { name?: string }
}

type Category = {
    name: string
    count: number
}

// Category display mapping with icons and human-readable names
const CATEGORY_CONFIG: Record<
    string,
    { label: string; icon: React.ReactNode; color: string }
> = {
    music: {
        label: 'Music & Concerts',
        icon: <Music className='w-6 h-6' />,
        color: 'from-pink-500 to-rose-500',
    },
    food: {
        label: 'Food & Dining',
        icon: <Utensils className='w-6 h-6' />,
        color: 'from-orange-500 to-amber-500',
    },
    business: {
        label: 'Business & Networking',
        icon: <Briefcase className='w-6 h-6' />,
        color: 'from-blue-500 to-cyan-500',
    },
    arts: {
        label: 'Arts & Culture',
        icon: <Palette className='w-6 h-6' />,
        color: 'from-purple-500 to-indigo-500',
    },
    sports: {
        label: 'Sports & Recreation',
        icon: <Trophy className='w-6 h-6' />,
        color: 'from-green-500 to-emerald-500',
    },
    wellness: {
        label: 'Health & Wellness',
        icon: <Heart className='w-6 h-6' />,
        color: 'from-red-500 to-pink-500',
    },
    technology: {
        label: 'Technology & Innovation',
        icon: <Code className='w-6 h-6' />,
        color: 'from-indigo-500 to-purple-500',
    },
    education: {
        label: 'Education & Learning',
        icon: <BookOpen className='w-6 h-6' />,
        color: 'from-blue-600 to-blue-400',
    },
    community: {
        label: 'Community & Social',
        icon: <Users className='w-6 h-6' />,
        color: 'from-teal-500 to-green-500',
    },
    entertainment: {
        label: 'Entertainment',
        icon: <Gamepad2 className='w-6 h-6' />,
        color: 'from-fuchsia-500 to-purple-500',
    },
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [events, setEvents] = useState<Event[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

    useEffect(() => {
        // Fetch categories
        fetch('/api/events/taxonomy')
            .then((r) => r.json())
            .then((r) => {
                if (r.success) setCategories(r.data.categories)
            })

        // Fetch all events
        fetch('/api/events?status=published&pageSize=20')
            .then((r) => r.json())
            .then((r) => {
                if (r.success) {
                    setEvents(r.data.items)
                    setFilteredEvents(r.data.items)
                }
            })
    }, [])

    // Filter events by selected category
    useEffect(() => {
        if (selectedCategory) {
            setFilteredEvents(
                events.filter((event) =>
                    event.tags?.some((tag) =>
                        tag.toLowerCase().includes(selectedCategory.toLowerCase())
                    )
                )
            )
        } else {
            setFilteredEvents(events)
        }
    }, [selectedCategory, events])

    return (
        <main className='bg-gradient-to-b from-background to-white'>
            {/* Hero Section */}
            <section className='bg-gradient-to-r from-brown-light to-background py-12 md:py-16'>
                <SectionContainer>
                    <div className='text-center max-w-3xl mx-auto'>
                        <h1 className='font-dynapuff text-4xl md:text-5xl font-bold text-text-dark mb-4'>
                            Explore Events by Category
                        </h1>
                        <p className='text-lg text-gray-600 mb-6'>
                            Discover thousands of amazing events across diverse categories. Find what
                            excites you and join the community.
                        </p>
                    </div>
                </SectionContainer>
            </section>

            {/* Categories Grid */}
            <section className='py-12 md:py-16'>
                <SectionContainer>
                    <h2 className='font-dynapuff text-2xl md:text-3xl font-bold mb-8'>
                        Browse Categories
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12'>
                        {categories.map((category) => {
                            const config = CATEGORY_CONFIG[category.name.toLowerCase()] || {
                                label: category.name,
                                icon: <Zap className='w-6 h-6' />,
                                color: 'from-gray-500 to-gray-600',
                            }

                            return (
                                <button
                                    key={category.name}
                                    onClick={() =>
                                        setSelectedCategory(
                                            selectedCategory === category.name
                                                ? null
                                                : category.name
                                        )
                                    }
                                    className={`group relative overflow-hidden rounded-xl p-6 text-white font-bold transition-all duration-300 ${
                                        selectedCategory === category.name
                                            ? 'ring-2 ring-brown-normal scale-105 shadow-xl'
                                            : 'hover:shadow-lg hover:scale-102'
                                    }`}
                                    style={{
                                        background: `linear-gradient(135deg, var(--from-color), var(--to-color))`,
                                    }}
                                >
                                    <style>{`
                                        button {
                                            --from-color: ${config.color.split(' ')[1]};
                                            --to-color: ${config.color.split(' ')[3]};
                                        }
                                    `}</style>

                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors'></div>

                                    <div className='relative z-10 flex flex-col items-center gap-3'>
                                        <div className='text-white'>{config.icon}</div>
                                        <div className='text-center'>
                                            <p className='font-semibold text-sm md:text-base line-clamp-2'>
                                                {config.label}
                                            </p>
                                            <p className='text-xs md:text-sm opacity-90 mt-1'>
                                                {category.count} events
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Filter Info */}
                    {selectedCategory && (
                        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center justify-between'>
                            <div>
                                <p className='font-semibold text-blue-900'>
                                    Filtering by:{' '}
                                    {CATEGORY_CONFIG[selectedCategory.toLowerCase()]?.label ||
                                        selectedCategory}
                                </p>
                                <p className='text-sm text-blue-700'>
                                    Showing {filteredEvents.length} events
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className='px-4 py-2 bg-blue-200 text-blue-900 rounded-lg hover:bg-blue-300 transition-colors'
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </SectionContainer>
            </section>

            {/* Events Section */}
            <section className='py-12 md:py-16'>
                <SectionContainer>
                    <div className='mb-8'>
                        <h2 className='font-dynapuff text-2xl md:text-3xl font-bold mb-2'>
                            {selectedCategory
                                ? `${CATEGORY_CONFIG[selectedCategory.toLowerCase()]?.label || selectedCategory} Events`
                                : 'Featured Events'}
                        </h2>
                        <p className='text-gray-600'>
                            Showing {filteredEvents.length} of {events.length} total events
                        </p>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                                {filteredEvents.map((event) => (
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
                                        price={
                                            event.ticketTypes.some((t) => t.price === 0)
                                                ? 'Free'
                                                : `From Rs.${Math.min(
                                                      ...event.ticketTypes.map((t) => t.price)
                                                  )}`
                                        }
                                    />
                                ))}
                            </div>
                            <div className='mt-8'>
                                <Pagination />
                            </div>
                        </>
                    ) : (
                        <div className='text-center py-12'>
                            <Search size={48} className='mx-auto text-gray-300 mb-4' />
                            <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                                No events found
                            </h3>
                            <p className='text-gray-500 mb-6'>
                                There are no events in this category yet. Check back soon!
                            </p>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className='px-6 py-2 bg-brown-normal text-white rounded-lg hover:bg-brown-dark transition-colors'
                            >
                                View All Events
                            </button>
                        </div>
                    )}
                </SectionContainer>
            </section>

            {/* CTA Section */}
            <section className='bg-gradient-to-r from-brown-normal to-brown-dark py-12 md:py-16 text-white'>
                <SectionContainer>
                    <div className='text-center max-w-2xl mx-auto'>
                        <h2 className='font-dynapuff text-3xl md:text-4xl font-bold mb-4'>
                            Can't Find What You're Looking For?
                        </h2>
                        <p className='text-lg text-brown-light mb-6'>
                            Create your own event and bring your community together. Host memorable
                            experiences on Vivnt.
                        </p>
                        <Link href='/create-event/step-1'>
                            <Button text='Create an Event' variant='cta' size='lg' />
                        </Link>
                    </div>
                </SectionContainer>
            </section>
        </main>
    )
}
