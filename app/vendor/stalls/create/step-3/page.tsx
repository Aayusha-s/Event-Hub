'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store } from 'lucide-react';
import Button from '@/components/Button';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { loadStallDraft, clearStallDraft } from '@/lib/createStallDraft';
import type { StallEventDraft, StallDetailsDraft } from '@/lib/createStallDraft';

const Page = () => {
    const router = useRouter();
    const eventDraft = loadStallDraft<StallEventDraft>('stallEvent');
    const detailsDraft = loadStallDraft<StallDetailsDraft>('stallDetails');
    const stallImage = loadStallDraft<File>('stallImage');
    const stallImagePreview = loadStallDraft<string>('stallImagePreview');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async () => {
        if (!eventDraft || !detailsDraft) {
            setSubmitError('Draft is incomplete. Please go back and fill in all details.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            let stallImageUrl = '';

            // Upload image if present
            if (stallImage) {
                const formData = new FormData();
                formData.append('file', stallImage);

                const uploadResponse = await fetch('/api/stalls/upload-image', {
                    method: 'POST',
                    body: formData,
                });

                const uploadResult = await uploadResponse.json();
                if (!uploadResponse.ok || !uploadResult.success) {
                    throw new Error(uploadResult.error?.message || 'Failed to upload stall image.');
                }

                stallImageUrl = uploadResult.data.url;
            }

            // Submit stall request
            const response = await fetch('/api/vendors/stalls', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: eventDraft.eventId,
                    stallName: detailsDraft.stallName,
                    description: detailsDraft.description,
                    stallType: detailsDraft.stallType,
                    size: detailsDraft.size,
                    bookingFee: Number(detailsDraft.bookingFee),
                    stallImage: stallImageUrl,
                }),
            });

            const result = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || 'Unable to submit stall request.');
            }

            clearStallDraft();
            router.push('/vendor/stalls?submitted=success');
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Unable to submit stall request.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePrevious = () => {
        router.push('/vendor/stalls/create/step-2');
    };

    if (!eventDraft || !detailsDraft) {
        return (
            <div className="surface-card p-6">
                <p className="text-text-light">Draft is incomplete. Please start from the first step.</p>
                <div className="mt-4">
                    <Button text="Go to Step 1" variant="cta" size="sm" onClick={() => router.push('/vendor/stalls/create/step-1')} />
                </div>
            </div>
        );
    }

    return (
        <CreateEventStepShell
            stepLabel="Step 3 of 3"
            title="Review and Submit"
            description="Check your stall request details before submitting for administrator approval."
            footer={(
                <div className="flex items-center justify-between gap-3">
                    <Button text="Previous Step" variant="secondary" size="sm" onClick={handlePrevious} disabled={isSubmitting} />
                    <Button text={isSubmitting ? 'Submitting…' : 'Submit for Approval'} variant="cta" size="sm" onClick={handleSubmit} disabled={isSubmitting} iconLeft={<Store size={17} />} />
                </div>
            )}
        >
            {submitError && <p className="rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{submitError}</p>}

            <div className="surface-card p-4">
                <h3 className="mb-3 text-sm font-semibold text-text-dark">Selected Event</h3>
                <div className="space-y-2 text-sm text-text-light">
                    <p><strong className="text-text-dark">Title:</strong> {eventDraft.eventTitle}</p>
                    <p><strong className="text-text-dark">Venue:</strong> {eventDraft.eventVenue}</p>
                    <p><strong className="text-text-dark">Apply by:</strong> {new Date(eventDraft.stallApplicationDeadline).toLocaleDateString()}</p>
                    <p><strong className="text-text-dark">Available stalls:</strong> {eventDraft.stallCapacity}</p>
                </div>
            </div>

            <div className="surface-card p-4">
                <h3 className="mb-3 text-sm font-semibold text-text-dark">Stall Information</h3>
                <div className="space-y-2 text-sm text-text-light">
                    <p><strong className="text-text-dark">Stall Name:</strong> {detailsDraft.stallName}</p>
                    <p><strong className="text-text-dark">Type:</strong> {detailsDraft.stallType}</p>
                    <p><strong className="text-text-dark">Size:</strong> {detailsDraft.size}</p>
                    <p><strong className="text-text-dark">Booking Fee:</strong> Rs. {Number(detailsDraft.bookingFee).toLocaleString()}</p>
                    <p><strong className="text-text-dark">Description:</strong> {detailsDraft.description}</p>
                </div>
                {stallImagePreview && (
                    <div className="mt-4">
                        <p className="mb-2 text-sm font-semibold text-text-dark">Stall Image:</p>
                        <img src={stallImagePreview} alt="Stall" className="max-w-xs rounded-lg border border-border" />
                    </div>
                )}
            </div>
        </CreateEventStepShell>
    );
};

export default Page;
