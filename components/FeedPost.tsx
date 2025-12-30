import React from 'react'
import Link from 'next/link'
import Button from './Button'
import { Heart, MessageCircle } from 'lucide-react';


type FeedPostProps = {
    nameAbv?: string;
    name?: string;
    userType?: string;
    timeAgo?: string;
    postContent?: string;


}
const FeedPost = ({
    nameAbv,
    name,
    userType,
    timeAgo,
    postContent
}: FeedPostProps) => {
    return (
        <div className='bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow'>
            <div className='flex items-start gap-4'>
                <Link href="/user/jane-doe">
                    <div className='shrink-0'>
                        <div className='w-14 h-14 rounded-full bg-linear-to-br from-blue-100 to-purple-100 
                                flex items-center justify-center border-2 border-white shadow'>
                            <span className='text-xl font-semibold '>{nameAbv}</span>
                        </div>
                    </div>
                </Link>

                <div className='flex-1'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                        <div >
                            <Link href="/user/jane-doe">
                                <h3 className='font-semibold text-text-dark hover:text-brown-normal-hover'>Jane Doe</h3>
                            </Link>

                            <div className='flex items-center gap-1 ml-auto'>
                                <div className='flex items-center gap-1 mt-1'>
                                    <span className='text-sm text-gray-500'>{userType}</span>
                                    <span className='text-gray-500'>•</span>
                                    <span className='text-sm text-gray-500'>{timeAgo}</span>
                                </div>
                                <div className='ml-auto'>
                                    <Button text="Follow" variant="secondary" size="sm"></Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='mt-4'>
                        <p className='text-gray-700 leading-relaxed'>
                            {postContent}
                        </p>
                    </div>

                    {/* Post Actions */}
                    <div className='mt-6 flex items-center gap-4 pt-4 border-t border-gray-100'>
                        <button className='flex items-center gap-2 hover:text-red-500 cursor-pointer'>
                            <Heart />
                            <span className='text-sm'>124</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-blue-500 cursor-pointer'>
                            <MessageCircle />
                            <span className='text-sm'>42</span>
                        </button>
                        <button className='flex items-center gap-2 hover:text-green-500 cursor-pointer ml-auto'>
                            <i className="fa-regular fa-share-from-square"></i>
                            <span className='text-sm'>12</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedPost
