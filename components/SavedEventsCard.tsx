import React from 'react'
import Button from "./Button";

type SavedEventsCardProps = {
    title: string;
    date: string;
    location: string;
    rating: number;
}
const SavedEventsCard = (
    {
        title,
        date,
        location,
        rating
    }: SavedEventsCardProps
) => {
    return (
        <div className="border border-brown-normal rounded-xl p-4 w-[500px] 
        cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg">

            <div className='flex flex-row items-center gap-6 
                '>
                <div className='space-y-2 grow'>
                    <div className='flex justify-between items-center gap-4'>
                        <h3 className='font-dynapuff text-xl'>{title}</h3>
                        <i className='fa-solid fa-heart text-2xl  text-red-500 
                        transform transition-all duration-300 ease-in-out hover:scale-120 '></i>
                    </div>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-4">
                <p>From Rs. 400</p>
                <Button
                    text="Write Review"
                    variant="cta"
                    size="sm">
                </Button>
            </div>
        </div>
    )
}

export default SavedEventsCard
