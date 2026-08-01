'use client';
import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { saveDraft } from '@/lib/createEventDraft';


const Page = () => {
    const [title, setTitle] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('BasicInformation') || 'null')?.title ?? '';
        } catch {
            return '';
        }
    });
    const [category, setCategory] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('BasicInformation') || 'null')?.category ?? '';
        } catch {
            return '';
        }
    });
    const [description, setDescription] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('BasicInformation') || 'null')?.description ?? '';
        } catch {
            return '';
        }
    });
    const router = useRouter();
	const searchParams = useSearchParams();
	useEffect(() => { const eventId = searchParams.get('eventId'); if (!eventId) return; fetch(`/api/events/${eventId}`).then(r => r.json()).then(r => { if (!r.success) return; const event = r.data; const start = new Date(event.startDate), end = new Date(event.endDate); saveDraft('basicInformation', { title: event.title, category: event.category, description: event.description, images: event.images ?? [], eventId }); saveDraft('eventDetails', { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), startTime: start.toISOString().slice(11, 16), endTime: end.toISOString().slice(11, 16), venueName: event.venue, streetAddress: '', city: '', state: '', eventCapacity: String(event.capacity) }); saveDraft('eventInfo', { tickets: event.ticketTypes.map((ticket: { name: string; quantity: number; price: number; description?: string }) => ({ ticketName: ticket.name, quantity: String(ticket.quantity), price: String(ticket.price), description: ticket.description ?? '' })) }); setTitle(event.title); setCategory(event.category); setDescription(event.description); }); }, [searchParams]);

    const handleNext = () => {
        if (!title || !category || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const BasicInformation = {
            title,
            category,
            description,
        }

        saveDraft("basicInformation", BasicInformation);

		router.push(`/create-event/step-2${searchParams.get('eventId') ? `?eventId=${searchParams.get('eventId')}` : ''}`);

    }
    return (
        <CreateEventStepShell
            stepLabel="Step 1 of 4"
            title="Basic Information"
            description="Start with the core details that describe your event and help people find it."
            footer={<div className='flex justify-end'><Button text="Next Step" variant='cta' size='sm' onClick={handleNext} /></div>}
        >
            <div>
                <h2 className="mb-2 text-sm font-medium text-text-dark">Event Title *</h2>
                <input
                    type="text"
                    placeholder="e.g., Summer Music Festival 2025"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                    required
                />
            </div>

            <div>
                <h2 className="mb-2 text-sm font-medium text-text-dark">Category *</h2>
                <select
                    name="category"
                    id="category"
                    className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>Select an option</option>
                    <option value="music">Music</option>
                    <option value="art_theater">Art & Theater</option>
                    <option value="food_drinks">Food & Drinks</option>
                    <option value="sports_fitness">Sports & Fitness</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="festival">Festival</option>
                    <option value="creative">Creative</option>
                    <option value="business">Business</option>
                    <option value="book_literature">Book & Literature</option>
                    <option value="comedy">Comedy</option>
                    <option value="social">Social</option>
                    <option value="community">Community</option>
                    <option value="learning_education">Learning and Education</option>
                    <option value="wellness_health">Wellness and Health</option>
                    <option value="gaming_esports">Gaming and Esports</option>
                    <option value="family_kids">Family and Kids</option>
                </select>
            </div>

            <div>
                <h3 className='mb-2 text-sm font-medium text-text-dark'>Description *</h3>
                <textarea
                    placeholder='Tell attendees what makes your event special...'
                    className='h-32 w-full resize-none rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-text-dark">
                    Event Images
                </label>
                <label
                    htmlFor="eventImages"
                    className="block cursor-pointer rounded-2xl border border-dashed border-border bg-surface-hover p-6 text-center transition-colors hover:border-primary hover:bg-primary-light"
                >
                    <Upload className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="mb-1 text-sm text-text-dark">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-text-light">
                        PDF, JPG, JPEG, or PNG (Max 10MB)
                    </p>
                </label>
                <input
                    id="eventImages"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                />
            </div>
        </CreateEventStepShell>
    )
}

export default Page
