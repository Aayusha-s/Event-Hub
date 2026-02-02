'use client';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [basicInformation, setBasicInformation] = useState<any>(null);
    const [eventDetails, setEventDetails] = useState<any>(null);
    const [eventInfo, setEventInfo] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const savedBasicInformation = localStorage.getItem('BasicInformation');
        if (savedBasicInformation) {
            setBasicInformation(JSON.parse(savedBasicInformation));
        }
        const savedEventDetails = localStorage.getItem('EventDetails');
        if (savedEventDetails) {
            setEventDetails(JSON.parse(savedEventDetails));
        }
        const savedEventInfo = localStorage.getItem('EventInfo');
        if (savedEventInfo) {
            setEventInfo(JSON.parse(savedEventInfo));
        }
    }, []);

    const handlePublish = () => {

        alert('Event Published Successfully!');

        localStorage.removeItem('BasicInformation');
        localStorage.removeItem('EventDetails');
        localStorage.removeItem('EventInfo');

        router.push('/event-details/[id]');

    }

    return (
        <div>
            <section className='flex flex-col'>


                {/* main form */}
                <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 bg-brown-light'>
                    <h2 className='text-lg md:text-xl lg:text-xl font-bold'>
                        Review and Publish
                    </h2>

                    {/* event information */}
                    <h3 className='font-bold'>Event Information</h3>
                    <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                        <p><strong>Title:</strong> {basicInformation?.title || ''}</p>
                        <p><strong>Category:</strong> {basicInformation?.category || ''}</p>
                        <p><strong>Description:</strong> {basicInformation?.description || ''}</p>

                    </div>


                    {/* date and location */}
                    <h3 className='font-bold'>Date and Location </h3>
                    <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                        <p><strong>Start Time:</strong> {eventDetails?.startTime || ''}</p>
                        <p><strong>End Time:</strong> {eventDetails?.endTime || ''}</p>
                        <p><strong>Venue:</strong> {eventDetails?.venueName || ''}</p>
                        <p><strong>Capacity:</strong> {eventDetails?.eventCapacity || ''}</p>

                    </div>


                    {/* ticket */}
                    <h3 className='font-bold'>Tickets (2)</h3>

                    <div className='border bg-gray-100 rounded-xl p-2 flex flex-col gap-2'>
                        <p><strong>{eventInfo?.ticketName}</strong></p>
                        <p>Quantity: {eventInfo?.quantity || ''}</p>
                        <p>Price: {eventInfo?.price || ''}</p>
                    </div>
                    


                    {/* steps */}
                    <div className='h-0.5 bg-brown-normal'></div>
                    <div className='flex justify-center gap-4'>
                        <p>Step 4 of 4</p>
                    </div>


                    <div className='flex justify-between'>
                        {/* previous button */}
                        <div className='flex justify-end'>
                            <Link href='/create-event/step-3'>
                                <Button text="Previous Step" variant='cta' size='sm'></Button>
                            </Link>
                        </div>


                        {/* next button */}
                        <div className='flex justify-end'>

                            <Button text="Publish Event" variant='cta' size='sm' onClick={handlePublish}></Button>

                        </div></div>
                </div>
            </section>
        </div>
    )
}

export default Page