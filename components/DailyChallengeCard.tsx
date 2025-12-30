import React from 'react'
import Button from './Button'
import { CheckCircle, Star } from 'lucide-react'

type DailyChallengeCardProps = {
    title ?: string
    description ?: string
    points ?: number
    status ?: 'Completed' | 'In Progress' | 'Not Started'
    statusIcon ?: React.ReactNode
    statusColor ?: string
    cardColor ?: string
    buttonText ?: string
    buttonIcon ?: React.ReactNode


}
const DailyChallengeCard = (
    { 
        title, 
        description, 
        points,
        status,
        statusIcon,
        statusColor,
        cardColor,
        buttonText,
        buttonIcon 

    }: DailyChallengeCardProps) => {
    return (
        <div className={`border-2 ${cardColor} rounded-xl p-5 hover:shadow-md transition-shadow`}>
            <div className='flex justify-between items-start mb-3'>
                <h4 className='font-semibold text-gray-900'>{title}</h4>
                <div className={`flex items-center gap-1 ${statusColor} px-2 py-1 rounded-full text-xs font-medium`}>
                    {statusIcon} {status}
                </div>
            </div>
            <p className='text-gray-600 text-sm mb-4'>{description}</p>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-yellow-600 font-medium'>
                    <Star size={18} className='fill-yellow-400 text-yellow-400' />
                    <span>+{points} pts</span>
                </div>
                <Button text={buttonText} variant="cta" size="vsm" iconLeft={buttonIcon}>
                </Button>
            </div>
        </div>
    )

}

export default DailyChallengeCard
