'use client';

import EventCard from '@/components/EventCard';
import { useEffect, useState } from 'react';

type EventItem = { _id: string; title: string; description: string; venue: string; tags: string[]; images: string[]; ticketTypes: { price: number }[]; startDate: string; status: string };

export default function OrganizerEventsPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/organizer/dashboard', { cache: 'no-store' })
            .then(async (response) => {
                const result = await response.json();
                if (!response.ok || !result.success) throw new Error(result.error?.message || 'Unable to load your events.');
                setEvents((result.data.events as EventItem[]).filter((event) => new Date(event.startDate) >= new Date() && event.status !== 'cancelled' && event.status !== 'completed'));
            })
            .catch((loadError) => setError(loadError instanceof Error ? loadError.message : 'Unable to load your events.'));
    }, []);

    return <section className='app-page font-cause text-text-dark'>
        <h1 className='font-dynapuff text-2xl font-bold md:text-3xl'>Upcoming Events</h1>
        {error && <p className='mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700'>{error}</p>}
        <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {events.length ? events.map((event) => <EventCard key={event._id} eventId={event._id} tags={event.tags ?? []} imageUrl={event.images?.[0] ?? '/images/party.png'} imageAlt={event.title} title={event.title} organizer='Your event' descriptions={[event.description]} location={event.venue} price={event.ticketTypes?.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...event.ticketTypes.map((ticket) => ticket.price))}`} />) : <p className='text-text-light'>No upcoming events yet.</p>}
        </div>
    </section>;
}
