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
        <div className='surface-card w-full p-5 shadow-sm md:p-6 flex flex-col justify-start gap-4'>
            <h2 className='text-xl font-semibold tracking-tight text-text-dark md:text-2xl'>
                {title}
            </h2>
            <p className='max-w-2xl text-sm leading-relaxed text-text-light md:text-base'>
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
