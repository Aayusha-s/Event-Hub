'use client';

import Button from '@/components/Button';
import DashboardBox from '@/components/DashboardBox';
import PastEventsCard from '@/components/PastEventsCard';
import ReviewPopup from '@/components/ReviewPopup';
import SavedEventsCard from '@/components/SavedEventsCard';
import TicketPopup from '@/components/TicketPopup';
import UpcomingEventCard from '@/components/UpcomingEventCard';
import VendorCards from '@/components/VendorCards';
import { Calendar, CalendarCheck, Heart, History, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type EventSummary = {
    _id: string;
    title: string;
    venue: string;
    images: string[];
    startDate: string;
    endDate: string;
    category: string;
    ticketTypes: { price: number }[];
    organizer?: { name?: string };
};

type TicketData = {
    _id: string;
    ticketNumber: string;
    ticketType: string;
    qrCode: string;
    paymentStatus: string;
    ticketStatus: string;
    checkedIn: boolean;
    purchaseDate?: string;
    event: EventSummary;
};

type Dashboard = {
    upcoming: TicketData[];
    past: TicketData[];
    activeTickets: TicketData[];
    savedEvents: Array<{ event: EventSummary }>;
    totalEventsAttended: number;
    recentBookings: TicketData[];
    recentReviews: Array<{ _id: string; rating: number; text?: string; event: { _id: string; title: string } }>;
    favoriteCategories: string[];
    favoriteOrganizers: string[];
    spending: number;
};

const fallback = '/images/party.png';
const date = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(value));
const time = (value: string) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
const money = (value: number) => `Rs. ${value.toLocaleString()}`;

function Section({ title, actionText, onAction, children }: { title: string; actionText: string; onAction?: () => void; children: React.ReactNode }) {
    return (
        <>
            <div className='flex flex-row justify-between items-center mt-10'>
                <h2 className='font-dynapuff text-xl md:text-xl lg:text-2xl font-semibold'>{title}</h2>
                <Button text={actionText} variant='cta' size='sm' iconRight={<i className='fa-solid fa-arrow-right ml-2' />} onClick={onAction} />
            </div>
            {children}
        </>
    );
}

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<Dashboard | null>(null);
    const [ticket, setTicket] = useState<TicketData | null>(null);
    const [review, setReview] = useState<TicketData | null>(null);
    const [error, setError] = useState('');

    const load = async () => {
        try {
            const response = await fetch('/api/dashboard/attendee', { cache: 'no-store' });
            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || 'Unable to load dashboard.');
            }
            setData(result.data as Dashboard);
            setError('');
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.');
        }
    };

    useEffect(() => {
        load();
        const listener = () => load();
        window.addEventListener('focus', listener);
        return () => window.removeEventListener('focus', listener);
    }, []);

    const toggleSaved = async (eventId: string) => {
        await fetch('/api/saved-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventId }),
        });
        await load();
    };

    const submitReview = async (rating: number, text: string) => {
        if (!review) return;
        const response = await fetch(`/api/events/${review.event._id}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, text }),
        });
        if (!response.ok) {
            throw new Error((await response.json()).error?.message || 'Unable to save review.');
        }
        setReview(null);
        await load();
    };

    const upcoming = data?.upcoming ?? [];
    const past = data?.past ?? [];
    const activeTickets = data?.activeTickets ?? [];
    const savedEvents = data?.savedEvents ?? [];
    const favoriteCategories = data?.favoriteCategories ?? [];
    const favoriteOrganizers = data?.favoriteOrganizers ?? [];

    return (
        <section className='flex flex-col my-4 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>
            <DashboardBox
                title='Welcome to your dashboard'
                description={data ? `You have ${upcoming.length} upcoming events, ${savedEvents.length} saved events, and ${money(data.spending)} in total spending.` : 'Loading your events…'}
                buttonText='Explore New Events'
                buttonLink='/explore-events'
            />

            {error && <p className='mt-3 text-red-600'>{error}</p>}

            <div className='flex flex-col gap-2 md:flex-row md:gap-4 lg:gap-6 justify-between mt-10'>
                <VendorCards icon1={<Ticket className=' text-green-500' />} count={String(data?.totalEventsAttended ?? 0)} label='Total Events Attended' subLabel='All-time attendance' icon2={<History className='inline mr-2 text-blue-500' />} />
                <VendorCards icon1={<Calendar className=' text-blue-500' />} count={String(activeTickets.length)} label='Active Tickets' subLabel='Ready for check-in' icon2={<CalendarCheck className='inline mr-2 text-blue-500' />} />
                <VendorCards icon1={<Heart className=' text-pink-500' />} count={String(savedEvents.length)} label='Saved Events' subLabel='Your shortlist' />
                <VendorCards icon1={<Ticket className=' text-purple-500' />} count={money(data?.spending ?? 0)} label='Spending' subLabel='All paid bookings' />
            </div>

            {favoriteCategories.length > 0 && (
                <div className='flex flex-wrap gap-3 mt-4'>
                    {favoriteCategories.map((item) => <div key={item} className='rounded-full border border-brown-normal px-4 py-2 text-sm font-semibold'>{item}</div>)}
                </div>
            )}

            <Section title='Upcoming Events' actionText='View All' onAction={() => router.push('/explore-events')}>
                <div className='mt-6 grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
                    {upcoming.length ? upcoming.map((ticketData) => (
                        <UpcomingEventCard
                            key={ticketData._id}
                            img={ticketData.event.images[0] ?? fallback}
                            imgAlt={ticketData.event.title}
                            title={ticketData.event.title}
                            date={date(ticketData.event.startDate)}
                            location={ticketData.event.venue}
                            time={`${time(ticketData.event.startDate)} - ${time(ticketData.event.endDate)}`}
                            tickets={`${ticketData.ticketType} • ${ticketData.paymentStatus}`}
                            onOpen={() => setTicket(ticketData)}
                            onClick={() => setTicket(ticketData)}
                        />
                    )) : <p className='text-sm text-text-light'>No upcoming events yet.</p>}
                </div>
            </Section>

            <Section title='Past Events' actionText='View All' onAction={() => router.push('/explore-events')}>
                <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
                    {past.length ? past.map((ticketData) => (
                        <PastEventsCard
                            key={ticketData._id}
                            title={ticketData.event.title}
                            date={date(ticketData.event.endDate)}
                            location={ticketData.event.venue}
                            rating={data?.recentReviews.find((reviewItem) => reviewItem.event._id === ticketData.event._id)?.rating ?? 0}
                            onOpen={() => setReview(ticketData)}
                            onClick={() => setReview(ticketData)}
                        />
                    )) : <p className='text-sm text-text-light'>No past events yet.</p>}
                </div>
            </Section>

            <Section title='Saved Events' actionText='View All' onAction={() => router.push('/saved-events')}>
                <div className='border border-brown-normal rounded-xl mt-6 p-4 w-full grid grid-cols-1 xl:grid-cols-2 gap-4'>
                    {savedEvents.length ? savedEvents.map((item) => (
                        <SavedEventsCard
                            key={item.event._id}
                            title={item.event.title}
                            date={date(item.event.startDate)}
                            location={item.event.venue}
                            price={item.event.ticketTypes?.length ? Math.min(...item.event.ticketTypes.map((ticketType) => ticketType.price)) : 0}
                            eventId={item.event._id}
                            onRemove={() => toggleSaved(item.event._id)}
                        />
                    )) : <p className='text-sm text-text-light'>No saved events yet.</p>}
                </div>
            </Section>

            <Section title='Ticket History' actionText='View All' onAction={() => activeTickets[0] ? setTicket(activeTickets[0]) : router.push('/explore-events')}>
                <div className='border border-brown-normal rounded-xl mt-6 p-4 space-y-3'>
                    {data?.recentBookings.length ? data.recentBookings.map((booking) => (
                        <div key={booking._id} className='flex flex-col gap-2 rounded-xl border border-brown-light-active bg-brown-light p-4 md:flex-row md:items-center md:justify-between'>
                            <div>
                                <p className='font-semibold'>{booking.event.title}</p>
                                <p className='text-sm text-text-light'>Ticket {booking.ticketNumber} • {booking.ticketType}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='text-sm text-text-light'>{booking.purchaseDate ? date(booking.purchaseDate) : 'Recently'}</p>
                                <Button text='Open Ticket' variant='secondary' size='sm' onClick={() => setTicket(booking)} />
                            </div>
                        </div>
                    )) : <p className='text-sm text-text-light'>No ticket history yet.</p>}
                </div>
            </Section>

            <Section title='Active Tickets' actionText='View All' onAction={() => activeTickets[0] ? setTicket(activeTickets[0]) : router.push('/explore-events')}>
                <div className='border border-brown-normal rounded-xl mt-6 p-4 space-y-3'>
                    {activeTickets.length ? activeTickets.map((ticketData) => (
                        <div key={ticketData._id} className='flex flex-col gap-2 rounded-xl border border-brown-light-active bg-brown-light p-4 md:flex-row md:items-center md:justify-between'>
                            <div>
                                <p className='font-semibold'>{ticketData.event.title}</p>
                                <p className='text-sm text-text-light'>{ticketData.ticketType} • {ticketData.checkedIn ? 'Checked in' : 'Ready for check-in'}</p>
                            </div>
                            <Button text='View Ticket' variant='cta' size='sm' onClick={() => setTicket(ticketData)} />
                        </div>
                    )) : <p className='text-sm text-text-light'>No active tickets yet.</p>}
                </div>
            </Section>

            <Section title='Favorite Organizers' actionText='View All' onAction={() => router.push('/explore-events')}>
                <div className='border border-brown-normal rounded-xl mt-6 p-4 flex flex-wrap gap-3'>
                    {favoriteOrganizers.length ? favoriteOrganizers.map((item) => <div key={item} className='rounded-full border border-brown-normal px-4 py-2 text-sm font-semibold'>{item}</div>) : <p className='text-sm text-text-light'>No favorite organizers yet.</p>}
                </div>
            </Section>

            {ticket && <TicketPopup isOpen={!!ticket} onClose={() => setTicket(null)} ticket={ticket} onCancelled={load} />}
            {review && <ReviewPopup isOpen={!!review} onclose={() => setReview(null)} onSubmit={submitReview} />}
        </section>
    );
}