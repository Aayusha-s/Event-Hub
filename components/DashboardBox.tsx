'use client';

import Button from './Button';
import { useRouter } from 'next/navigation';

type DashboardBoxProps = {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonIcon?: React.ReactNode;
    buttonLink?: string;
}

const DashboardBox = (
    {
        title,
        description,
        buttonText,
        buttonIcon,
        buttonLink
    }: DashboardBoxProps

) => {

    const router = useRouter();

    return (
        <div className='w-full border border-brown-normal bg-brown-light rounded-xl 
        p-4 space-y-1 flex flex-col justify-start gap-4 shadow-md'>
            <h2 className='font-dynapuff text-xl md:text-2xl lg:text-2xl font-semibold '>
                {title}
            </h2>
            <p className='text-base md:text-md lg:text-md'>
                {description}
            </p>
            <div>
                <Button text={buttonText} variant="cta" iconLeft={buttonIcon} onClick={() => router.push(buttonLink!)}>
                </Button>
            </div>
        </div>
    )
}

export default DashboardBox
