import { Calendar, Clock, MapPin, Timer, Users } from 'lucide-react'
import React from 'react'
import Button from './Button'

type MeetUpProps = {
    title?: string;
    relatedEvent?: string;
    date?: string;
    time?: string;
    location?: string;
    attendeesCount?: string;
    totalSpots?: string;
}

const MeetUp = ({
    title,
    relatedEvent,
    date,
    time,
    location,
    attendeesCount,
    totalSpots
}: MeetUpProps) => {
    return (
        <div className='bg-white rounded-xl border border-brown-normal p-4 hover:shadow-lg transition-shadow 
            cursor-pointer flex flex-col gap-4'>
            <h3 className='font-bold text-xl'>{title}</h3>
            <p className='font-bold text-lg'>Related to: {relatedEvent}</p>

            <div className='flex flex-col md:flex-row gap-2'>
                <div className='flex flex-row gap-2'>
                    <Calendar strokeWidth={1.8} size={20}/> 
                    <p className='text-sm'>{date}</p>
                </div>

                <div className='flex flex-row gap-2'>
                    <Clock strokeWidth={1.8} size={20}/>
                    <p className='text-sm'>{time}</p>
                </div>

                <div className='flex flex-row gap-2'>
                    <MapPin strokeWidth={1.8} size={20}/>
                    <p className='text-sm'>{location}</p>
                </div>
            </div>

            <div className='h-0.5 bg-brown-light-active'></div>

            <div className='flex flex-row  justify-between'>
                <div className='flex flex-row gap-2'>
                    <Users strokeWidth={1.8} size={20}/>
                    <p>{attendeesCount}/{totalSpots} attending</p>
                </div>

                <Button
                text='Join MeetUp'
                variant='cta'
                size='sm'
                ></Button>
            </div>

        </div>
    )
}

export default MeetUp
