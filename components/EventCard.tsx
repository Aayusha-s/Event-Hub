"use client";
import Button from "./Button";
import { useRouter } from "next/navigation";

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
};

const EventCard = ({
    eventId,
    tags,
    imageUrl,
    imageAlt,
    title,
    organizer,
    descriptions,
    location,
    price,
}: EventCardProps) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/event-details/${eventId}`);
    };

    const handleTagClick = (e: React.MouseEvent, tag: string) => {
        e.stopPropagation();
        router.push(`/event-tags?tag=${tag}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="
                cursor-pointer 
                text-text-dark
                border border-brown-normal 
                rounded-xl 
                p-4 
                w-full
                transition-all duration-300
                hover:shadow-lg
                hover:-translate-y-1">
                    
            {/* Tag, Image */}
            <div className="mb-4">
                {/* Tags */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    {tags.slice(0, 2).map((tag, index) => (
                        <div key={index} onClick={(e) => handleTagClick(e, tag)}>
                            <Button text={tag} variant="tag" size="sm" />
                        </div>
                    ))}
                </div>

                {/* image */}
                <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] overflow-hidden rounded-md">
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Title,Organizer */}
            <div className="flex items-center gap-4 mb-4">
                <i className="fa-regular fa-calendar text-3xl sm:text-4xl"></i>
                <div>
                    <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-text-muted">{organizer}</p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm mb-4">
                {descriptions.slice(0, 3).map((desc, index) => (
                    <p key={index} className="flex items-start gap-2">
                        <i className="fa-solid fa-angles-right mt-1 text-xs"></i>
                        <span>{desc}</span>
                    </p>
                ))}
            </div>

            {/* Location, Price */}
            <div className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{location}</span>
                </div>
                <span>{price}</span>
            </div>
        </div>
    );
};

export default EventCard;
