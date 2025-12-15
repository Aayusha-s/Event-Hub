import Button from './Button';

type DashboardBoxProps = {
    title?: string;
    description?: string;   
}

const DashboardBox = (
    {
        title,
        description
    }: DashboardBoxProps
    
) => {
    return (
        <div className='w-full border border-brown-normal rounded-xl px-10 py-6 space-y-1 flex flex-col justify-start gap-4'>
            <h2 className='font-dynapuff text-3xl font-semibold '>
                {title}
            </h2>
            <p className='text-lg'>
                {description}
            </p>
            <div>
                <Button text="Explore New Events" variant="cta" iconRight={<i className="fa-solid fa-arrow-right ml-2 "></i>}>
                </Button>
            </div>
        </div>
    )
}

export default DashboardBox
