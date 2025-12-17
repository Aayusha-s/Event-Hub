import React from 'react'

type UserCardsProps = {
    icon?: React.ReactNode;
    count?: number;
    label?: string;
}

const UserCards = (
    { 
        icon,
        count,
        label
    }: UserCardsProps
) => {
    return (
        <div className='w-full md:max-w-[250px] border border-brown-normal \
        rounded-xl p-6 font-bold space-y-2
        transform transition duration-all-300 ease-in-out hover:shadow-lg'>
            {icon}
            <p className='text-xl'>{count}</p>
            <p className='text-lg'>{label}</p>
        </div>
    )
}

export default UserCards
