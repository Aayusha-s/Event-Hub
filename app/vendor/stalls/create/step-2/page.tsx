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
    const [customCategory, setCustomCategory] = useState(() => {
        if (typeof window === 'undefined') return '';
        try {
            return JSON.parse(window.localStorage.getItem('StallDetails') || 'null')?.customCategory ?? '';
        } catch {
            return '';
        }
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const stallCategories = eventDraft?.stallCategories ?? [];
    const predefinedCategories = ['Food & Beverages', 'Clothing & Fashion', 'Arts & Crafts', 'Beauty & Wellness', 'Electronics & Technology', 'Home & Lifestyle', 'Books & Education', 'Jewelry & Accessories', 'Services'];
    const isCustomCategory = stallType === '__custom__' || (!predefinedCategories.includes(stallType) && !stallCategories.includes(stallType) && stallType !== '');

    const handleNext = () => {
        const newErrors: Record<string, string> = {};

        // Validate stall name
        if (!stallName.trim() || stallName.trim().length < 2) {
            newErrors.stallName = 'Please enter a stall name (at least 2 characters).';
        }

        // Determine the final stall type value
        const selectedCategory = stallType === '__custom__' ? customCategory.trim() : stallType.trim();
        if (!selectedCategory || selectedCategory === '__custom__' || selectedCategory.length < 2) {
            newErrors.stallType = 'Please select or enter a stall type/category.';
        }

        // Validate size
        if (!size.trim()) {
            newErrors.size = 'Please enter a stall size (e.g., 3m x 3m).';
        }

        // Validate booking fee
        const feeNumber = Number(bookingFee);
        if (!bookingFee.trim() || Number.isNaN(feeNumber) || feeNumber < 0) {
            newErrors.bookingFee = 'Please enter a valid booking fee (non-negative number).';
        }

        // Validate description
        if (!description.trim() || description.trim().length < 10) {
            newErrors.description = 'Please enter a description (at least 10 characters).';
        }

        // If there are errors, display them and return
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        // All validations passed, save the draft
        const details: StallDetailsDraft = {
            stallName: stallName.trim(),
            stallType: selectedCategory,
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
                        onChange={(e) => {
                            setStallName(e.target.value);
                            if (errors.stallName) setErrors({ ...errors, stallName: '' });
                        }}
                        className={`w-full rounded-xl border ${errors.stallName ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                        required
                    />
                    {errors.stallName && <p className="mt-1 text-xs text-red-600">{errors.stallName}</p>}
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Stall Type / Category *</h2>
                    <div className="space-y-2">
                        <select
                            className={`w-full rounded-xl border ${errors.stallType ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                            required
                            value={stallType === '__custom__' || (customCategory && stallType === customCategory) ? '__custom__' : stallType}
                            onChange={(e) => {
                                setStallType(e.target.value);
                                if (e.target.value !== '__custom__') setCustomCategory('');
                                if (errors.stallType) setErrors({ ...errors, stallType: '' });
                            }}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {stallCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                            {predefinedCategories.filter((cat) => !stallCategories.includes(cat)).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                            <option value="__custom__">Other / Custom</option>
                        </select>
                        {stallType === '__custom__' && (
                            <input
                                type="text"
                                placeholder="Enter your custom category (e.g., Photography, Crafts)"
                                value={customCategory}
                                onChange={(e) => {
                                    setCustomCategory(e.target.value);
                                    if (errors.stallType) setErrors({ ...errors, stallType: '' });
                                }}
                                className={`w-full rounded-xl border ${errors.stallType ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                                required
                            />
                        )}
                        {errors.stallType && <p className="text-xs text-red-600">{errors.stallType}</p>}
                    </div>
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Size *</h2>
                    <input
                        type="text"
                        placeholder="e.g., 3m x 3m"
                        value={size}
                        onChange={(e) => {
                            setSize(e.target.value);
                            if (errors.size) setErrors({ ...errors, size: '' });
                        }}
                        className={`w-full rounded-xl border ${errors.size ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                        required
                    />
                    {errors.size && <p className="mt-1 text-xs text-red-600">{errors.size}</p>}
                </div>
                <div>
                    <h2 className="mb-2 text-sm font-medium text-text-dark">Booking Fee (Rs.) *</h2>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="e.g., 5000"
                        value={bookingFee}
                        onChange={(e) => {
                            setBookingFee(e.target.value);
                            if (errors.bookingFee) setErrors({ ...errors, bookingFee: '' });
                        }}
                        className={`w-full rounded-xl border ${errors.bookingFee ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                        required
                    />
                    {errors.bookingFee && <p className="mt-1 text-xs text-red-600">{errors.bookingFee}</p>}
                </div>
            </div>

            <div>
                <h2 className="mb-2 text-sm font-medium text-text-dark">Description *</h2>
                <textarea
                    placeholder="Describe what you will offer at your stall (minimum 10 characters)..."
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        if (errors.description) setErrors({ ...errors, description: '' });
                    }}
                    className={`h-32 w-full resize-none rounded-xl border ${errors.description ? 'border-red-500' : 'border-border'} bg-surface px-3 py-3 text-text-dark focus-ring`}
                    required
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>
        </CreateEventStepShell>
    );
};

export default Page;
