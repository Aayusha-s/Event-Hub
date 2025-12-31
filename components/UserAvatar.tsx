import React from 'react'
import Link from 'next/link'

type UserAvatarProps = {
    nameAbv?: string;
    name?: string;
}

const UserAvatar = ({ nameAbv, name }: UserAvatarProps) => {
    return (
        <Link href={`/user/${name?.toLowerCase().replace(/\s+/g, '-')}`}>
            <div className='shrink-0'>
                <div className='w-14 h-14 rounded-full bg-linear-to-br from-blue-100 to-purple-100 
                                flex items-center justify-center border-2 border-white shadow'>
                    <span className='text-xl font-semibold '>{nameAbv}</span>
                </div>
            </div>
        </Link>
    )
}

export default UserAvatar
