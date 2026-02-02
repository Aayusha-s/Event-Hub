'use client';
import React, { useState, useEffect } from 'react'
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { CircleX, Plus } from 'lucide-react';

const Page = () => {
    const router = useRouter();

    // State to hold multiple tickets
    const [tickets, setTickets] = useState([
        { ticketName: '', quantity: '', price: '', description: '' }
    ]);

    useEffect(() => {
        
        const savedEventInfo = localStorage.getItem('EventInfo');

        if (savedEventInfo) {
            const data = JSON.parse(savedEventInfo);

            if (data.tickets && data.tickets.length > 0) {
                setTickets(data.tickets);
            }
        }
    }, []);

    // Update a specific ticket field
    const updateTicket = (index: number, field: string, value: string) => {
        const updated = [...tickets];
        updated[index] = { ...updated[index], [field]: value };
        setTickets(updated);
    };

    // Add a new ticket form
    const handleAddTicket = () => {
        setTickets([
            ...tickets,
            { ticketName: '', quantity: '', price: '', description: '' }
        ]);
    };

    // Remove a ticket form
    const handleRemoveTicket = (index: number) => {
        if (tickets.length > 1) {
            setTickets(tickets.filter((_, i) => i !== index));
        }
    };

    const handleNext = () => {
        // Validate all tickets
        for (let i = 0; i < tickets.length; i++) {
            const t = tickets[i];
            if (!t.ticketName || !t.quantity || !t.price || !t.description) {
                alert(`Please fill in all required fields for Ticket ${i + 1}.`);
                return;
            }
        }

        localStorage.setItem('EventInfo', JSON.stringify({ tickets }));
        router.push('/create-event/step-4');
    };

    const handlePrevious = () => {
        router.push('/create-event/step-2');
    };

    return (
        <div>
            <section className='flex flex-col'>
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <div className='flex justify-between'>
                        <h2 className='text-lg md:text-xl lg:text-xl font-bold'>
                            Ticket & Pricing
                        </h2>
                        <Button
                            text='Add Ticket Type'
                            size='sm'
                            variant='cta'
                            iconLeft={<Plus />}
                            onClick={handleAddTicket}
                        />
                    </div>

                    {/* Render all ticket forms */}
                    {tickets.map((ticket, index) => (
                        <div key={index} className='border border-brown-normal rounded-xl p-2'>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='font-medium'>Ticket {index + 1}</span>
                                {tickets.length > 1 && (
                                    <CircleX
                                        className='cursor-pointer text-brown-dark hover:text-brown-normal'
                                        onClick={() => handleRemoveTicket(index)}
                                    />
                                )}
                            </div>

                            <div className='grid grid-cols-1 gap-4'>
                                <div>
                                    <label className='block mb-1 font-medium'>Ticket Name *</label>
                                    <select
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                        required
                                        value={ticket.ticketName}
                                        onChange={(e) => updateTicket(index, 'ticketName', e.target.value)}
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="General Admission">General Admission</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Early Bird">Early Bird</option>
                                    </select>
                                </div>


                                <div>
                                    <label className='block mb-1 font-medium'>Available Quantity *</label>
                                    <input
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                        type='number'
                                        placeholder='e.g. 100'
                                        required
                                        value={ticket.quantity}
                                        onChange={(e) => updateTicket(index, 'quantity', e.target.value)}
                                    />
                                </div>


                                <div>
                                    <label className='block mb-1 font-medium'>Price *</label>
                                    <input
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                        type='number'
                                        placeholder='e.g. 50.00'
                                        required
                                        value={ticket.price}
                                        onChange={(e) => updateTicket(index, 'price', e.target.value)}
                                    />
                                </div>


                                <div>
                                    <label className='block mb-1 font-medium'>Description *</label>
                                    <textarea
                                        className='w-full p-2 border border-gray-300 rounded-md'
                                        rows={4}
                                        placeholder="What's included in this ticket"
                                        required
                                        value={ticket.description}
                                        onChange={(e) => updateTicket(index, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* divider  */}
                    <div className='h-0.5 bg-brown-normal'></div>

                    <div className='flex justify-center gap-4'>
                        <p>Step 3 of 4</p>
                    </div>

                    <div className='flex justify-between'>
                        <Button text="Previous Step" variant='cta' size='sm' onClick={handlePrevious} />
                        <Button text="Next Step" variant='cta' size='sm' onClick={handleNext} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Page;