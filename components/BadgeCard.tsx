import React from 'react'

type BadgeProps = {
    title?: string;
    description?: string;
    rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
    unlockedDate?: string;
    cardColor?: string;
    icon?: React.ReactNode;
}
const BadgeCard = ({
    title,
    description,
    rarity,
    unlockedDate,
    cardColor,
    icon,
    
}: BadgeProps) => {
    return (
        <div className={`flex flex-col items-center border ${cardColor} rounded-xl p-4 space-y-2`}>
            {icon }
            <h4 className='font-semibold text-gray-900'>{title}</h4>
            <p className='text-gray-600 text-sm text-center'>{description}</p>

            <div className='flex items-center gap-1 bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-xs font-medium'>
                {rarity}
            </div>
            <p className='text-sm'>{unlockedDate}</p>

            <div className='flex flex-col'>

            </div>
        </div>
    )
}

export default BadgeCard
