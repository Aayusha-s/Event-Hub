import Button from "./Button";

type PastEventsCardProps = {
    title:string;
    date:string;
    location:string;
    rating:number;
    onOpen?: () => void;    
    onClick?: () => void;
}
const PastEventsCard = (
    {
        title,
        date,
        location,
        rating,
        onOpen, onClick
    }: PastEventsCardProps
) => {
    return (
        <div className="border border-brown-normal bg-brown-light rounded-xl p-4 w-full md:max-w-[535px]
        cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg" onClick={onClick}>

            <div className='flex flex-col gap-6'>
                <div className='space-y-2'>
                    <h3 className='font-dynapuff text-xl'>{title}</h3>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                    <p><i className="fa-solid fa-star mr-2"></i>{rating}</p>
                </div>
            </div>

            <div className="flex justify-end -mt-4">
                <Button
                onClick={onOpen}
                    text="Write Review"
                    variant="cta"
                    size="sm">
                </Button>
            </div>
        </div>
    )
}

export default PastEventsCard
