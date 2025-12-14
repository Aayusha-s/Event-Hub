import React from 'react'
import { TrendingUp } from 'lucide-react';

type VendorCardsProps = {
    icon1?: React.ReactNode;
    count?: number;
    label?: string;
    icon2?: React.ReactNode;
    subLabel?: string;
}

const VendorCards = (
    {
        icon1,
        count,
        label,
        icon2,
        subLabel
    }: VendorCardsProps
) => {
    return (
        <div className='w-[250px] border border-brown-normal rounded-xl mt-6 p-4 font-bold space-y-2
        transform transition duration-all-300 ease-in-out hover:shadow-lg'>
            <div className='flex flex-row items-center justify-between gap-2'>
                <h3>{label}</h3>
                <p className='inline'>{icon1}</p>
            </div>
            <p className='text-2xl'>{count}</p>
            <p>{icon2} {subLabel} </p>
        </div>
    )
}

export default VendorCards
