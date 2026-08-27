'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { saveDraft } from '@/lib/createEventDraft';

const Page = () => {
    
    const [startDate, setStartDate] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.startDate ?? ''; } catch { return ''; }
    });
    const [endDate, setEndDate] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.endDate ?? ''; } catch { return ''; }
    });
    const [startTime, setStartTime] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.startTime ?? ''; } catch { return ''; }
    });
    const [endTime, setEndTime] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.endTime ?? ''; } catch { return ''; }
    });
    const [venueName, setVenueName] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.venueName ?? ''; } catch { return ''; }
    });
    const [streetAddress, setStreetAddress] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.streetAddress ?? ''; } catch { return ''; }
    });
    const [city, setCity] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.city ?? ''; } catch { return ''; }
    });
    const [state, setState] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.state ?? ''; } catch { return ''; }
    });
    const [eventCapacity, setEventCapacity] = useState(() => {
        if (typeof window === 'undefined') return '';
        try { return JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.eventCapacity ?? ''; } catch { return ''; }
    });
    const [allowVendorStalls, setAllowVendorStalls] = useState(() => typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.allowVendorStalls === true);
    const [stallOpeningDate, setStallOpeningDate] = useState(() => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.stallOpeningDate ?? '' : '');
    const [stallApplicationDeadline, setStallApplicationDeadline] = useState(() => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.stallApplicationDeadline ?? '' : '');
    const [stallCapacity, setStallCapacity] = useState(() => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.stallCapacity ?? '' : '');
    const [stallCategories, setStallCategories] = useState(() => typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('EventDetails') || 'null')?.stallCategories ?? '' : '');
    const router = useRouter();
	const eventId = () => typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('eventId');

    const handleNext = () => {
        if (!startDate || !endDate || !startTime || !endTime || !venueName || !streetAddress || !city || !state || !eventCapacity || (allowVendorStalls && (!stallOpeningDate || !stallApplicationDeadline || !stallCapacity))) {
            alert('Please fill in all required fields.');
            return;
        }
        const EventDetails = {
            startDate,
            endDate,
            startTime,
            endTime,
            venueName,
            streetAddress,
            city,
            state,
            eventCapacity,
            allowVendorStalls,
            stallOpeningDate,
            stallApplicationDeadline,
            stallCapacity,
            stallCategories,
        }

        saveDraft("eventDetails", EventDetails);

		router.push(`/create-event/step-3${eventId() ? `?eventId=${eventId()}` : ''}`);

    }


    return (
        <CreateEventStepShell
            stepLabel="Step 2 of 4"
            title="Event Details"
            description="Add the timing, venue, and capacity so guests know exactly where and when to join."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={() => router.push(`/create-event/step-1${eventId() ? `?eventId=${eventId()}` : ''}`)} />
                    <Button text="Next Step" variant='cta' size='sm' onClick={handleNext} />
                </div>
            )}
        >
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Start Date *</h2>
                    <input type="date" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">End Date *</h2>
                    <input type="date" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Start Time *</h2>
                    <input type="time" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">End Time *</h2>
                    <input type="time" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Venue Name *</h2>
                    <input type="text" placeholder="e.g., Central Park" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={venueName} onChange={(e) => setVenueName(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Street Address </h2>
                    <input type="text" placeholder="e.g., 123 Main Street" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"  value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">City *</h2>
                    <input type="text" placeholder="e.g., New York" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">State </h2>
                    <input type="text" placeholder="e.g., NY" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Event Capacity *</h2>
                    <input type='number' min={1} placeholder="e.g., 500" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={eventCapacity} onChange={(e) => setEventCapacity(e.target.value)} />
                </div>
            </div>
            <div className="rounded-xl border border-border bg-surface-hover p-4">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold text-text-dark">Allow Vendor Stalls?</h2><p className="text-sm text-text-light">Approved vendors can apply only after this event is approved.</p></div><div className="flex gap-2"><Button type="button" text="Yes" size="sm" variant={allowVendorStalls ? "cta" : "secondary"} onClick={() => setAllowVendorStalls(true)} /><Button type="button" text="No" size="sm" variant={!allowVendorStalls ? "cta" : "secondary"} onClick={() => setAllowVendorStalls(false)} /></div></div>
                {allowVendorStalls && <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-medium">Opening date<input type="date" className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallOpeningDate} onChange={(e) => setStallOpeningDate(e.target.value)} required /></label><label className="text-sm font-medium">Application deadline<input type="date" className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallApplicationDeadline} onChange={(e) => setStallApplicationDeadline(e.target.value)} required /></label><label className="text-sm font-medium">Stall capacity<input type="number" min={1} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallCapacity} onChange={(e) => setStallCapacity(e.target.value)} required /></label><label className="text-sm font-medium">Categories (optional)<input className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" placeholder="Food, Retail" value={stallCategories} onChange={(e) => setStallCategories(e.target.value)} /></label></div>}
            </div>
        </CreateEventStepShell>
    )
}

export default Page
