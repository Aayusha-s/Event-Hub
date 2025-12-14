import Button from "./Button";

type UpcomingEventCardProps = {
    img: string;
    imgAlt: string;
    title: string;
    date: string;
    location: string;
    time: string;
    tickets: string;
}
const UpcomingEventCard = (
    {
        img,
        imgAlt,
        title,
        date,
        location,
        time,
        tickets
    }: UpcomingEventCardProps
) => {
    return (
        <div  className="border border-brown-normal rounded-xl p-4 w-[535px] cursor-pointer
        transform transition-all duration-300 ease-in-out  hover:scale-105 hover:shadow-lg">
            <div className='flex flex-row items-center gap-6 
                '>
                <div>
                    <img src={img} alt={imgAlt} className='w-[250px] rounded-xl' />
                </div>
                <div className='space-y-2'>
                    <h3 className='font-dynapuff text-xl'>{title}</h3>
                    <p><i className="fa-solid fa-calendar mr-2"></i>{date}</p>
                    <p><i className="fa-solid fa-location-dot mr-2"></i>{location}</p>
                    <p><i className="fa-solid fa-clock mr-2"></i>{time}</p>
                    <p><i className="fa-solid fa-ticket mr-2"></i>{tickets}</p>
                </div>
            </div>

            <div className="flex justify-end mt-3">
                <Button
                    text="View Ticket"
                    variant="cta">
                </Button>
            </div>
        </div>


    )
}

export default UpcomingEventCard
