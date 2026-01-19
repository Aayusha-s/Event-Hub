import React from 'react'
import Button from './Button';
import { Calendar, EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

type NotificationCardProps = {
    title?: string;
    tag?: string;
    message?: string;
    subtitle?: string;
    subtitleIcon?: React.ReactNode;
    time?: string;
    icon?: React.ReactNode;
    iconColor?: string;
    buttonText?: string;
    unread?: 'block' | 'hidden';
    unreadStyle?: 'border-l-4 border-l-brown-normal' | 'border-gray-200';
}
const NotificationCard = ({
    title,
    tag,
    message,
    subtitle,
    subtitleIcon,
    time,
    icon,
    iconColor,
    buttonText,
    unread,
    unreadStyle,
    
}: NotificationCardProps) => {

    return (
        <div className={`border ${unreadStyle}  hover:border-brown-light-active hover:border-l-brown-normal-hover hover:shadow-md flex flex-col cursor-pointer p-4 rounded-lg transition duration-300 ease-in-out`}>

            <div className='flex justify-between items-center mb-3'>

                {/* icon, title */}
                <div className='flex items-center gap-2'>

                    <div className='flex gap-2 items-center'>
                        <div className={`w-10 h-10 ${iconColor} rounded-[50px] flex items-center justify-center`}>
                            {icon}
                        </div>
                        <h3 className='flex-wrap font-bold text-md md:text-lg'>{title}</h3>
                    </div>

                    {/* unread mark */}
                    <div className={`${unread} w-2 h-2 bg-purple-500 rounded-[50px]`}></div>
                </div>

                {/* time and vertical dot */}
                <div className='flex items-center gap-1'>
                    <p className='text-sm w-full'>{time} ago</p>
                    <EllipsisVertical />
                </div>
            </div>

            {/* tag button */}
            <div className='mb-3'>
                <button className='border border-gray-700 rounded-md px-2 py-1 text-sm font-bold'>
                    {tag}
                </button>
            </div>

            {/* description, user */}
            <div className='flex flex-col gap-2'>
                <p className="text-md flex-wrap ">{message}</p>
                <p className='flex items-center gap-2 font-bold'>
                    {subtitleIcon}
                    {subtitle}
                </p>
            </div>

            {/* view event button */}
            <div className="mt-3">
                    <Button
                        text={buttonText}
                        size="vsm"
                        variant="cta"
                    />
            </div>


        </div>
    )
}

export default NotificationCard
