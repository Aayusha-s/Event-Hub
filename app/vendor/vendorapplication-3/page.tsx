'use client'
import { useState } from 'react'
import { ArrowLeft, Check, Upload, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const BUSINESS_TYPE_LABELS: Record<string, string> = {
    music_concerts: 'Music Concerts',
    concert_parties: 'Concert/Parties',
    business_events: 'Business Events',
    workshops_seminars: 'Workshops/Seminars',
    sports_events: 'Sports Events',
    community_events: 'Community Events',
    festivals_fairs: 'Festivals/Fairs',
    charity_nonprofit_events: 'Charity/Non-Profit Events',
    other: 'Other',
};

const Page = () => {
    const router = useRouter();
    const { update: updateSession } = useSession();

    const [agreedTerms, setAgreedTerms] = useState<Record<string, boolean>>({
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

    const handleSubmit = async () => {
        setSubmitError('');

        if (!allTermsAccepted) {
            setSubmitError('Please accept all the required terms before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            const savedStep1 = localStorage.getItem('vendorStep1');
            const step1 = savedStep1 ? JSON.parse(savedStep1) : {};

            const category = BUSINESS_TYPE_LABELS[step1?.businessType as string] || 'Other';
            const businessName =
                step1?.city && step1?.state
                    ? `${step1.city} Vendor (${step1.state})`
                    : step1?.email
                    ? `${step1.email.split('@')[0]}'s Business`
                    : 'My Vendor Business';
            const description = step1?.description || 'Vendor application submitted via EventHub.';

            const response = await fetch('/api/vendors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName,
                    description,
                    category,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result?.error?.message || 'Failed to submit application.');
            }

            await updateSession();

            localStorage.removeItem('vendorStep1');

            setSubmitSuccess(true);

            setTimeout(() => {
                router.push('/vendordashboard');
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
                            Vendor Application
                        </h2>
                        <p className='text-base md:text-md lg:text-md'>
                            Tell us about your organization
                        </p>
                    </div>
                </div>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='font-dynapuff text-lg md:text-xl lg:text-xl font-medium'>
                        Documentation & Certifications
                    </h2>
                    <p className='text-base md:text-md lg:text-md'>
                        Upload required documents based on your organizer type
                    </p>


                    {/* organization type   */}
                    <div className='border border-brown-normal rounded-md p-2 bg-white flex flex-col gap-2'>
                        <h2 className='text-sm md:text-md lg:text-md font-bold'>Business/Professional Organizer Requirements</h2>
                        <p className='text-sm md:text-md lg:text-md'>Please provide the following business documents</p>
                    </div>

                    {/* business registration */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">
                            Upload Business Registration *
                        </label>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="business-registration"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                        />

                        {/* Clickable upload box */}
                        <label
                            htmlFor="business-registration"
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer block"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">
                                Upload business registration certificate
                            </p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">
                                PDF, JPG, or PNG (Max 5MB)
                            </p>
                        </label>
                    </div>


                    {/* tax certificate */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">
                            Tax Certificate *
                        </label>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="tax-certificate"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                        />

                        {/* Clickable upload box */}
                        <label
                            htmlFor="tax-certificate"
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer block"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">
                                Upload tax certificate or EIN document
                            </p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">
                                PDF, JPG, or PNG (Max 5MB)
                            </p>
                        </label>
                    </div>


                    {/* insurance  */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">
                            Insurance *
                        </label>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="insurance"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                        />

                        {/* Clickable upload box */}
                        <label
                            htmlFor="insurance"
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer block"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">
                                Upload liability insurance certificate
                            </p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">
                                PDF, JPG, or PNG (Max 5MB)
                            </p>
                        </label>
                    </div>


                    {/* health permits  */}

                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">
                            Health Permits (if Applicable) *
                        </label>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="health-permits"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                        />

                        {/* Clickable upload box */}
                        <label
                            htmlFor="health-permits"
                            className="border-2 border-dashed border-brown-normal rounded-lg p-6 text-center hover:border-brown-dark transition-colors cursor-pointer block"
                        >
                            <Upload className="w-8 h-8 text-brown-dark mx-auto mb-2" />
                            <p className="text-brown-dark mb-1 text-sm md:text-md lg:text-md">
                                Upload health department permits
                            </p>
                            <p className="text-brown-dark text-sm md:text-md lg:text-md">
                                PDF, JPG, or PNG (Max 5MB)
                            </p>
                        </label>
                    </div>


                    {/*additional certificate */}
                    <div>
                        <label className="block text-brown-dark mb-2 font-bold text-sm md:text-md lg:text-md">Additional Certificate (Optional)</label>
                        <input type='url'
                            className="text-sm md:text-md lg:text-md w-full px-4 py-3 border border-brown-normal rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-dark"
                            placeholder="https://yourbusinesswebsite.com"
                        />
                    </div>

                    {/* terms and conditions box */}

                    <div className='flex flex-col border border-brown-normal rounded-md'>
                        <label className="block text-brown-dark mb-2 pl-2 pt-4 font-bold text-sm md:text-md lg:text-md">Review & Agreement *</label>


                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term2" checked={agreedTerms.term2} onChange={() => toggleTerm('term2')} />
                            <label htmlFor="term2" className='cursor-pointer'>I confirm that all information provided is accurate and complete *</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term3" checked={agreedTerms.term3} onChange={() => toggleTerm('term3')} />
                            <label htmlFor="term3" className='cursor-pointer'>I agree to EventHub &apos;s Vendor Terms & Conditions *</label>
                        </div>
                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term4" checked={agreedTerms.term4} onChange={() => toggleTerm('term4')} />
                            <label htmlFor="term4" className='cursor-pointer'>I understand that my application will be reviewed within 2-3 business days *</label>
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
                        <p>Step 3 of 3</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-between'>
                        <Link href='/vendor/vendorapplication-2' >
                            <Button text="Previous Step" variant='cta' size='sm' disabled={isSubmitting}></Button>
                        </Link>
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
