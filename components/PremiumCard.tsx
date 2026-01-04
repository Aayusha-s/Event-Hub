import { Gift } from 'lucide-react'
import React from 'react'

type PremiumCardProps = {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
}

const PremiumCard = ({
    title,
    description,
    icon
}: PremiumCardProps
) => {
    return (
        <div className='border border-brown-normal rounded-xl p-2'>
            <div className='flex flex-row items-center gap-4'>
                <div className='flex items-center justify-center w-16 h-16 rounded-xl bg-purple-100'>
                    {icon}                    
                </div>
                <div>
                    <h3 className='font-bold'>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default PremiumCard
