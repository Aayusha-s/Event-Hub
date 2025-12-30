import { Flame, Star } from 'lucide-react'
import React from 'react'

type LeaderboardProps = {
    nameAbv?: string;
    name?: string;
    streakDays?: number;
    points?: number;
    cardColor?: string;
}
const Leaderboard = ({
    nameAbv,
    name,
    streakDays,
    points,
    cardColor
}: LeaderboardProps) => {
    return (
        <div className={`flex flex-row justify-between border ${cardColor} rounded-xl p-4`}>

            <div className='flex flex-row gap-4 items-center'>

                <div className='border-2 border-purple-400 w-14 h-14 rounded-[50px]'>
                    {/* Avatar or Icon can go here */}
                    <p className='flex items-center justify-center h-full font-bold'>{nameAbv}</p>
                </div>

                <div className='flex flex-col gap-1 '>
                    <p className='text-base md:text-md lg:text-lg font-bold'>{name}</p>
                    <div className='flex flex-row items-center gap-1 '>
                        <Flame className='text-yellow-500' />
                        <p className='text-sm md:text-md lg:text-md'>{streakDays} Day Streak</p>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <Star className='text-yellow-500' />
                <p className='font-bold text-base md:text-md lg:text-lg'>{points}</p>
            </div>
        </div>
    )
}

export default Leaderboard
