'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { saveStallDraft, loadStallDraft } from '@/lib/createStallDraft';
import type { StallEventDraft, StallDetailsDraft } from '@/lib/createStallDraft';

const Page = () => {
    const router = useRouter();
    const eventDraft = loadStallDraft<StallEventDraft>('stallEvent');

    const [stallName, setStallName] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.stallName ?? '';
        } catch {
            return '';
        }
    });
    const [stallType, setStallType] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.stallType ?? '';
        } catch {
            return '';
        }
    });
    const [size, setSize] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.size ?? '';
        } catch {
            return '';
        }
    });
    const [bookingFee, setBookingFee] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.bookingFee ?? '';
        } catch {
            return '';
        }
    });
    const [description, setDescription] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.description ?? '';
        } catch {
            return '';
        }
    });
    const [customCategory, setCustomCategory] = useState('');

    const stallCategories = eventDraft?.stallCategories ?? [];
    const predefinedCategories = ['Food & Beverages', 'Clothing & Fashion', 'Arts & Crafts', 'Beauty & Wellness', 'Electronics & Technology', 'Home & Lifestyle', 'Books & Education', 'Jewelry & Accessories', 'Services'];
    const isCustomCategory = stallType === '__custom__' || (!predefinedCategories.includes(stallType) && !stallCategories.includes(stallType) && stallType !== '');

    const handleNext = () => {
        if (!stallName.trim() || stallName.trim().length < 2) {
            alert('Please enter a stall name (at least 2 characters).');
            return;
        }
        const selectedCategory = stallType === '__custom__' ? customCategory : stallType;
        if (!selectedCategory.trim() || selectedCategory === '__custom__' || selectedCategory.trim().length < 2) {
            alert('Please select or enter a stall type.');
            return;
        }
        if (!size.trim()) {
            alert('Please enter a stall size.');
            return;
        }
        if (!bookingFee.trim() || Number.isNaN(Number(bookingFee)) || Number(bookingFee) < 0) {
            alert('Please enter a valid booking fee.');
            return;
        }
        if (!description.trim() || description.trim().length < 10) {
            alert('Please enter a description (at least 10 characters).');
            return;
        }

        const details: StallDetailsDraft = {
            stallName: stallName.trim(),
            stallType: selectedCategory.trim(),
            size: size.trim(),
            bookingFee: bookingFee.trim(),
            description: description.trim(),
        };
        saveStallDraft('stallDetails', details);
        router.push('/vendor/stalls/create/step-3');
    };

    const handlePrevious = () => {
        router.push('/vendor/stalls/create/step-1');
    };

    if (!eventDraft) {
        return (
            <div className="surface-card p-6">
                <p className="text-text-light">No event selected. Please start from the first step.</p>
                <div className="mt-4">
                    <Button text="Go to Step 1" variant="cta" size="sm" onClick={() => router.push('/vendor/stalls/create/step-1')} />
                </div>
            </div>
        );
    }

    return (
        <CreateEventStepShell
            stepLabel="Step 2 of 3"
            title="Stall Details"
            description="Tell us about your stall so attendees know what to expect."
            footer={(
                <div className="flex items-center justify-between gap-3">
                    <Button text="Previous Step" variant="secondary" size="sm" onClick={handlePrevious} />
                    <Button text="Next Step" variant="cta" size="sm" onClick={handleNext} />
                </div>
            )}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Stall Name *</h2>
                    <input
                        type="text"
                        placeholder="e.g., Fresh Bakes Corner"
                        value={stallName}
                        onChange={(e) => setStallName(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                        required
                    />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Stall Type / Category *</h2>
                    <>
                        <select
                            className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                            required
                            value={stallType === '__custom__' || (customCategory && stallType === customCategory) ? '__custom__' : stallType}
                            onChange={(e) => { setStallType(e.target.value); if (e.target.value !== '__custom__') setCustomCategory(''); }}
                        >
                            <option value="" disabled>Select a category</option>
                            {stallCategories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                            {predefinedCategories.filter((cat) => !stallCategories.includes(cat)).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                            <option value="__custom__">Other / Custom</option>
                        </select>
                        {isCustomCategory && (
                        <input
                            type="text"
                            placeholder="Enter your custom category"
                            value={customCategory || (stallType !== '__custom__' ? stallType : '')}
                            onChange={(e) => { setCustomCategory(e.target.value); setStallType(e.target.value); }}
                            className="w-full rounded-xl border border-border bg-surface px-3 py-3 my-4 text-text-dark focus-ring"
                            required
                        />
                        )}
                    </>
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Size *</h2>
                    <input
                        type="text"
                        placeholder="e.g., 3m x 3m"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                        required
                    />
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Booking Fee (Rs.) *</h2>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 5000"
                        value={bookingFee}
                        onChange={(e) => setBookingFee(e.target.value)}
                        className="w-full rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                        required
                    />
                </div>
            </div>

            <div>
                <h2 className="mb-2 text-sm font-medium text-text-dark">Description *</h2>
                <textarea
                    placeholder="Describe what you will offer at your stall..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-32 w-full resize-none rounded-xl border border-border bg-surface px-3 py-3 text-text-dark focus-ring"
                    required
                />
            </div>
        </CreateEventStepShell>
    );
};

export default Page;
