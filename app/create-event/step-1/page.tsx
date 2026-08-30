'use client';
import React, { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import CreateEventStepShell from '@/components/CreateEventStepShell';
import { loadDraft, saveDraft, type BasicInformationDraft } from '@/lib/createEventDraft';

type EditableBasicInformationDraft = BasicInformationDraft & { images?: string[] };

const Page = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const router = useRouter();
	const eventId = () => typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('eventId');

    useEffect(() => {
        const id = eventId();
        if (id) {
            fetch(`/api/events/${id}`).then(r => r.json()).then(r => {
                if (!r.success) return;
                const event = r.data;
                const start = new Date(event.startDate), end = new Date(event.endDate);
                saveDraft('basicInformation', { title: event.title, category: event.category, description: event.description, images: event.images ?? [], eventId: id });
                saveDraft('eventDetails', { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), startTime: start.toISOString().slice(11, 16), endTime: end.toISOString().slice(11, 16), venueName: event.venue, streetAddress: '', city: '', state: '', eventCapacity: String(event.capacity), allowVendorStalls: Boolean(event.allowVendorStalls), stallOpeningDate: event.stallOpeningDate ? new Date(event.stallOpeningDate).toISOString().slice(0, 10) : '', stallApplicationDeadline: event.stallApplicationDeadline ? new Date(event.stallApplicationDeadline).toISOString().slice(0, 10) : '', stallCapacity: event.stallCapacity ? String(event.stallCapacity) : '', stallCategories: (event.stallCategories ?? []).join(', ') });
                saveDraft('eventInfo', { tickets: event.ticketTypes.map((ticket: { name: string; quantity: number; price: number; description?: string }) => ({ ticketName: ticket.name, quantity: String(ticket.quantity), price: String(ticket.price), description: ticket.description ?? '' })) });
                setTitle(event.title);
                setCategory(event.category);
                setDescription(event.description);
                setImages(event.images ?? []);
            });
            return;
        }

        const draft = loadDraft<EditableBasicInformationDraft>('basicInformation');
        if (draft) {
            setTitle(draft.title);
            setCategory(draft.category);
            setDescription(draft.description);
            setImages(draft.images ?? []);
        }
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
            setUploadError('Only JPG, PNG, and WebP images are supported.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setUploadError('Images must be 10MB or smaller.');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/events/upload-image', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error?.message || 'Unable to upload image');
            }

            const newImages = [...images, result.data.imageUrl];
            setImages(newImages);
            setUploadError('');
        } catch (error) {
            setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
        } finally {
            setIsUploading(false);
            // Reset file input
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (!title || !category || !description) {
            alert('Please fill in all required fields.');
            return;
        }

        const BasicInformation = {
            title,
            category,
            description,
            images,
            ...(eventId() ? { eventId: eventId() } : {}),
        }

        saveDraft("basicInformation", BasicInformation);

		router.push(`/create-event/step-2${eventId() ? `?eventId=${eventId()}` : ''}`);
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
                
                {/* Upload Area */}
                <label
                    htmlFor="eventImages"
                    className="block cursor-pointer rounded-2xl border border-dashed border-border bg-surface-hover p-6 text-center transition-colors hover:border-primary hover:bg-primary-light"
                >
                    <Upload className="mx-auto mb-2 h-8 w-8 text-primary" />
                    <p className="mb-1 text-sm text-text-dark">
                        {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-text-light">
                        JPG, PNG, or WebP (Max 10MB)
                    </p>
                </label>
                <input
                    id="eventImages"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                />

                {/* Error Message */}
                {uploadError && (
                    <p className='mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2'>
                        {uploadError}
                    </p>
                )}

                {/* Image Previews */}
                {images.length > 0 && (
                    <div className='mt-4'>
                        <h3 className='mb-3 text-sm font-medium text-text-dark'>Uploaded Images ({images.length})</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                            {images.map((image, index) => (
                                <div key={index} className='relative group'>
                                    <img 
                                        src={image} 
                                        alt={`Event image ${index + 1}`}
                                        className='w-full h-32 object-cover rounded-lg border border-border'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(index)}
                                        className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity'
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CreateEventStepShell>
    )
}

export default Page
