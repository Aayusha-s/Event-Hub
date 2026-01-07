'use client';

import { Check, Minus, Plus } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

type TicketsProps = {
    title?: string
    subtitle?: string
    price?: number
    remainingTickets?: number
    features?: string[]


}
const Tickets = ({
    title,
    subtitle,
    price,
    remainingTickets,
    features
}: TicketsProps) => {
    const [quantity, setQuantity] = useState(0);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }
    

    return (
        <div className='border border-brown-normal p-2 rounded-xl space-y-2'>

            {/* titles and prices */}
            <div className='flex flex-row justify-between gap-4'>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-bold'>{title}</h3>
                    <p>{subtitle}</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <p className='text-md font-bold'>${price}</p>
                    <p className='text-sm text-center text-gray-400'>{remainingTickets} left</p>
                </div>
            </div>


            {/* select ticket features */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Check size={18} className="text-green-500" />
                        <p className="text-sm">{feature}</p>
                    </div>
                ))}
            </div>


            {/* divider */}
            <div className='w-full h-0.5 bg-brown-light-hover my-4'></div>

            {/* ticket quantity selector */}
            <div className='flex flex-row items-center justify-between'>
                <h3 className='font-bold'>Quantity</h3>

                <div className='flex flex-row items-center'>
                    <div className='w-8 h-8 flex items-center bg-gray-100 hover:bg-gray-300 transition ease-in-out rounded-[50px] justify-center cursor-pointer'>
                        <Minus size={18} onClick={decreaseQuantity} />
                    </div>
                    <span className='mx-4'>{quantity}</span>
                    <div className='w-8 h-8 flex items-center bg-gray-100 hover:bg-gray-300 transition ease-in-out rounded-[50px] justify-center cursor-pointer'>
                        <Plus size={18} onClick={increaseQuantity} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets
