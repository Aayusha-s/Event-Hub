'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Store } from 'lucide-react';
import Button from '@/components/Button';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { saveStallDraft } from '@/lib/createStallDraft';

type Event = {
    _id: string;
    title: string;
    venue: string;
    startDate: string;
    stallApplicationDeadline: string;
    stallCapacity: number;
    stallCategories: string[];
};

const Page = () => {
    const router = useRouter();
    const preselectedEventId = typeof window === 'undefined' ? '' : new URLSearchParams(window.location.search).get('eventId') || '';

    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEventId, setSelectedEventId] = useState(() => {
        if (typeof window === 'undefined') return preselectedEventId;
        try {
            return JSON.parse(window.localStorage.getItem('StallEvent') || 'null')?.eventId ?? preselectedEventId;
        } catch {
            return preselectedEventId;
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        fetch('/api/vendors/opportunities', { cache: 'no-store' })
            .then(async (r) => {
                const j = await r.json();
                if (!r.ok || !j.success) throw new Error(j.error?.message || 'Unable to load events.');
                if (active) setEvents(j.data ?? []);
            })
            .catch((e) => active && setError(e instanceof Error ? e.message : 'Unable to load events.'))
            .finally(() => active && setLoading(false));
        return () => { active = false; };
    }, []);

    const selectedEvent = events.find((e) => e._id === selectedEventId);

    const handleNext = () => {
        if (!selectedEvent) {
            alert('Please select an event.');
            return;
        }
        saveStallDraft('stallEvent', {
            eventId: selectedEvent._id,
            eventTitle: selectedEvent.title,
            eventVenue: selectedEvent.venue,
            eventStartDate: selectedEvent.startDate,
            stallApplicationDeadline: selectedEvent.stallApplicationDeadline,
            stallCapacity: selectedEvent.stallCapacity,
            stallCategories: selectedEvent.stallCategories,
        });
        router.push('/vendor/stalls/create/step-2');
    };

    return (
        <CreateEventStepShell
            stepLabel="Step 1 of 3"
            title="Select Event"
            description="Choose a published event with an active vendor stall opening."
            footer={(
                <div className="flex items-center justify-between gap-3">
                    <Button text="Cancel" variant="secondary" size="sm" onClick={() => router.push('/vendor/stalls')} />
                    <Button text="Next Step" variant="cta" size="sm" onClick={handleNext} />
                </div>
            )}
        >
            {error && <p className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {loading ? (
                <p className="text-sm text-text-light">Loading available events…</p>
            ) : (
                <div className="space-y-5">
                    <div>
                        <h2 className="mb-2 text-sm font-medium text-text-dark">Available Events *</h2>
                        <select
                            className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                            required
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                        >
                            <option value="" disabled>Select an event</option>
                            {events.map((event) => (
                                <option key={event._id} value={event._id}>{event.title}</option>
                            ))}
                        </select>
                        {events.length === 0 && !error && (
                            <p className="mt-2 text-sm text-text-light">No stall openings are currently available.</p>
                        )}
                    </div>

                    {selectedEvent && (
                        <div className="surface-card p-4">
                            <div className="flex items-center gap-3">
                                <Store className="text-primary" size={23} />
                                <div>
                                    <h3 className="font-semibold text-text-dark">{selectedEvent.title}</h3>
                                    <p className="text-sm text-text-light">{selectedEvent.venue}</p>
                                </div>
                            </div>
                            <div className="mt-4 grid gap-3 text-sm text-text-light sm:grid-cols-2">
                                <p><Calendar className="mr-1 inline" size={15} />{new Date(selectedEvent.startDate).toLocaleString()}</p>
                                <p><MapPin className="mr-1 inline" size={15} />{selectedEvent.venue}</p>
                                <p>Apply by: {new Date(selectedEvent.stallApplicationDeadline).toLocaleDateString()}</p>
                                <p>Available stalls: {selectedEvent.stallCapacity}</p>
                            </div>
                            {selectedEvent.stallCategories.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm text-text-light">Categories: {selectedEvent.stallCategories.join(', ')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </CreateEventStepShell>
    );
};

export default Page;
