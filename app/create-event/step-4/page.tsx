'use client';
import Button from '@/components/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { clearEventDraft, loadDraft } from '@/lib/createEventDraft';

type TicketDraft = {
    ticketName: string;
    quantity: string;
    price: string;
    description: string;
};

type BasicInformationDraft = {
    title: string;
    category: string;
    description: string;
    images?: string[];
};

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
};

type EventInfoDraft = {
    tickets?: TicketDraft[];
};

const Page = () => {
    const [basicInformation] = useState<BasicInformationDraft | null>(() => loadDraft<BasicInformationDraft>("basicInformation"));
    const [eventDetails] = useState<EventDetailsDraft | null>(() => loadDraft<EventDetailsDraft>("eventDetails"));
    const [eventInfo] = useState<EventInfoDraft | null>(() => loadDraft<EventInfoDraft>("eventInfo"));
    const router = useRouter();
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishError, setPublishError] = useState('');

    const handlePublish = async () => {
        if (!basicInformation || !eventDetails || !eventInfo?.tickets?.length) {
            setPublishError('Your event draft is incomplete. Please return to the previous steps and complete every required field.');
            return;
        }

        setIsPublishing(true);
        setPublishError('');

        try {
            const startDate = new Date(`${eventDetails.startDate}T${eventDetails.startTime}`);
            const endDate = new Date(`${eventDetails.endDate}T${eventDetails.endTime}`);
            const capacity = Number(eventDetails.eventCapacity);

            if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || !Number.isInteger(capacity) || capacity < 1) {
                throw new Error('Your date, time, or capacity is invalid. Please review Step 2.');
            }

            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: basicInformation.title,
                    description: basicInformation.description,
                    category: basicInformation.category,
                    venue: [eventDetails.venueName, eventDetails.streetAddress, eventDetails.city, eventDetails.state].filter(Boolean).join(', '),
                    // The current form has no map/geocoding input. Store a valid neutral coordinate until location coordinates are captured by that UI.
                    latitude: 0,
                    longitude: 0,
                    images: basicInformation.images ?? [],
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                    capacity,
                    status: 'published',
                    tags: [basicInformation.category],
                    ticketTypes: eventInfo.tickets.map((ticket) => ({
                        name: ticket.ticketName,
                        quantity: Number(ticket.quantity),
                        price: Number(ticket.price),
                        description: ticket.description,
                    })),
                }),
            });

            const result: { success?: boolean; data?: { _id?: string }; error?: { message?: string } } =
                response.headers.get('content-type')?.includes('application/json') ? await response.json() : {};

            if (!response.ok || !result.success || !result.data?._id) {
                throw new Error(result.error?.message || 'Unable to publish this event. Please try again.');
            }

            clearEventDraft();
            router.push(`/event-details/${result.data._id}`);
        } catch (error) {
            setPublishError(error instanceof Error ? error.message : 'Unable to publish this event. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <CreateEventStepShell
            stepLabel="Step 4 of 4"
            title="Review and Publish"
            description="Check your event details before publishing. You can still go back and make changes if needed."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={() => router.push('/create-event/step-3')} disabled={isPublishing} />
                    <Button text={isPublishing ? "Publishing..." : "Publish Event"} variant='cta' size='sm' onClick={handlePublish} disabled={isPublishing} />
                </div>
            )}
        >
            <div className='space-y-4'>
                {publishError && <p className='rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700'>{publishError}</p>}
                <div className='surface-card p-4'>
                    <h3 className='mb-3 text-sm font-semibold text-text-dark'>Event Information</h3>
                    <div className='space-y-2 text-sm text-text-light'>
                        <p><strong className="text-text-dark">Title:</strong> {basicInformation?.title || ''}</p>
                        <p><strong className="text-text-dark">Category:</strong> {basicInformation?.category || ''}</p>
                        <p><strong className="text-text-dark">Description:</strong> {basicInformation?.description || ''}</p>
                    </div>
                </div>

                <div className='surface-card p-4'>
                    <h3 className='mb-3 text-sm font-semibold text-text-dark'>Date and Location</h3>
                    <div className='space-y-2 text-sm text-text-light'>
                        <p><strong className="text-text-dark">Start Time:</strong> {eventDetails?.startTime || ''}</p>
                        <p><strong className="text-text-dark">End Time:</strong> {eventDetails?.endTime || ''}</p>
                        <p><strong className="text-text-dark">Venue:</strong> {eventDetails?.venueName || ''}</p>
                        <p><strong className="text-text-dark">Capacity:</strong> {eventDetails?.eventCapacity || ''}</p>
                    </div>
                </div>

                <div className='surface-card p-4'>
                    <h3 className='mb-3 text-sm font-semibold text-text-dark'>Tickets</h3>
                    <div className='space-y-3 text-sm text-text-light'>
                        {eventInfo?.tickets?.length ? (
                            eventInfo.tickets.map((ticket, index) => (
                                <div key={index} className='rounded-xl border border-border bg-surface-hover p-3'>
                                    <p><strong className="text-text-dark">{ticket.ticketName}</strong></p>
                                    <p>Quantity: {ticket.quantity || ''}</p>
                                    <p>Price: {ticket.price || ''}</p>
                                </div>
                            ))
                        ) : (
                            <p>No tickets added yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </CreateEventStepShell>
    )
}

export default Page
