'use client';
import { useState } from 'react'
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
    const router = useRouter();
    const { update: updateSession } = useSession();

    const [agreedTerms, setAgreedTerms] = useState<Record<string, boolean>>({
        term1: false,
        term2: false,
        term3: false,
        term4: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const toggleTerm = (key: string) => {
        setAgreedTerms((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const allTermsAccepted = Object.values(agreedTerms).every(Boolean);

    const handlePrevious = () => {
        const savedStep1 = localStorage.getItem('organizerStep1');

        if (!savedStep1) {
            router.push('/organizer/organizerapplication-1');
            return;
        }

        const { orgType } = JSON.parse(savedStep1);

        switch (orgType) {
            case 'individual':
                router.push('/organizer/organizerapplication-3-individual');
                break;
            case 'business':
                router.push('/organizer/organizerapplication-3-business');
                break;
            case 'nonprofit':
                router.push('/organizer/organizerapplication-3-nonprofit');
                break;
            case 'agency':
                router.push('/organizer/organizerapplication-3-professional');
                break;
            default:
                router.push('/organizer/organizerapplication-3');
        }
    };

    const handleSubmit = async () => {
        setSubmitError('');

        if (!allTermsAccepted) {
            setSubmitError('Please accept all the required terms before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            const savedStep1 = localStorage.getItem('organizerStep1');
            const savedStep2 = localStorage.getItem('organizerStep2');
            const step1 = savedStep1 ? JSON.parse(savedStep1) : {};
            const step2 = savedStep2 ? JSON.parse(savedStep2) : {};

            const orgType = step1?.orgType || 'individual';
            const organizationName =
                step1?.contactPerson || step1?.eventType || 'My Organization';

            localStorage.setItem('organizerStep4', JSON.stringify({ terms: agreedTerms }));

            const response = await fetch('/api/organizer/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orgType,
                    organizationName,
                    description: step1?.description,
                    website: step1?.website,
                    formData: { ...step1, ...step2, terms: agreedTerms },
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result?.error?.message || 'Failed to submit application.');
            }

            await updateSession();

            localStorage.removeItem('organizerStep1');
            localStorage.removeItem('organizerStep2');
            localStorage.removeItem('organizerStep4');

            setSubmitSuccess(true);

            setTimeout(() => {
                router.push('/organizerdashboard');
            }, 1500);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <section className='flex flex-col
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8'>
                {/* back to dashboard button */}
                <div className='mb-4'>
                    <Button text="Back to Dashboard" variant='cta' size='sm' iconLeft={<ArrowLeft />}></Button>
                </div>

                {/* title and subtitle */}
                <div className='flex flex-row items-center gap-4 mb-4'>
                    <div className='relative bg-brown-normal p-4 rounded-md w-12 h-12 flex items-center justify-center'>
                        <Check strokeWidth={4} className='absolute text-white' />
                    </div>

                    <div className='flex flex-col'>
                        <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-semibold '>
                            Organizer Application
                        </h2>
                        <p className='text-base md:text-md lg:text-md'>
                            Tell us about your organization
                        </p>
                    </div>
                </div>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-medium'>
                        Agreement
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        Please review and accept the terms
                    </p>

                    {/* terms and conditions box */}
                    <div className='flex flex-col border border-brown-normal rounded-md'>
                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term1" checked={agreedTerms.term1} onChange={() => toggleTerm('term1')}
                                />
                            <label htmlFor="term1" className='cursor-pointer'>I agree to Platform Terms*</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term2" checked={agreedTerms.term2} onChange={() => toggleTerm('term2')} />
                            <label htmlFor="term2" className='cursor-pointer'>I will provide accurate event information*</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term3" checked={agreedTerms.term3} onChange={() => toggleTerm('term3')} />
                            <label htmlFor="term3" className='cursor-pointer'>I understand fee structure (if any)*</label>
                        </div>
                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term4" checked={agreedTerms.term4} onChange={() => toggleTerm('term4')} />
                            <label htmlFor="term4" className='cursor-pointer'>I allow attendee reviews*</label>
                        </div>
                    </div>

                    {submitError && (
                        <div className='rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700'>
                            {submitError}
                        </div>
                    )}

                    {submitSuccess && (
                        <div className='rounded-md border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700'>
                            Application submitted successfully! Redirecting to your dashboard...
                        </div>
                    )}


                    {/* divider and steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 4 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-between'>

                        <Button text="Previous Step" variant='cta' size='sm' onClick={handlePrevious} disabled={isSubmitting}></Button>

                        <Button
                            text={isSubmitting ? 'Submitting...' : 'Submit Application'}
                            variant='cta'
                            size='sm'
                            onClick={handleSubmit}
                            disabled={isSubmitting || submitSuccess}
                            iconLeft={isSubmitting ? <Loader2 className='animate-spin' /> : undefined}
                        ></Button>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page