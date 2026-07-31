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
    quantity?: number
    onQuantityChange?: (quantity: number) => void
    disabled?: boolean


}
const Tickets = ({
    title,
    subtitle,
    price,
    remainingTickets,
    features,
    quantity: controlledQuantity,
    onQuantityChange,
    disabled = false
}: TicketsProps) => {
    const [quantity, setQuantity] = useState(0);
    const selectedQuantity = controlledQuantity ?? quantity;
    const setSelectedQuantity = (nextQuantity: number) => {
        const maximum = disabled ? 0 : Math.max(0, remainingTickets ?? 0);
        const safeQuantity = Math.max(0, Math.min(maximum, Number.isFinite(nextQuantity) ? Math.floor(nextQuantity) : 0));
        if (controlledQuantity === undefined) setQuantity(safeQuantity);
        onQuantityChange?.(safeQuantity);
    };

    const increaseQuantity = () => {
        setSelectedQuantity(selectedQuantity + 1);
    }

    const decreaseQuantity = () => {
        if (selectedQuantity > 0) {
            setSelectedQuantity(selectedQuantity - 1);
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
                    <button type='button' disabled={disabled || selectedQuantity <= 0} className='w-8 h-8 flex items-center bg-gray-100 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out rounded-[50px] justify-center cursor-pointer'>
                        <Minus size={18} onClick={decreaseQuantity} />
                    </button>
                    <input type="number" min={0} max={remainingTickets ?? 0} name={`no-of-tickets-${title ?? 'ticket'}`} id={`no-of-tickets-${title ?? 'ticket'}`} value={selectedQuantity} disabled={disabled}
                        onChange={(event) => setSelectedQuantity(Number(event.target.value))}
                        className='p-2 focus:outline-none focus:ring-1 focus:ring-brown-light w-10' />
                    <button type='button' disabled={disabled || selectedQuantity >= (remainingTickets ?? 0)} className='w-8 h-8 flex items-center bg-gray-100 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out rounded-[50px] justify-center cursor-pointer'>
                        <Plus size={18} onClick={increaseQuantity} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tickets
