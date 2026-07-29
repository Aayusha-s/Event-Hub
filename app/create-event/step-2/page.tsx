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
    const router = useRouter();

    const handleNext = () => {
        if (!startDate || !endDate || !startTime || !endTime || !venueName || !streetAddress || !city || !state || !eventCapacity) {
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
        }

        saveDraft("eventDetails", EventDetails);

        router.push('/create-event/step-3');

    }


    return (
        <CreateEventStepShell
            stepLabel="Step 2 of 4"
            title="Event Details"
            description="Add the timing, venue, and capacity so guests know exactly where and when to join."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={() => router.push('/create-event/step-1')} />
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
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Street Address *</h2>
                    <input type="text" placeholder="e.g., 123 Main Street" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">City *</h2>
                    <input type="text" placeholder="e.g., New York" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">State *</h2>
                    <input type="text" placeholder="e.g., NY" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={state} onChange={(e) => setState(e.target.value)} />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Event Capacity *</h2>
                    <input type='number' min={1} placeholder="e.g., 500" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" required value={eventCapacity} onChange={(e) => setEventCapacity(e.target.value)} />
                </div>
            </div>
        </CreateEventStepShell>
    )
}

export default Page