import { Gift, Star } from 'lucide-react'
import React from 'react'
import Button from './Button'

type RewardCardProps = {
    title?: string;
    description?: string;
    pointsRequired?: number;
    icon?: React.ReactNode;
}
const RewardCard = ({ title, description, pointsRequired, icon }: RewardCardProps
) => {
    return (
        <div className='border border-purple-500 bg-purple-50 rounded-xl p-4 space-y-2'>
            <div className='flex items-center border border-purple-500 bg-purple-200 rounded-xl p-4 ww-full max-w-[50px] max-h-[50px]'>
                <Gift />
            </div>
            <h4 className='font-semibold'>{title}</h4>
            <p className='text-sm'>{description}</p>

            <div className='flex flex-row justify-between'>
                <div className='mt-2 flex flex-row items-center gap-1 text-yellow-600'>
                    {icon}
                    <span className='font-medium'>{pointsRequired}</span>
                </div>
                <Button text='Redeem' ></Button>
            </div>

        </div>
    )
}

export default RewardCard
