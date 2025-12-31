import React from 'react'
import Link from 'next/link'

type UserAvatarProps = {
    nameAbv?: string;
    name?: string;
    width?: number;
    height?: number;
}

const UserAvatar = ({ nameAbv, name, width, height}: UserAvatarProps) => {
    return (
        <Link href={`/user/${name?.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className='shrink-0'>
                <div className={`w-${width} h-${height} rounded-full bg-linear-to-br from-blue-100 to-purple-100 
                                flex items-center justify-center border-2 border-white shadow`}>
                    <span className='text-xl font-semibold '>{nameAbv}</span>
                </div>
            </div>
        </Link>
    )
}

export default UserAvatar
