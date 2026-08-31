'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import LocationPicker from '@/components/LocationPicker';
import { useRouter } from 'next/navigation';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { loadDraft, saveDraft } from '@/lib/createEventDraft';
import { geocodeVenue } from '@/lib/geocoding';

type EventDetailsDraft = {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    venueName: string;
    streetAddress: string;
    city: string;
    state: string;
    eventCapacity: string;
    latitude?: number;
    longitude?: number;
    allowVendorStalls?: boolean;
    stallOpeningDate?: string;
    stallApplicationDeadline?: string;
    stallCapacity?: string;
    stallCategories?: string;
};

const Page = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [venueName, setVenueName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [eventCapacity, setEventCapacity] = useState('');
    const [latitude, setLatitude] = useState<number | undefined>(undefined);
    const [longitude, setLongitude] = useState<number | undefined>(undefined);
    const [allowVendorStalls, setAllowVendorStalls] = useState(false);
    const [stallOpeningDate, setStallOpeningDate] = useState('');
    const [stallApplicationDeadline, setStallApplicationDeadline] = useState('');
    const [stallCapacity, setStallCapacity] = useState('');
    const [stallCategories, setStallCategories] = useState('');
    const router = useRouter();
	const eventId = () => typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('eventId');

    useEffect(() => {
        const draft = loadDraft<EventDetailsDraft>('eventDetails');
        if (!draft) return;

        setStartDate(draft.startDate ?? '');
        setEndDate(draft.endDate ?? '');
        setStartTime(draft.startTime ?? '');
        setEndTime(draft.endTime ?? '');
        setVenueName(draft.venueName ?? '');
        setStreetAddress(draft.streetAddress ?? '');
        setCity(draft.city ?? '');
        setState(draft.state ?? '');
        setEventCapacity(draft.eventCapacity ?? '');
        setLatitude(draft.latitude);
        setLongitude(draft.longitude);
        setAllowVendorStalls(draft.allowVendorStalls === true);
        setStallOpeningDate(draft.stallOpeningDate ?? '');
        setStallApplicationDeadline(draft.stallApplicationDeadline ?? '');
        setStallCapacity(draft.stallCapacity ?? '');
        setStallCategories(draft.stallCategories ?? '');
    }, []);

    // Auto-geocode venue name when it changes
    useEffect(() => {
        if (!venueName.trim() || latitude !== undefined && longitude !== undefined) {
            return; // Don't auto-geocode if already has coordinates or empty
        }

        const timeoutId = setTimeout(async () => {
            try {
                const result = await geocodeVenue(venueName);
                if (result) {
                    setLatitude(result.latitude);
                    setLongitude(result.longitude);
                }
            } catch (error) {
                console.error('Auto-geocoding failed:', error);
            }
        }, 500); // Debounce by 500ms

        return () => clearTimeout(timeoutId);
    }, [venueName]);

    const buildEventDetails = (): EventDetailsDraft => ({
        startDate,
        endDate,
        startTime,
        endTime,
        venueName,
        streetAddress,
        city,
        state,
        eventCapacity,
        latitude,
        longitude,
        allowVendorStalls,
        stallOpeningDate,
        stallApplicationDeadline,
        stallCapacity,
        stallCategories,
    });

    const handleNext = () => {
        if (!startDate || !endDate || !startTime || !endTime || !venueName || !eventCapacity || (allowVendorStalls && (!stallOpeningDate || !stallApplicationDeadline || !stallCapacity))) {
            alert('Please fill in all required fields.');
            return;
        }

        saveDraft("eventDetails", buildEventDetails());
		router.push(`/create-event/step-3${eventId() ? `?eventId=${eventId()}` : ''}`);
    };

    const handlePrevious = () => {
        saveDraft("eventDetails", buildEventDetails());
        router.push(`/create-event/step-1${eventId() ? `?eventId=${eventId()}` : ''}`);
    };


    return (
        <CreateEventStepShell
            stepLabel="Step 2 of 4"
            title="Event Details"
            description="Add the timing, venue, and capacity so guests know exactly where and when to join."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={handlePrevious} />
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
                    <h2 className="mb-2 text-sm font-medium text-text-dark">City</h2>
                    <input type="text" placeholder="e.g., New York" className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring" value={city} onChange={(e) => setCity(e.target.value)} />
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

            <LocationPicker 
                onLocationSelect={(location) => {
                    setVenueName(location.venueName);
                    setLatitude(location.latitude);
                    setLongitude(location.longitude);
                }}
                initialVenue={venueName}
                initialLat={latitude}
                initialLon={longitude}
            />
            <div className="rounded-xl border border-border bg-surface-hover p-4">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-semibold text-text-dark">Allow Vendor Stalls?</h2><p className="text-sm text-text-light">Approved vendors can apply only after this event is approved.</p></div><div className="flex gap-2"><Button type="button" text="Yes" size="sm" variant={allowVendorStalls ? "cta" : "secondary"} onClick={() => setAllowVendorStalls(true)} /><Button type="button" text="No" size="sm" variant={!allowVendorStalls ? "cta" : "secondary"} onClick={() => setAllowVendorStalls(false)} /></div></div>
                {allowVendorStalls && <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><label className="text-sm font-medium">Opening date<input type="date" className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallOpeningDate} onChange={(e) => setStallOpeningDate(e.target.value)} required /></label><label className="text-sm font-medium">Application deadline<input type="date" className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallApplicationDeadline} onChange={(e) => setStallApplicationDeadline(e.target.value)} required /></label><label className="text-sm font-medium">Stall capacity<input type="number" min={1} className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" value={stallCapacity} onChange={(e) => setStallCapacity(e.target.value)} required /></label><label className="text-sm font-medium">Categories (optional)<input className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-3 focus-ring" placeholder="Food, Retail" value={stallCategories} onChange={(e) => setStallCategories(e.target.value)} /></label></div>}
            </div>
        </CreateEventStepShell>
    )
}

export default Page
