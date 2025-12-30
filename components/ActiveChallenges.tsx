import React from 'react'
import { Star } from 'lucide-react'

type ActiveChallengesProps = {
    title ?: string
    diffculty ?: 'easy' | 'medium' | 'hard' | 'premium'
    diffcultyColor ?: string
    cardColor ?: string
    points ?: number
    description ?: string
    tags ?: string[]
    currentProgress ?: number
    totalProgress ?: number


}
const ActiveChallenges = ({
    title,
    diffculty,
    diffcultyColor,
    cardColor,
    points,
    description,
    tags,
    currentProgress,
    totalProgress

}: ActiveChallengesProps) => {
    return (
        <div className={`border-2 ${cardColor} rounded-xl p-5 hover:shadow-md transition-shadow`}>
            <div className='flex justify-between items-start mb-3'>
                <div className='flex flex-row gap-2'>
                    <h4 className='font-semibold text-gray-900'>{title}</h4>
                    <div className={`flex items-center gap-1 ${diffcultyColor} px-2 py-1 rounded-full text-xs font-medium`}>
                        {diffculty}
                    </div>
                </div>
                <div className='flex items-center gap-1 bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full font-medium'>
                    <Star /> {points}
                </div>
            </div>

            <p className='text-gray-600 text-sm mb-3'>{description}</p>

            <div className='flex flex-row my-4'>
                <div className='flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium'>
                    {tags[0]}
                </div>
                <div className='flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium ml-2'>
                    { tags[1]}
                </div>
            </div>

            <div className='mb-4'>
                <div className='flex justify-between text-sm text-gray-800 mb-1'>
                    <span>Progress</span>
                    <span>{currentProgress}/{totalProgress}</span>
                </div>

                <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '60%' }}></div>
                </div>
            </div>

        </div>
    )
}

export default ActiveChallenges
