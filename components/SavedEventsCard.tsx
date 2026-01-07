import React from 'react'
import Button from "./Button";
import { Heart } from 'lucide-react';
import Link from 'next/link';

type SavedEventsCardProps = {
    title: string;
    date: string;
    location: string;
    price?: number;
}
const SavedEventsCard = (
    {
        title,
        date,
        location,
        price
    }: SavedEventsCardProps
) => {
    return (
        <div className="border border-brown-normal bg-brown-light rounded-xl p-4 w-full lg:max-w-[500px] 
        cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg">

            <div className='flex flex-row items-center gap-6 '>
                <div className='space-y-2 grow'>
                    <div className='flex justify-between items-center gap-4'>
                        <h3 className='font-dynapuff text-xl'>{title}</h3>
                        <Heart className="text-red-500 fill-red-500 
                        transform transition-all duration-300 ease-in-out hover:scale-120" />
                    </div>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <p>From Rs. {price}</p>
                <Link href='/booknow'>
                    <Button
                        text="Book Now"
                        variant="cta"
                        size="sm"
                    >
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default SavedEventsCard
