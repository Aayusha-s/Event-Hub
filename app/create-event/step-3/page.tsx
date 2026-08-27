'use client';
import React from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { CircleX, Plus } from 'lucide-react';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { useCreateEventTickets } from '@/components/CreateEventDraftProvider';
import { createEmptyTicket, saveEventInfoTickets } from '@/lib/createEventDraft';

const Page = () => {
    const router = useRouter();
	const eventId = () => typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('eventId');
    const { tickets, setTickets } = useCreateEventTickets();

    const updateTicket = (index: number, field: string, value: string) => {
        setTickets((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddTicket = () => {
        setTickets((prev) => [...prev, createEmptyTicket()]);
    };

    const handleRemoveTicket = (index: number) => {
        setTickets((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
    };

    const handleNext = () => {
        for (let i = 0; i < tickets.length; i++) {
            const t = tickets[i];
            if (!t.ticketName || !t.quantity || !t.price || !t.description) {
                alert(`Please fill in all required fields for Ticket ${i + 1}.`);
                return;
            }
        }

        saveEventInfoTickets(tickets);
        router.push(`/create-event/step-4${eventId() ? `?eventId=${eventId()}` : ''}`);
    };

    const handlePrevious = () => {
        saveEventInfoTickets(tickets);
        router.push(`/create-event/step-2${eventId() ? `?eventId=${eventId()}` : ''}`);
    };

    return (
        <CreateEventStepShell
            stepLabel="Step 3 of 4"
            title="Ticket & Pricing"
            description="Create one or more ticket tiers with clear pricing and availability."
            footer={(
                <div className='flex items-center justify-between gap-3'>
                    <Button text="Previous Step" variant='secondary' size='sm' onClick={handlePrevious} />
                    <Button text="Next Step" variant='cta' size='sm' onClick={handleNext} />
                </div>
            )}
        >
            <div className='flex justify-end'>
                <Button text='Add Ticket Type' size='sm' variant='cta' iconLeft={<Plus />} onClick={handleAddTicket} />
            </div>

            <div className='space-y-4'>
                {tickets.map((ticket, index) => (
                    <div key={index} className='surface-card p-4'>
                        <div className='mb-4 flex items-center justify-between'>
                            <span className='text-sm font-semibold text-text-dark'>Ticket {index + 1}</span>
                            {tickets.length > 1 && (
                                <CircleX className='cursor-pointer text-text-light transition-colors hover:text-primary' onClick={() => handleRemoveTicket(index)} />
                            )}
                        </div>

                        <div className='grid grid-cols-1 gap-4'>
                            <div>
                                <label className='mb-1 block text-sm font-medium text-text-dark'>Ticket Name *</label>
                                <select className='w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring' required value={ticket.ticketName} onChange={(e) => updateTicket(index, 'ticketName', e.target.value)}>
                                    <option value="" disabled>Select an option</option>
                                    <option value="General Admission">General Admission</option>
                                    <option value="VIP">VIP</option>
                                    <option value="Early Bird">Early Bird</option>
                                </select>
                            </div>
                            <div>
                                <label className='mb-1 block text-sm font-medium text-text-dark'>Available Quantity *</label>
                                <input className='w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring' type='number' placeholder='e.g. 100' required value={ticket.quantity} onChange={(e) => updateTicket(index, 'quantity', e.target.value)} />
                            </div>
                            <div>
                                <label className='mb-1 block text-sm font-medium text-text-dark'>Price *</label>
                                <input className='w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring' type='number' placeholder='e.g. 50.00' required value={ticket.price} onChange={(e) => updateTicket(index, 'price', e.target.value)} />
                            </div>
                            <div>
                                <label className='mb-1 block text-sm font-medium text-text-dark'>Description *</label>
                                <textarea className='w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring' rows={4} placeholder="What's included in this ticket" required value={ticket.description} onChange={(e) => updateTicket(index, 'description', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </CreateEventStepShell>
    );
};

export default Page;
