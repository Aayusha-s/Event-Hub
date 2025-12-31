import React from 'react'
import UserAvatar from './UserAvatar';
import Button from './Button';

type FeaturedMemberProps = {
    name?: string;
    role?: string;
    tags?: string[];
    followersCount?: number;
    followingCount?: number;
}

const FeaturedMember = ({
    name,
    role,
    tags,
    followersCount,
    followingCount
}: FeaturedMemberProps) => {
    return (
        <div className='border border-brown-normal rounded-xl p-4 flex flex-col gap-4 hover:shadow-lg'>
            <div className='flex flex-row gap-4 items-center'>
                <UserAvatar nameAbv={name?.split(' ').map(n => n[0]).join('')} name={name} />
                <div className='flex flex-col gap-1'>
                    <h3 className='text-text-dark mt-2 font-bold text-xl'>{name}</h3>
                    <p className='text-gray-500 font-medium text-md'>{role}</p>

                    <div className='flex flex-wrap gap-2 mt-2'>
                        <Button text={tags[0]}
                            variant='tag'
                            size='sm'
                        ></Button>
                        <Button text={tags[1]}
                            variant='tag'
                            size='sm'
                        ></Button>
                        <Button text={tags[2]}
                            variant='tag'
                            size='sm'
                        ></Button>
                    </div>
                </div>
            </div>
            

            <div className='flex flex-row items-center justify-center gap-4'>
                <div className='flex flex-row gap-2 items-center justify-center border border-brown-normal p-4 bg-brown-light rounded-xl'>
                    <p className='font-bold text-3xl'>{followersCount}</p>
                    <p className='text-lg'>Followers</p>
                </div>
                <div className='flex flex-row gap-2 items-center justify-center border border-brown-normal p-4 bg-brown-light rounded-xl'>
                    <p className='font-bold text-3xl'>{followingCount}</p>
                    <p className='text-lg'>Following</p>
                </div>
            </div>
            <Button text='Follow'></Button>
        </div>
    )
}

export default FeaturedMember
