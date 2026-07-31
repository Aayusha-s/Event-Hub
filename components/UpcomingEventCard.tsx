import Button from "./Button";

type UpcomingEventCardProps = {
    img: string;
    imgAlt: string;
    title: string;
    date: string;
    location: string;
    time: string;
    tickets: string;
    onOpen: () => void;
    onClick?: () => void;
}
const UpcomingEventCard = (
    {
        img,
        imgAlt,
        title,
        date,
        location,
        time,
        tickets,
        onOpen, onClick
    }: UpcomingEventCardProps
    
) => {


    return (
        <div  className="border border-brown-normal bg-brown-light rounded-xl p-4 w-full md:max-w-[535px] cursor-pointer
        transform transition-all duration-300 ease-in-out  hover:scale-103 hover:shadow-lg" onClick={onClick}>
            <div className='flex flex-col gap-6'>
                <div>
                    <img src={img} alt={imgAlt} className='w-full h-auto rounded-xl ' />
                </div>
                <div className='flex flex-col gap-2'>
                    <h3 className='font-dynapuff text-xl'>{title}</h3>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                    <p><i className="fa-solid fa-clock mr-2"></i>{time}</p>
                    <p><i className="fa-solid fa-ticket mr-2"></i>{tickets}</p>
                </div>
            </div>

            <div className="flex justify-end mt-3">
                <Button
                onClick={onOpen}
                    text="View Ticket"
                    variant="cta">
                </Button>
            </div>
        </div>


    )
}

export default UpcomingEventCard
