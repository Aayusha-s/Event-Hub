import React from 'react'
import Link from 'next/link'

type UserAvatarProps = {
    nameAbv?: string;
    name?: string;
    width?: number;
    height?: number;
    href?: string;
}

const UserAvatar = ({ nameAbv, name, width = 16, height = 16, href }: UserAvatarProps) => {
    const initials = nameAbv ?? name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    const profileHref = href ?? `/userprofile?username=${encodeURIComponent((name ?? '').toLowerCase().trim().replace(/\s+/g, '-'))}`;

    return (
        <Link href={profileHref} className='shrink-0'>
            <div
                className='flex items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100 border-2 border-white shadow'
                style={{ width: `${width * 0.25}rem`, height: `${height * 0.25}rem` }}
            >
                <span className='text-xl font-semibold'>{initials}</span>
            </div>
        </Link>
    )
}

export default UserAvatar
