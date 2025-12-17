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
        <div className='w-full border border-brown-normal bg-brown-light rounded-xl 
        p-4 space-y-1 flex flex-col justify-start gap-4 shadow-md'>
            <h2 className='font-dynapuff text-xl md:text-2xl lg:text-2xl font-semibold '>
                {title}
            </h2>
            <p className='text-base md:text-md lg:text-md'>
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
