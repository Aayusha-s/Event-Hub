import Button from "./Button";

type PastEventsCardProps = {
    title:string;
    date:string;
    location:string;
    rating:number;
}
const PastEventsCard = (
    {
        title,
        date,
        location,
        rating
    }: PastEventsCardProps
) => {
    return (
        <div  className="border border-brown-normal rounded-xl p-4 w-[500px] 
        cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-lg">

            <div className='flex flex-row items-center gap-6
                '>
                <div className='space-y-2'>
                    <h3 className='font-dynapuff text-xl'>{title}</h3>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                    <p><i className="fa-solid fa-star mr-2"></i>{rating}</p>
                </div>
            </div>

            <div className="flex justify-end -mt-4">
                <Button
                    text="Write Review"
                    variant="cta"
                    size="sm">
                </Button>
            </div>
        </div>
    )
}

export default PastEventsCard
