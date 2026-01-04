import { Music, TrendingUp } from 'lucide-react'
import React from 'react'

type TrendingTopicsProps = {
    iconBoxColor?: string;
    hoverColor?: string;
    icon?: React.ReactNode;
    title?: string;
    postCount?: string | number;

}

const TrendingTopics = ({
    hoverColor,
    iconBoxColor,
    icon,
    title,
    postCount
}: TrendingTopicsProps) => {
    return (
        <div className={`flex flex-row items-center justify-between 
            border border-brown-normal rounded-xl p-4 ${hoverColor}
            cursor-pointer`}>
            <div className='flex flex-row items-center gap-4'>
                <div className={`flex items-center justify-center w-16 h-16 rounded-xl ${iconBoxColor}`}>
                    {icon}
                </div>
                <div>
                    <h3 className='font-bold'>{title}</h3>
                    <p>{postCount} posts</p>
                </div>
            </div>
            <TrendingUp className='text-green-500'  />
        </div>
    )
}

export default TrendingTopics
