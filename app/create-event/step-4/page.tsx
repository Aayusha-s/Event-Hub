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
};

type EventDetailsDraft = {
    startTime: string;
    endTime: string;
    venueName: string;
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

    const handlePublish = () => {

        alert('Event Published Successfully!');

        clearEventDraft();

        router.push('/event-details/[id]');

    }

    return (
        <CreateEventStepShell
            stepLabel="Step 4 of 4"
            title="Review and Publish"
            description="Check your event details before publishing. You can still go back and make changes if needed."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={() => router.push('/create-event/step-3')} />
                    <Button text="Publish Event" variant='cta' size='sm' onClick={handlePublish} />
                </div>
            )}
        >
            <div className='space-y-4'>
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