"use client";

import Button from '@/components/Button';
import EventCard from '@/components/EventCard';
import Map from '@/components/Map';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import EventSocial from '@/components/EventSocial';
import EventStalls from '@/components/EventStalls';

type TicketType = { name: string; price: number; quantity: number; description?: string };
type EventData = {
    _id: string; title: string; description: string; venue: string; latitude: number; longitude: number;
    category: string; images: string[]; startDate: string; endDate: string; ticketTypes: TicketType[];
    capacity: number; status: string; tags: string[]; ticketsSold?: number;
    organizer?: { _id: string; name?: string; profileImage?: string };
};

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(value));
const formatTime = (value: string) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
const fallbackImage = '/images/party.png';

const Page = () => {
    const { id } = useParams<{ id: string }>();
    const { data: session } = useSession();
    const [event, setEvent] = useState<EventData | null>(null);
    const [similarEvents, setSimilarEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!id) return;
        let active = true;

        const loadEvent = async () => {
            try {
                const response = await fetch(`/api/events/${id}`);
                if (response.status === 404) {
                    if (active) setNotFound(true);
                    return;
                }
                const result = await response.json();
                if (!response.ok || !result.success) throw new Error('Unable to load event.');
                if (!active) return;
                setEvent(result.data);

                const similarResponse = await fetch(`/api/events?category=${encodeURIComponent(result.data.category)}&status=published&pageSize=12`);
                const similarResult = await similarResponse.json();
                if (similarResponse.ok && similarResult.success && active) {
                    setSimilarEvents((similarResult.data.items as EventData[]).filter((item) => item._id !== result.data._id).slice(0, 4));
                }
            } catch {
                if (active) setNotFound(true);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadEvent();
        return () => { active = false; };
    }, [id]);
    useEffect(() => { if (!id) return; fetch('/api/saved-events').then(response => response.json()).then(result => { if (result.success) setSaved(result.data.items.some((item: { event: { _id: string } }) => item.event._id === id)); }).catch(() => undefined); }, [id]);
    const toggleSaved = async () => { if (!event) return; const response = await fetch('/api/saved-events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventId: event._id }) }); const result = await response.json(); if (result.success) setSaved(result.data.saved); };

    const details = useMemo(() => {
        if (!event) return [];
        const organizerName = event.organizer?.name ?? 'Event organizer';
        return [
            { icon: 'fa-solid fa-calendar', title: 'Date', text: formatDate(event.startDate) },
            { icon: 'fa-solid fa-clock', title: 'Time', text: `${formatTime(event.startDate)} - ${formatTime(event.endDate)}` },
            { icon: 'fa-solid fa-location-dot', title: 'Location', text: event.venue },
            { icon: 'fa-solid fa-user', title: 'Organizer', text: organizerName },
            { icon: 'fa-solid fa-ticket', title: 'Price', text: event.ticketTypes.some((ticket) => ticket.price === 0) ? 'Free tickets available' : `From Rs. ${Math.min(...event.ticketTypes.map((ticket) => ticket.price)).toLocaleString()}` },
            { icon: 'fa-solid fa-users', title: 'Seats', text: `${Math.max(0, event.capacity - (event.ticketsSold ?? 0)).toLocaleString()} remaining of ${event.capacity.toLocaleString()}` },
        ];
    }, [event]);

    if (loading) return <section className='my-10 px-4 font-cause text-text-dark'>Loading event…</section>;
    if (notFound || !event) return <section className='my-10 px-4 font-cause text-text-dark'><h1 className='font-dynapuff text-3xl font-bold'>Event not found</h1><p className='mt-3'>This event may have been removed or the link is invalid.</p></section>;

    const organizerName = event.organizer?.name ?? 'Event organizer';
    const organizerHref = `/userprofile?userId=${event.organizer?._id ?? ''}`;
    const coverImage = event.images[0] ?? fallbackImage;
    const mapQuery = event.latitude !== 0 || event.longitude !== 0 ? `${event.latitude},${event.longitude}` : event.venue;
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
    const galleryImages = event.images.length ? event.images : [fallbackImage];
    const role = session?.user?.role;
    const ownsEvent = role === 'organizer' && event.organizer?._id === session?.user?.id;

    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark md:my-3 md:mx-3 md:px-3 lg:my-4 lg:mx-4 lg:px-4 xl:my-6 xl:mx-6 xl:px-6 2xl:my-8 2xl:mx-8 2xl:px-8'>
            <div className='flex flex-col gap-8 lg:flex-row lg:gap-12'>
                <div className='hidden lg:block relative w-full lg:w-2/5 xl:w-2/5'>
                    <div className='absolute inset-0 bg-brown-normal rotate-3 rounded-xl'></div>
                    <img src={coverImage} alt={event.title} className='absolute inset-0 w-full h-full object-cover rounded-xl' />
                </div>
                <div className='flex flex-col gap-4 lg:w-3/5'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mt-2 lg:mt-5 font-dynapuff'>{event.title}</h1>
                    <div className='flex flex-row gap-3 items-center'><i className="fa-solid fa-star text-yellow-500 text-lg md:text-xl"></i><p className='text-base md:text-lg'>{`${event.ticketsSold ?? 0} attendees • ${event.status}`}</p></div>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='border-2 border-brown-normal rounded-full p-2 md:p-3 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 overflow-hidden'>
                            <Link href={organizerHref}>{event.organizer?.profileImage ? <img src={event.organizer.profileImage} alt={organizerName} className='w-full h-full object-cover rounded-full' /> : <i className="fa-solid fa-user text-xl md:text-2xl"></i>}</Link>
                        </div>
                        <p className='ml-2 text-base md:text-lg'>Hosted by <Link href={organizerHref}><span className='font-semibold font-dynapuff hover:text-brown-dark'>{organizerName}</span></Link></p>
                    </div>
                    <p className='text-sm capitalize text-text-dark/80'>Category: {event.category.replaceAll('_', ' ')} • Event type: {event.status}</p>
                    <div className='mt-4 flex gap-3'>{role === 'attendee' && <Link href={`/booknow?eventId=${event._id}`}><Button text="Book Now" iconRight={<i className="fa-solid fa-arrow-right"></i>} variant="cta" size="lg" /></Link>}{role === 'vendor' && <Link href={`/vendor/stalls/create/step-1?eventId=${event._id}`}><Button text="Create Stall" variant="cta" size="lg" /></Link>}{ownsEvent && <Link href={`/create-event/step-1?eventId=${event._id}`}><Button text="Manage Event" variant="cta" size="lg" /></Link>}<Button text={saved ? 'Saved' : 'Save Event'} variant='secondary' size='lg' onClick={toggleSaved}/></div>
                </div>
            </div>
            <div className='flex flex-col gap-8 mt-8 lg:flex-row lg:gap-12'>
                <div className='lg:w-1/3'>
                    <div className='w-full border-2 border-brown-normal rounded-xl p-4 md:p-6'><h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-4 md:mb-6'>Event Details</h2><div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 '>{details.map((item) => <div key={item.title} className="flex items-start gap-3 md:gap-4"><div className="border-2 border-brown-normal rounded-xl bg-brown-light p-3 flex items-center justify-center shrink-0"><i className={`${item.icon} text-xl md:text-2xl`}></i></div><div className="min-w-0"><h4 className="font-semibold text-base md:text-lg">{item.title}</h4><p className="text-sm md:text-base text-text-dark/80">{item.text}</p></div></div>)}</div></div>
                    <div className='mt-6 md:mt-8'><Map mapId={1} mapUrl={mapUrl} /></div>
                    <div className='mt-6 md:mt-8'><h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 md:mb-4'>Tags</h2><div className='flex flex-wrap gap-2'>{event.tags.map((tag) => <Link href={`/event-tags?tag=${encodeURIComponent(tag)}`} key={tag}><Button text={tag} variant='tag' size='sm' /></Link>)}</div></div>
                </div>
                <div className='w-full lg:w-2/3 border-2 border-brown-normal rounded-xl p-4 md:p-6 mt-5 lg:mt-0'><h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-4 md:mb-6'>Event Description</h2><div className='space-y-4'><p className='leading-relaxed text-base md:text-lg whitespace-pre-wrap'>{event.description}</p><p className='leading-relaxed text-base md:text-lg font-semibold'>Ticket Types</p><ul className='list-disc list-inside space-y-2 text-base md:text-lg'>{event.ticketTypes.map((ticket) => <li key={ticket.name}>{ticket.name} — {ticket.price === 0 ? 'Free' : `Rs. ${ticket.price.toLocaleString()}`} ({ticket.quantity} available){ticket.description ? `: ${ticket.description}` : ''}</li>)}</ul></div></div>
            </div>
            <div className='mt-8 md:mt-12'><div className='flex flex-row sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6'><h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 sm:mb-0'>Photos</h2><Button text={showAllPhotos ? 'Show Less' : 'View All'} variant='cta' size='sm' iconRight={<i className="fa-solid fa-arrow-right"></i>} onClick={() => setShowAllPhotos((visible) => !visible)} /></div><div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>{galleryImages.slice(0, showAllPhotos ? galleryImages.length : 5).map((image, index) => <div key={`${image}-${index}`} className='relative w-full h-48 md:h-56 lg:h-48 xl:h-56 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer'><div className={`absolute inset-0 rotate-3 rounded-xl ${index % 5 === 0 ? 'bg-red-200' : index % 5 === 1 ? 'bg-green-200' : index % 5 === 2 ? 'bg-blue-200' : index % 5 === 3 ? 'bg-yellow-200' : 'bg-purple-200'}`} /><img src={image} alt={`${event.title} ${index + 1}`} className='absolute inset-0 w-full h-full object-cover rounded-xl' /></div>)}</div></div>
            <div className='mt-10 md:mt-16'><div className='flex flex-row sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6'><h2 className='font-dynapuff font-bold text-xl md:text-xl lg:text-xl mb-3 sm:mb-0'>Similar Events</h2><Link href={`/explore-events?category=${encodeURIComponent(event.category)}`}><Button text='View More' variant='cta' size='sm' iconRight={<i className="fa-solid fa-arrow-right"></i>} /></Link></div><div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>{similarEvents.map((similar) => <EventCard key={similar._id} eventId={similar._id} tags={similar.tags} imageUrl={similar.images[0] ?? fallbackImage} imageAlt={similar.title} title={similar.title} organizer={`By ${similar.organizer?.name ?? 'Event organizer'}`} descriptions={[similar.description]} location={similar.venue} price={similar.ticketTypes.some((ticket) => ticket.price === 0) ? 'Free' : `From Rs.${Math.min(...similar.ticketTypes.map((ticket) => ticket.price))}`} />)}</div></div>
            <EventStalls eventId={event._id} />
            <EventSocial eventId={event._id} />
        </section>
    );
};

export default Page;
