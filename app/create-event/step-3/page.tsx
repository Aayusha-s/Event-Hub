'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { CircleX, Plus } from 'lucide-react';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { useCreateEventTickets } from '@/components/CreateEventDraftProvider';
import { createEmptyTicket, loadDraft, saveEventInfoTickets } from '@/lib/createEventDraft';

const Page = () => {
    const router = useRouter();
	const eventId = () => typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('eventId');
    const { tickets, setTickets } = useCreateEventTickets();
    const [isFreeEvent, setIsFreeEvent] = useState<boolean>(() => {
        const draft = loadDraft<{ isFreeEvent?: boolean }>("eventInfo");
        return Boolean(draft?.isFreeEvent);
    });

    useEffect(() => {
        const draft = loadDraft<{ isFreeEvent?: boolean }>("eventInfo");
        if (draft?.isFreeEvent !== undefined) {
            setIsFreeEvent(Boolean(draft.isFreeEvent));
        }
    }, []);

    const updateTicket = (index: number, field: string, value: string) => {
        setTickets((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddTicket = () => {
        setTickets((prev) => [...prev, createEmptyTicket(isFreeEvent)]);
    };

    const handleRemoveTicket = (index: number) => {
        setTickets((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
    };

    const handleFreeToggle = (nextValue: boolean) => {
        setIsFreeEvent(nextValue);
        setTickets((prev) => prev.map((ticket) => ({ ...ticket, price: nextValue ? '0' : '' })));
        saveEventInfoTickets(tickets.map((ticket) => ({ ...ticket, price: nextValue ? '0' : '' })), nextValue);
    };

    const handleNext = () => {
        for (let i = 0; i < tickets.length; i++) {
            const t = tickets[i];
            if (!t.ticketName || !t.quantity || !t.description) {
                alert(`Please fill in all required fields for Ticket ${i + 1}.`);
                return;
            }
            if (!isFreeEvent && t.price === '') {
                alert(`Please enter a valid price for Ticket ${i + 1}.`);
                return;
            }
        }

        saveEventInfoTickets(tickets.map((ticket) => ({ ...ticket, price: isFreeEvent ? '0' : ticket.price })), isFreeEvent);
        router.push(`/create-event/step-4${eventId() ? `?eventId=${eventId()}` : ''}`);
    };

    const handlePrevious = () => {
        saveEventInfoTickets(tickets, isFreeEvent);
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
            <div className='mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-3'>
                <span className='text-sm font-semibold text-text-dark'>Event type</span>
                <button
                    type='button'
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isFreeEvent ? 'bg-brown-normal text-white' : 'bg-white text-text-dark border border-border'}`}
                    onClick={() => handleFreeToggle(true)}
                >
                    Free Event
                </button>
                <button
                    type='button'
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${!isFreeEvent ? 'bg-brown-normal text-white' : 'bg-white text-text-dark border border-border'}`}
                    onClick={() => handleFreeToggle(false)}
                >
                    Paid Event
                </button>
            </div>

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
                                <label className='mb-1 block text-sm font-medium text-text-dark'>Price {isFreeEvent ? '' : '*'}</label>
                                <input
                                    className='w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring disabled:cursor-not-allowed disabled:bg-surface-hover'
                                    type='number'
                                    placeholder={isFreeEvent ? 'Free event automatically sets price to 0' : 'e.g. 50.00'}
                                    required={!isFreeEvent}
                                    value={isFreeEvent ? '0' : ticket.price}
                                    disabled={isFreeEvent}
                                    onChange={(e) => updateTicket(index, 'price', e.target.value)}
                                />
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
