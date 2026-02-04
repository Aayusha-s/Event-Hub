'use client';
import  { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const [terms, setTerms] = useState<string[]>([]);
    const [termsError, setTermsError] = useState('');

    
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

    const handleSubmit = () => {

        localStorage.setItem(
            'organizerStep4',
            JSON.stringify({ terms })
        );

        alert('Application Submitted 🎉');
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
                            <input type="checkbox" id="term1" value="term1"
                                />
                            <label htmlFor="term1" className='cursor-pointer'>I agree to Platform Terms*</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term2" value="term2" />
                            <label htmlFor="term2" className='cursor-pointer'>I will provide accurate event information*</label>
                        </div>

                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term3" value="term3" />
                            <label htmlFor="term3" className='cursor-pointer'>I understand fee structure (if any)*</label>
                        </div>
                        <div className=" flex items-center gap-2 w-full p-3  cursor-pointer">
                            <input type="checkbox" id="term4" value="term4" />
                            <label htmlFor="term4" className='cursor-pointer'>I allow attendee reviews*</label>
                        </div>
                    </div>


                    {/* divider and steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 4 of 4</p>
                    </div>

                    {/* next button */}
                    <div className='flex justify-between'>

                        <Button text="Previous Step" variant='cta' size='sm' onClick={handlePrevious}></Button>

                        <Button text="Submit Application" variant='cta' size='sm' onClick={handleSubmit}></Button>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page
