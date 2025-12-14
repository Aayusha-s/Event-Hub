"use client";
import Button from "./Button"
import { useRouter } from 'next/navigation';

type EventCardProps = {
    eventId: number;
    tags: string[];
    imageUrl: string;
    imageAlt: string;
    title: string;
    organizer: string;
    descriptions: string[];
    location: string;
    price: string;
}
const EventCard = (
    {
        eventId,
        tags,
        imageUrl,
        imageAlt,
        title,
        organizer,
        descriptions,
        location,
        price
    }: EventCardProps
) => {

    const router =useRouter();

    const handleCardClick =() => {
        router.push (`/event-details/${eventId}`);
    }

    const handleTagClick =(e: React.MouseEvent, tag:string) => {
        e.stopPropagation();
        router.push (`/event-tags`);
    }

    return (

        <section className="text-text-dark cursor-pointer"
        onClick={handleCardClick}>
            <div className="border border-brown-normal w-[330px] rounded-[10px] p-3
            transform transition-all duration-300 ease-in-out  hover:scale-105 hover:shadow-lg">
                {/* tags and image */}
                <div className="tags">
                    <div className="flex items-center justify-between mb-2">
                        {tags[0] && (
                            <Button
                                text={tags[0]}
                                variant="tag"
                                size="md">
                            </Button>
                        )}

                        {tags[1] && (
                            <Button
                                text={tags[1]}
                                variant="tag"
                                size="md">
                            </Button>
                        )}

                    </div>
                    <div className="h-[210px] w-full overflow-hidden rounded-md">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center ">
                    <i className="fa-regular fa-calendar text-5xl my-4"></i>
                    <div className="flex flex-col ml-4 leading-6">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <h3 className="text-md">{organizer}</h3>
                    </div>
                </div>
                <div>
                    {descriptions.map((desc, index) => (
                        <p key={index}>
                            <i className="fa-solid fa-angles-right mr-2"></i>
                            {desc}
                        </p>
                    ))}
                </div>
                <div className="flex flex-row my-4 justify-between items-center mb-0.5">
                    <div className="flex flex-row items-center justify-center gap-3">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>{location}</p>
                    </div>
                    <p>{price}</p>
                </div>
            </div>
        </section>
    )
}
export default EventCard